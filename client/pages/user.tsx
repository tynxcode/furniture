import Head from "next/head"
import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Menu from "../components/menu/menu";
import Dashboard from "../components/dashboard/dashboard";
import Profile from "../components/profile/profile";
import { getSession, signOut } from 'next-auth/client'
import { Col, Container, Row } from 'react-bootstrap'
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { initializeApollo } from "../gql/apollo";
import { PROFILE } from "../gql/queries";
import Notification from "../components/notification/notification";

export interface UserPageProps {
    session: Session
}

export enum UserMenuEnum {
    Home = 'home',
    Account = 'account',
    Setting = 'setting',
    Admin = 'admin'
}

const UserPage: React.SFC<UserPageProps> = ({ session }) => {
    const [menu, setMenu] = useState<UserMenuEnum>(UserMenuEnum.Home)

    useEffect(() => {
        if (!session) {
            signOut()
        }
    }, [session])

    const showComponents = () => {
        switch (menu) {
            case UserMenuEnum.Home:
                return <Dashboard />
            case UserMenuEnum.Account:
                return <Profile />
            default:
                return <Dashboard />
        }
    }

    const setComponents = (option: UserMenuEnum) => {
        setMenu(option)
    }

    return (
        <>
            <Head>
                <title> Profile </title>
            </Head>
            <Header />
            <main>
                <Container>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={2} xl={2}>
                            <Menu setComponents={setComponents} />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={10} xl={10}>
                            {showComponents()}
                        </Col>
                    </Row>
                </Container>
            </main>
            <Footer />
            <Notification />
        </>
    );
}

export default UserPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const session = await getSession(context)

        if (!session) {
            return {
                redirect: {
                    destination: '/auth',
                    permanent: false,
                }
            }
        }

        const apolloClient = initializeApollo(null, session)

        await apolloClient.query({
            query: PROFILE
        })

        return {
            props: {
                session
            }
        }

    } catch (error) {
        return {
            props: {
                session: null
            }
        }
    }

}