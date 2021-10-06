import Head from 'next/head'
import Banner from '../components/banner/banner'
import Header from '../components/header/header'
import Category from '../components/category/category'
import HotProduct from '../components/product/hot-product'
import Footer from '../components/footer/footer'
import { addApolloState, initializeApollo } from '../gql/apollo'
import { GetStaticProps } from 'next'
import { GET_LATEST_PRODUCT, GET_PRODUCTS_BY_CATEGORY } from '../gql/queries'

export interface HomeProps { }

const Home: React.SFC<HomeProps> = () => {

  return (
    <div >
      <Head>
        <title>Furniture App</title>
        <meta name="description" content="Create by Tynx" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <Banner />
        <Category />
        <HotProduct />
      </main>
      <Footer />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const apolloClient = initializeApollo()

    await apolloClient.query({
      query: GET_LATEST_PRODUCT,
      variables: {}
    })

    await apolloClient.query({
      query: GET_PRODUCTS_BY_CATEGORY,
      variables: {
        limit: 3,
        categoty: 'chair'
      }
    })

    return addApolloState(apolloClient, {
      props: {},
      revalidate: 1,
    })
    
  } catch (error) {
    return {
      props: {}
    }
  }

}

export default Home