import { Col, Container, Row } from 'react-bootstrap'
import styles from './cart.module.scss'
import { faDolly, faMapMarkerAlt, faPercent, faPhoneAlt, faPlusCircle, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { CartItemInterface } from '../../interface/cart';
import CartItem from './item.cart'
import { CreateOrderArgs, CreateOrderData, ProfileData } from '../../gql/types';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_NEW_ORDER } from '../../gql/mutations';
import { useDispatch } from 'react-redux';
import { PROFILE } from '../../gql/queries';
import { newNotification } from '../../redux/slices/notificationSlice';
import { NotificationStatusEnum } from '../notification/notification';
import { resetCart } from '../../redux/slices/cartSlice';

interface CartProps { }

const Cart: React.SFC<CartProps> = () => {
    const [subTotal, setSubTotal] = useState<number>(0)
    const [transportFee, setTransportFee] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [confirmOrder, setConfirmOrder] = useState<boolean>(false)

    const cart = useSelector((state: RootState) => state.cart)
    const profileData = useQuery<ProfileData, {}>(PROFILE)
    const [createNewOrder, newOrderResult] = useMutation<CreateOrderData, CreateOrderArgs>(CREATE_NEW_ORDER)
    const dispatch = useDispatch()

    const profile = profileData?.data?.profile
    const newOrderData = newOrderResult?.data
    const newOrderError = newOrderResult?.error

    const subTotalSolution = (items: CartItemInterface[]): number => {
        let total = 0;
        items.forEach((v) => {
            total += v.total_price
        })
        return total
    }

    const discountSolution = (items: CartItemInterface[]): number => {
        let total = 0;
        items.forEach((v) => {
            total = total + (v.product.price * v.product.discount) * v.quantity
        })
        return total
    }

    useEffect(() => {
        const { cartItem } = cart

        if (cartItem) {
            setSubTotal(subTotalSolution(cartItem))
            setDiscount(discountSolution(cartItem))
        }
    }, [cart])

    useEffect(() => {
        let isMounted = true; 
        if (newOrderData) {
            const { code } = newOrderData.createOrder
            dispatch(resetCart())
            dispatch(newNotification({
                isActive: true,
                header: 'Order created !',
                content: `New order created with an order code: ${code} `,
                status: NotificationStatusEnum.Successfull
            }))
        }
        if (newOrderError) {
            dispatch(newNotification({
                isActive: true,
                header: 'Order has some trouble !',
                content: `Your order has some trouble, please try again >.<`,
                status: NotificationStatusEnum.Error
            }))
        }
        return () => { isMounted = false };
    }, [newOrderData, newOrderError])

    const onSubmitOrder = () => {
        
        if (!profile) {
            return dispatch(newNotification({
                isActive: true,
                header: 'Account notification !',
                content: `Signin required !`,
                status: NotificationStatusEnum.Error
            }))
        }

        if (!confirmOrder || cart.cartItem.length < 1) return;

        const orderProducts = () => {
            return cart.cartItem.map((v) => {
                return {
                    product: {
                        name: v.product.name,
                        price: v.product.price,
                        brand: v.product.brand,
                        image_path: v.product.image_path,
                        discount: v.product.discount
                    },
                    quantity: v.quantity,
                    total_price: v.total_price
                }
            })
        }

        const newOrder: CreateOrderArgs = {
            order: {
                payment_amount: subTotal - transportFee - discount,
                products: orderProducts()
            }
        }
        createNewOrder({
            variables: newOrder
        })

    }

    const showCartItem = () => {
        const { cartItem } = cart

        if (cartItem) {
            return cartItem.map((v, i) => {
                return <CartItem item={v} key={i} />
            })
        }
    }

    return (
        <section className={styles.cart}>
            <Container>
                <h4>Shopping Cart</h4>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={8}>
                        <div className={styles.cart_area}>
                            <div className={styles.cart_header}>
                                <Row>
                                    <Col xs={5} sm={5} md={5} lg={5}>
                                        <h6 className={styles.header__product}>Product</h6>
                                    </Col>
                                    <Col xs={2} sm={2} md={2} lg={2}>
                                        <h6>Price</h6>
                                    </Col>
                                    <Col xs={2} sm={2} md={2} lg={2}>
                                        <h6>Quantity</h6>
                                    </Col>
                                    <Col xs={2} sm={2} md={2} lg={2}>
                                        <h6>Total Price</h6>
                                    </Col>
                                    <Col xs={1} sm={1} md={1} lg={1}>
                                        <h6>Action</h6>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                {showCartItem()}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={4}>
                        <div className={styles.order_area}>
                            <div className={styles.order}>
                                <h6>Order Info</h6>

                                <div className={styles.infor}>
                                    <div className={styles.title}>
                                        <span> <FontAwesomeIcon icon={faUser} height={20} color="#14a7fa" /></span>
                                        <p>Buyer </p>
                                    </div>
                                    <p>{profile && profile.fullname}</p>
                                </div>
                                <div className={styles.infor}>
                                    <div className={styles.title}>
                                        <span> <FontAwesomeIcon icon={faMapMarkerAlt} height={20} color="#7414fa" /></span>
                                        <p>Address </p>
                                    </div>
                                    <p>{profile && profile.address}</p>
                                </div>
                                <div className={styles.infor}>
                                    <div className={styles.title}>
                                        <span> <FontAwesomeIcon icon={faPhoneAlt} height={20} color="#e21873" /></span>
                                        <p>Phone </p>
                                    </div>
                                    <p>{profile && profile.phone}</p>
                                </div>
                                <hr />
                                <div className={styles.infor}>
                                    <div className={styles.title}>
                                        <span> <FontAwesomeIcon icon={faPlusCircle} height={20} color="#06e763" /></span>
                                        <p>Subtotal: </p>
                                    </div>
                                    <p>{subTotal} $</p>
                                </div>
                                <div className={styles.infor}>
                                    <div className={styles.title}>
                                        <span><FontAwesomeIcon icon={faDolly} height={20} color="#ffb41f" /></span>
                                        <p>Transport fee: </p>
                                    </div>
                                    <p>{transportFee} $</p>
                                </div>
                                <div className={styles.infor}>
                                    <div className={styles.title}>
                                        <span><FontAwesomeIcon icon={faPercent} height={20} color="#ff8124" /></span>
                                        <p>Discount: </p>
                                    </div>
                                    <p>{discount} $</p>
                                </div>
                                <hr />
                                <div className={styles.infor_total}>
                                    <p>Total: </p>
                                    <p>{(subTotal + transportFee) * (100 - discount) / 100} $</p>
                                </div>
                                <div className={styles.submit}>
                                    <div className={styles.confirm}>
                                        <label className={styles.checkbox}>
                                            <input
                                                type='checkbox'
                                                onChange={() => setConfirmOrder(s => !s)}
                                                checked={confirmOrder}
                                            />
                                            <span className={styles.checker}></span>
                                        </label>
                                        Confirm buying
                                    </div>

                                    <button className={styles.buy_btn} onClick={() => onSubmitOrder()}>Buy Now</button>
                                </div>

                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}



export default Cart;