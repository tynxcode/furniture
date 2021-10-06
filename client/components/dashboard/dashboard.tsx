import { useQuery, useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { PROFILE, GET_ORDERS_BY_CODE } from '../../gql/queries';
import { OrderProductInterface } from '../../interface/order';
import { ProfileData, GetOrdersByCodeData, GetOrdersByCodeVars } from '../../gql/types';

import styles from './dashboard.module.scss'
import DashboardOrder from './order.dashboard';
import DashboardProduct from './product.dashboard';
import DashboardStatistical from './statistical.dashboard';

export interface DashboardProps { }

export enum DashboardStatusEnum {
    Order = 'order',
    Product = 'product'
}

const Dashboard: React.SFC<DashboardProps> = () => {
    const [dashboardStatus, setDashboardStatus] = useState<DashboardStatusEnum>(DashboardStatusEnum.Order)
    const [orderProducts, setOrderProducts] = useState<OrderProductInterface[]>(null)
    const { data, loading, error } = useQuery<ProfileData, {}>(PROFILE, {
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache'
    })
    const [getOrders, getOrdersResult] = useLazyQuery<GetOrdersByCodeData, GetOrdersByCodeVars>(GET_ORDERS_BY_CODE)

    const ordersCode = data?.profile?.orders
    const orders = getOrdersResult?.data?.getOrdersByCode

    useEffect(() => {
        if (ordersCode) {
            getOrders({
                variables: {
                    code: ordersCode
                }
            })
        }
    }, [ordersCode])

    const changeStatus = (status: DashboardStatusEnum, products: OrderProductInterface[]) => {
        setDashboardStatus(status)
        setOrderProducts(products)
    }

    return (
        <div className={styles.dashboard}>
            <DashboardStatistical orders={orders} />
            {dashboardStatus === DashboardStatusEnum.Order ?
                <DashboardOrder changeStatus={changeStatus} orders={orders} loading={loading} /> :
                <DashboardProduct changeStatus={changeStatus} orderProducts={orderProducts} />
            }
        </div>
    );
}

export default Dashboard;