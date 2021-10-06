import { GetStaticProps } from 'next';
import Head from 'next/head';
import * as React from 'react';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import ShopComponent from '../components/shop/shop';
import { addApolloState, initializeApollo } from '../gql/apollo';
import { GET_SHOP_PRODUCTS } from '../gql/queries';

export interface ShopPageProps { }

const ShopPage: React.SFC<ShopPageProps> = () => {
  return (
    <div>
      <Head>
        <title>Shop Page</title>
      </Head>
      <Header />
      <main>
        <ShopComponent />
      </main>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const apolloClient = initializeApollo()

    await apolloClient.query({
      query: GET_SHOP_PRODUCTS,
      variables: {
        category: null,
        name: null,
        price: null,
        limit: 8
      }
    })

    return addApolloState(apolloClient, {
      props: {}
    })

  } catch (error) {
    return {
      props: {}
    }
  }
}

export default ShopPage;