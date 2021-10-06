import styles from './order-product.module.scss'
import Image from 'next/image';
import { Col, Row } from 'react-bootstrap'
import { OrderProductInterface } from '../../interface/order';

export interface OrderProductProps {
    orderProduct: OrderProductInterface
}

const OrderProduct: React.SFC<OrderProductProps> = ({ orderProduct }) => {
    return (
        <div className={styles.product}>
            <Row>
                <Col xs={12} sm={4} md={4} lg={3}>
                    <div className={styles.product_elm__left}>
                        <div className={styles.mobile_header}>Product</div>
                        <div className={styles.product_detail}>
                            <div className={styles.image_and_info}>
                                <div className={styles.product_image}>
                                    <Image src={orderProduct ? orderProduct.product.image_path : '/furniture/chair_01.png'} height={40} width={40} />
                                </div>
                                <div className={styles.product_info}>
                                    <div className={styles.product_name}>{orderProduct && orderProduct.product.name}</div>
                                    <div className={styles.product_brand}>{orderProduct && orderProduct.product.brand}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={6} sm={2} md={2} lg={3}>
                    <div className={styles.product_elm}>
                        <div className={styles.mobile_header}>Quantity</div>
                        x{orderProduct && orderProduct.quantity}
                    </div>
                </Col>
                <Col xs={6} sm={2} md={2} lg={2}>
                    <div className={styles.product_elm}>
                        <div className={styles.mobile_header}>Price</div>
                        {orderProduct && orderProduct.product.price}$
                    </div>
                </Col>

                <Col xs={6} sm={2} md={2} lg={2}>
                    <div className={styles.product_elm}>
                        <div className={styles.mobile_header}>Discount</div>
                        {orderProduct && orderProduct.product.discount}%
                    </div>
                </Col>
                <Col xs={6} sm={2} md={2} lg={2}>
                    <div className={styles.product_elm}>
                        <div className={styles.mobile_header}>Total Price</div>
                        {orderProduct && orderProduct.total_price}$
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default OrderProduct;