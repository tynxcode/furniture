import styles from './dashboard.module.scss'
import { Col, Row } from 'react-bootstrap'
import OrderProduct from '../orders/order-product';
import { OrderProductInterface } from '../../interface/order';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { DashboardStatusEnum } from './dashboard';

export interface DashboardProductProps {
    orderProducts: OrderProductInterface[]
    changeStatus: (status: DashboardStatusEnum, products: OrderProductInterface[]) => void
}

const DashboardProduct: React.SFC<DashboardProductProps> = ({orderProducts, changeStatus}) => {

    const showProducts = () => {
        let products;
        if(orderProducts) {
            products = orderProducts.map((v,i) => {
                return <OrderProduct orderProduct={v} key={i} />
            })
        }
        return products
    }

    return (
        <div className={styles.product_area}>
            <h5>
                <button onClick={() => changeStatus(DashboardStatusEnum.Order, null)}><FontAwesomeIcon icon={faAngleLeft} /></button>
                Order Detail
                </h5>
            <div className={styles.hr__sublime}></div>
            <div className={styles.products}>
                <div className={styles.product_header}>
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={3}>
                            <h6 className={styles.header__product}>Product detail</h6>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3}>
                            <h6 >Price</h6>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                            <h6>Quantity</h6>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                            <h6>Discount</h6>
                        </Col>
                        <Col xs={1} sm={1} md={1} lg={2}>
                            <h6>Total price</h6>
                        </Col>
                    </Row>
                </div>
                {showProducts()}
            </div>
        </div>
    );
}

export default DashboardProduct;