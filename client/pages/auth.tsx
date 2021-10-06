import { getCsrfToken, getSession } from 'next-auth/client'
import { Col, Container, Row } from 'react-bootstrap';
import SignIn from '../components/auth/signin';
import AuthBanner from '../components/banner/auth-banner';
import Head from 'next/head'
import { useState } from 'react';
import SignUp from '../components/auth/signup';

export interface AuthProps {
    csrfToken: string
}

export enum AuthStatusEnum {
    SignIn = 'signin',
    SignUp = 'signup'
}

const AuthPage: React.SFC<AuthProps> = ({ csrfToken }) => {
    const [status, setStatus] = useState<AuthStatusEnum>(AuthStatusEnum.SignIn)

    return (
        <>
            <Head>
                <title>Signin</title>
            </Head>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <AuthBanner />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        {status === AuthStatusEnum.SignIn ?
                            <SignIn csrfToken={csrfToken} setStatus={setStatus} /> :
                            <SignUp setStatus={setStatus} />
                        }
                    </Col>
                </Row>
            </Container>

        </>
    );
}

export default AuthPage;

export async function getServerSideProps(context) {
    const session = await getSession(context)

    if (session) {
        return {
            redirect: {
                destination: '/user',
                permanent: false,
            }
        }
    }
        
    return {
        props: {
            csrfToken: await getCsrfToken(context)
        }
    }
}
