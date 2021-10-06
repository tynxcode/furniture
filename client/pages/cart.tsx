import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import * as React from 'react';
import Cart from '../components/cart/cart';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import Notification from '../components/notification/notification';

export interface CartPageProps { }

const CartPage: React.SFC<CartPageProps> = () => {
    return (
        <div>
            <Head>
                <title>Cart Page</title>
            </Head>
            <Header />
            <main>
                <Cart />
            </main>
            <Footer />
            <Notification />

        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const session = await getSession(context)

        return {
            props: {
                session
            }
        }
    } catch (error) {
        return {
            props: {

            }
        }
    }
}

export default CartPage;