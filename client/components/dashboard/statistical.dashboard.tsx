import { faDollyFlatbed, faMarker, faShoppingCart, faShuttleVan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap'
import { OrderInterface } from '../../interface/order';
import styles from './dashboard.module.scss'

export interface DashboardStatisticalProps {
    orders: OrderInterface[]
}

const DashboardStatistical: React.SFC<DashboardStatisticalProps> = ({orders}) => {
    const [allOrders, setAllOrder] = useState<number>(0) 
    const [verifing, setVerifying] = useState<number>(0)
    const [delivering, setDelivering] = useState<number>(0)
    const [delivered, setDelivered] = useState<number>(0)

    const statistics = () => {
        let counters = {
            all: 0,
            verifing: 0,
            delivering: 0,
            delivered: 0
        }
        orders.forEach((v) => {
            counters.all++
            v.status === "verifing" && counters.verifing++
            v.status === "delivering" && counters.delivering++
            v.status === "delivered" && counters.delivered++
        })
        return counters
    }

    useEffect(() => {
        if(orders) {
            const statisResult = statistics();
            setAllOrder(statisResult.all)
            setVerifying(statisResult.verifing)
            setDelivering(statisResult.delivering)
            setDelivered(statisResult.delivered)
        }
    }, [orders])

    return (
        <div className={styles.statistical_area}>
            <h5>Statistical Orders</h5>
            <div className={styles.hr__sublime}></div>
            <div className={styles.statistical}>
                <Row>
                    <Col xs={6} sm={6} md={4} lg={3}>
                        <div className={styles.statistical_item__green}>
                            <div className={styles.label}>
                                <FontAwesomeIcon icon={faShoppingCart} height={20} />
                                <p> All Orders </p>
                            </div>
                            <span> {allOrders} </span>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={3}>
                        <div className={styles.statistical_item__blue}>
                            <div className={styles.label}>
                                <FontAwesomeIcon icon={faMarker} height={20} />
                                <p> Verifing </p>
                            </div>

                            <span> {verifing} </span>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={3}>
                        <div className={styles.statistical_item__yellow}>
                            <div className={styles.label}>
                                <FontAwesomeIcon icon={faShuttleVan} height={20} />
                                <p> Delivering </p>
                            </div>

                            <span> {delivering} </span>
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={4} lg={3}>
                        <div className={styles.statistical_item__orange}>
                            <div className={styles.label}>
                                <FontAwesomeIcon icon={faDollyFlatbed} height={20} />
                                <p> Delivered </p>
                            </div>

                            <span> {delivered} </span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default DashboardStatistical;