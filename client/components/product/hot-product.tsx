import { Container, Row, Col } from 'react-bootstrap'
import styles from './hot-product.module.scss'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import { CartItemInterface } from '../../interface/cart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faEye, faFire, faStar } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { ProductInterface } from '../../interface/product';
import { useQuery } from '@apollo/client';
import { GET_LATEST_PRODUCT } from '../../gql/queries';

export interface HotProductProps {}

const HotProduct: React.SFC<HotProductProps> = () => {
    const { data, error } = useQuery(GET_LATEST_PRODUCT, {
        notifyOnNetworkStatusChange: true
    })
    const router = useRouter()
    const dispatch = useDispatch()

    const product = data?.getLatestProduct

    const initializeCartItem = (): CartItemInterface => {
        let cartItem: CartItemInterface = {
            product,
            quantity: 1,
            total_price: product.price
        }
        return cartItem
    }

    if(!product) return (<div>No Product</div>)

    return (
        <section className={styles.hot_product}>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div className={styles.image}>
                            <Image src={product.image_path} height={400} width={400}/>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6}>
                        <div className={styles.detail}>
                            <h5><FontAwesomeIcon  icon={faFire} color='#f30606' width={20} style={{marginRight: '10px'}}/> Hot Product</h5>
                            <div className={styles.name}> {product.name}  </div>
                            <div className={styles.brand}>
                                {product.brand}
                            </div>
                            <div className={styles.review_rating}>
                                <FontAwesomeIcon icon={faStar} width={16} color='#ff0'/>
                                <FontAwesomeIcon icon={faStar} width={16} color='#ff0'/>
                                <FontAwesomeIcon icon={faStar} width={16} color='#ff0'/>
                                <FontAwesomeIcon icon={faStar} width={16} color='#ff0'/>
                                <FontAwesomeIcon icon={faStar} width={16} color='#ff0'/>
                                <span>({product.review.review_point}) - {product.review.total} reviews</span>
                            </div>
                            
                            <div className={styles.description}>
                                { product.description }
                            </div>
                            <div className={styles.price}>
                                $ { product.price} <span>{ product.price*1.2} </span>
                            </div>
                            <div className={styles.actions}>
                                <button className={styles.add_to_cart} onClick={() => dispatch(addToCart(initializeCartItem()))}>
                                    <FontAwesomeIcon icon={faCartPlus} width={20} style={{marginRight: '10px'}} color='#14a7fa'/>
                                    Add to cart
                                </button>
                                <button className={styles.view} onClick={() => router.push(`/product/${product.id}`)}>
                                    <FontAwesomeIcon icon={faEye} width={20} style={{marginRight: '10px'}} color='#f93707'/>
                                    View Product
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default HotProduct;