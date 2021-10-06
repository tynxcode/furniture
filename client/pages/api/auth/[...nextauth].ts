import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { initializeApollo } from '../../../gql/apollo'
import { SIGN_IN } from '../../../gql/queries'
import { encodeServerToken } from '../../../utils/jwt'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password", placeholder: "password" }
            },
            async authorize(credentials, req) {
                const apolloClient = initializeApollo()

                const { data, error } = await apolloClient.query({
                    query: SIGN_IN,
                    variables: {
                        username: credentials.username,
                        password: credentials.password
                    }
                })
                
                if (data && !error) {
                    const { user, access_token } = data.signin
                    return {
                        name: user.name,
                        email: user.email,
                        image: user.image, 
                        roles: user.roles,
                        access_token,
                    }
                }

                // Return null if user data could not be retrieved
                return null
            }
        }),
        // ...add more providers here
    ],
    session: {
        maxAge: 60*45
    },
    pages: {
        signIn: '/auth',
        error: '/auth'
    }
    ,
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            // Add access_token to the token right after signin
            if (user?.access_token) {
                token.accessToken = user.access_token
            }
            return token
        },
        async session(session, token) {
            session.accessToken = encodeServerToken(String(token.accessToken))
            return session
        }
    }
})