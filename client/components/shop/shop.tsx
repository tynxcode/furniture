import { useState } from 'react';
import styles from './shop.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { useQuery } from '@apollo/client';
import { GET_SHOP_PRODUCTS } from '../../gql/queries';
import { GetShopProductsData, GetShopProductsVars } from '../../gql/types';
import Filter from './filter.shop';
import Shelf from './shelf.shop';

export interface ShopComponentProps { }

const ShopComponent: React.SFC<ShopComponentProps> = () => {
    const [categoryTitle, setCategoryTitle] = useState<string>('all')

    const { data, error, loading, refetch } = useQuery<GetShopProductsData, GetShopProductsVars>(GET_SHOP_PRODUCTS, {
        variables: {
            category: null,
            name: null,
            price: null,
            limit: 8
        },
        notifyOnNetworkStatusChange: true
    })

    const products = data?.getShopProducts

    const getProducts = (filter: GetShopProductsVars) => {
        refetch(filter)
    }

    const moreProducts = () => {
        refetch({
            limit: products.length + 8
        })
    }

    return (
        <section className={styles.shop}>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={4} lg={3} xl={2}>
                        <Filter 
                            getProducts={getProducts} 
                            setCategoryTitle={setCategoryTitle}
                        />
                    </Col>
                    <Col xs={12} sm={12} md={8} lg={9} xl={10}>
                        <Shelf 
                            categoryTitle={categoryTitle}  
                            products={products} 
                            moreProducts={moreProducts} 
                            loading={loading}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default ShopComponent;