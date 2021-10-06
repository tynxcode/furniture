import React, { useEffect, useState } from 'react'
import styles from './shop.module.scss'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { ProductInterface } from '../../interface/product'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col } from 'react-bootstrap'
import Product from '../product/product';
import EllipsisLoading from '../loading/ellipsis';

export interface ShelfProps {
    categoryTitle: string
    products: ProductInterface[]
    moreProducts: () => void
    loading: boolean
}

enum OptionsEnum {
    PriceInc = 'price_increase',
    PriceDec = 'price_decrease',
    Newest = 'newest',
    Rating = 'rating',
    Normal = 'normal'
}

const Shelf: React.SFC<ShelfProps> = ({ products, moreProducts, categoryTitle, loading }) => {
    const [furnitures, setFurnitures] = useState<ProductInterface[]>([])
    const [sort, setSort] = useState<OptionsEnum>(OptionsEnum.Normal)

    useEffect(() => {
        if (products) {
            setFurnitures(products)
            setSort(OptionsEnum.Normal)
        }
    }, [products])

    const sorting = (options: OptionsEnum) => {
        let result: ProductInterface[];

        switch (options) {
            case OptionsEnum.PriceDec:
                result = furnitures.slice().sort((a, b) => {
                    return b.price - a.price
                })
                setSort(OptionsEnum.PriceDec)
                return setFurnitures(result)
            case OptionsEnum.Newest:
                result = furnitures.slice().sort((a, b) => {
                    return new Date(b.create_date) > new Date(a.create_date) ? 1 : -1
                })
                setSort(OptionsEnum.Newest)
                return setFurnitures(result)
            case OptionsEnum.Rating:
                result = furnitures.slice().sort((a, b) => {
                    return b.review.review_point - a.review.review_point
                })
                setSort(OptionsEnum.Rating)
                return setFurnitures(result)
            case OptionsEnum.Normal:
                setSort(OptionsEnum.Normal)
                return setFurnitures(products)
            default:
                return;
        }
    }

    const showProducts = () => {
        let productList;

        if (furnitures) {
            productList = furnitures.map((v, i) => {
                return (
                    <Col xs={12} sm={12} md={6} lg={4} xl={3} key={i} style={{ marginBottom: '25px' }}>
                        <Product product={v} />
                    </Col>
                )
            })
        }

        if (!productList || productList.length < 1) {
            return <div> No Product Found !</div>
        }

        return productList
    }

    return (
        <article className={styles.product_view}>
            <div className={styles.view_header}>
                <h4>{categoryTitle} Products</h4>
                <div className={styles.sort}>
                    <h6>Sort by</h6>
                    <div className={styles.sort_options}>
                        <div className={
                            sort === OptionsEnum.Normal ?
                                styles.sort_option_active :
                                styles.sort_option}
                            onClick={() => sorting(OptionsEnum.Normal)}
                        > Normal </div>
                        <div className={
                            sort === OptionsEnum.Newest ?
                                styles.sort_option_active :
                                styles.sort_option}
                            onClick={() => sorting(OptionsEnum.Newest)}
                        > Newest </div>
                        <div
                            className={
                                sort === OptionsEnum.Rating ?
                                    styles.sort_option_active :
                                    styles.sort_option
                            }
                            onClick={() => sorting(OptionsEnum.Rating)}
                        > Most Rating </div>
                        <div className={
                            sort === OptionsEnum.PriceDec ?
                                styles.sort_option_active :
                                styles.sort_option}
                            onClick={() => sorting(OptionsEnum.PriceDec)}
                        >Price
                            <FontAwesomeIcon icon={faAngleDown} height={16} />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.products}>
                {loading ?
                    (<div className={styles.products_loading}><EllipsisLoading /></div>) :
                    <Row> {showProducts()} </Row>
                }
            </div>

            <div className={styles.loadmore_btn}>
                <button onClick={() => moreProducts()}>
                    Load More Product
                </button>
            </div>
        </article>
    );
}

export default Shelf;