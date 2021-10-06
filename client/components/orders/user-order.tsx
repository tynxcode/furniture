import styles from './user-order.module.scss'
import Image from 'next/image';
import { Col, Row } from 'react-bootstrap'
import { DashboardStatusEnum } from '../dashboard/dashboard';
import { OrderInterface, OrderProductInterface } from '../../interface/order';

export interface UserOrderProps {
    changeStatus: (status: DashboardStatusEnum, products: OrderProductInterface[]) => void
    order: OrderInterface
}

const UserOrder: React.SFC<UserOrderProps> = ({ changeStatus, order }) => {

    const showProductImage = () => {
        let images;
        if (order) {
            images = order.products.map((v, i) => {
                return (
                    <div className={styles.product} key={i}>
                        <Image src={v.product.image_path} width={35} height={35} />
                    </div>
                )
            })
        }
        return images
    }

    const getDateTime = (date: Date) => {
        const dateStr = new Date(date).toLocaleString()
        return dateStr.substring(0, dateStr.indexOf(','))
    }

    return (
        <div className={styles.order} onClick={() => changeStatus(DashboardStatusEnum.Product, order.products)}>
            <Row>
                <Col xs={12} sm={6} md={3} lg={3}>
                    <div className={styles.order_elm__product}>
                        <div className={styles.mobile_header}>Product</div>
                        <div className={styles.products}>
                            {showProductImage()}
                        </div>

                    </div>
                </Col>
                <Col xs={12} sm={6} md={2} lg={3}>
                    <div className={styles.order_elm}>
                        <div className={styles.mobile_header}>Code</div>
                        {order && order.code}
                    </div>
                </Col>
                <Col xs={6} sm={3} md={2} lg={2}>
                    <div className={styles.order_elm}>
                        <div className={styles.mobile_header}>Status</div>
                        {order && order.status}
                    </div>
                </Col>
                <Col xs={6} sm={2} md={2} lg={1}>
                    <div className={styles.order_elm}>
                        <div className={styles.mobile_header}>Price</div>
                        {order && order.payment_amount}
                    </div>
                </Col>
                <Col xs={6} sm={3} md={1} lg={1}>
                    <div className={styles.order_elm}>
                        <div className={styles.mobile_header}>Transport</div>
                        {order && order.transport_fee}
                    </div>
                </Col>
                <Col xs={6} sm={4} md={2} lg={2}>
                    <div className={styles.order_elm}>
                        <div className={styles.mobile_header}>Time</div>
                        {order && getDateTime(order.purchase_time)}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default UserOrder