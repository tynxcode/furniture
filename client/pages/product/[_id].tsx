import { GetServerSideProps } from "next";
import Head from "next/head"
import { Container, Row, Col } from "react-bootstrap";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import ProductDetail from "../../components/product/product-detail";
import ProductSlider from "../../components/slider/product-slider";
import { initializeApollo } from "../../gql/apollo";
import { GET_PRODUCT_BY_ID } from "../../gql/queries";
import { ProductInterface } from "../../interface/product";

export interface ProductPageProps {
    product: ProductInterface
}

const ProductPage: React.SFC<ProductPageProps> = ({ product }) => {

    if(!product) return <div>Not Found !</div>

    return (
        <>
            <Head>
                <title>{product ? product.name : 'Product Page'}</title>
            </Head>
            <Header />
            <main>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}> 
                        <ProductSlider product={product}/>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6}> 
                        <ProductDetail product={product}/>
                    </Col>
                </Row>
            </Container>
            </main>
            <Footer />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { _id } = context.query

        const apolloClient = initializeApollo()
        const { data, errors } = await apolloClient.query({
            query: GET_PRODUCT_BY_ID,
            variables: {
                _id
            }
        })

        return {
            props: {
                product: data.getProductById
            }
        }
    } catch (error) {
        return { props: { product: null } }
    }  
}

export default ProductPage;