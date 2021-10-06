import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../gql/apollo'
import '../styles/globals.scss'
import 'bootstrap/scss/bootstrap.scss'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import NextAuth from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <NextAuth.Provider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ApolloProvider>
    </NextAuth.Provider>

  )
}

export default MyApp
