import React, { useEffect, useState } from 'react'
import styles from './category.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { CategoryEnum, ProductInterface } from '../../interface/product'
import Product from '../product/product'
import { useQuery } from '@apollo/client'
import { GetProductsByCategoryData, GetProductsByCategoryVars, GetShopProductsData, GetShopProductsVars } from '../../gql/types'
import { GET_PRODUCTS_BY_CATEGORY } from '../../gql/queries'
import CategoryController from './controller.category'
import EllipsisLoading from '../loading/ellipsis'

export interface CategoryProductProps { }

const categoryVars: GetProductsByCategoryVars = {
    category: 'chair',
    limit: 3
}

const CategoryProduct: React.SFC<CategoryProductProps> = () => {
    const [category, setCategory] = useState<CategoryEnum>(CategoryEnum.Chair)

    const { data, error, loading, refetch } = useQuery<GetProductsByCategoryData, GetShopProductsVars>(GET_PRODUCTS_BY_CATEGORY, {
        variables: categoryVars,
        notifyOnNetworkStatusChange: true
    })

    const products = data?.getProductsByCategory

    const getProducts = (category: CategoryEnum) => {
        setCategory(category)
        refetch({category, limit: 3})
    }

    const showProducts = () => {
        let productList;
        if (products) {
            productList = products.map((v, i) => {
                return (
                    <Col xs={12} sm={12} md={4} lg={4} xl={4} key={i}>
                        <Product product={v} />
                    </Col>
                )
            })
        }
        return productList
    }

    return (
        <section className={styles.category_list}>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={8} lg={4} xl={4}>
                        <CategoryController category={category} getProducts={getProducts}/>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                        <div className={styles.product_list}>
                            {loading ? 
                                (<div className={styles.loading}>
                                    <EllipsisLoading />
                                </div>) :
                                (<Row> 
                                    {showProducts()} 
                                </Row>)
                            }
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default CategoryProduct;