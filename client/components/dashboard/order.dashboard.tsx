import styles from './dashboard.module.scss'
import UserOrder from '../orders/user-order';
import { Col, Row } from 'react-bootstrap'
import { DashboardStatusEnum } from './dashboard';
import { OrderInterface, OrderProductInterface } from '../../interface/order';
import EllipsisLoading from '../loading/ellipsis';


export interface DashboardOrderProps {
    changeStatus: (status: DashboardStatusEnum, products: OrderProductInterface[]) => void
    orders: OrderInterface[]
    loading: boolean
}
 
const DashboardOrder: React.SFC<DashboardOrderProps> = ({changeStatus, orders, loading}) => {

    const showOrders = () => {
        let result;
        if(orders) {
            result = orders.map((v, i) => {
                return <UserOrder changeStatus={changeStatus} order={v} key={i}/>
            })
        }
        return result
    }

    return (  
        <div className={styles.order_area}>
                <h5>Your Orders</h5>
                <div className={styles.hr__sublime}></div>
                <div className={styles.orders}>
                    <div className={styles.order_header}>
                        <Row>
                            <Col xs={2} sm={2} md={2} lg={3}>
                                <h6 className={styles.header__product}>Product</h6>
                            </Col>
                            <Col xs={3} sm={3} md={3} lg={3}>
                                <h6 >Code</h6>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <h6>Status</h6>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={1}>
                                <h6>Payment</h6>
                            </Col>
                            
                            <Col xs={1} sm={1} md={1} lg={1}>
                                <h6>Transport</h6>
                            </Col>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <h6>Date</h6>
                            </Col>
                        </Row>
                    </div>
                    { loading ? (<div className={styles.loading}><EllipsisLoading /></div>) : showOrders()}
                </div>
            </div>
    );
}
 
export default DashboardOrder;