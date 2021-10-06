import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import Image from 'next/image'
import { Col, Row } from 'react-bootstrap'
import styles from './cart.module.scss'
import { faCaretDown, faCaretUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CartItemInterface } from '../../interface/cart';

interface CartItemProps {
    item: CartItemInterface
}

const CartItem: React.SFC<CartItemProps> = ({ item }) => {
    const dispatch = useDispatch()
    const { product, quantity } = item

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        dispatch(
            updateQuantity({
                product: product,
                quantity: Number(value),
                total_price: (Number(value)) * product.price
            })
        )
    }

    const handleQuantityBtn = (type: string) => {
        switch (type) {
            case 'incr':
                return dispatch(
                    updateQuantity({
                        product: product,
                        quantity: quantity + 1,
                        total_price: (quantity + 1) * product.price
                    })
                )

            case 'decr':
                if (quantity > 1)
                    return dispatch(
                        updateQuantity({
                            product: product,
                            quantity: quantity - 1,
                            total_price: (quantity - 1) * product.price
                        })
                    )
            default:
                return;
        }
    }

    return (
        <div className={styles.product}>
            <Row>
                <Col xs={8} sm={5} md={5} lg={5}>
                    <div className={styles.name_and_img}>
                        <div className={styles.image}>
                            <Image src={item.product.image_path} height={50} width={50} />
                        </div>
                        <div className={styles.name_and_brand}>
                            <div className={styles.name}>{item.product.name}</div>
                            <div className={styles.brand}>{item.product.brand}</div>
                        </div>
                    </div>
                </Col>
                <Col xs={4} sm={2} md={2} lg={2}>
                    <div className={styles.price}>{item.product.price}</div>
                </Col>
                <Col xs={8} sm={2} md={2} lg={2}>
                    <div className={styles.quantity}>
                        <button><FontAwesomeIcon icon={faCaretDown} height={20} onClick={() => handleQuantityBtn('decr')} /> </button>
                        <input type='number' value={item.quantity} onChange={handleChangeQuantity} />
                        <button><FontAwesomeIcon icon={faCaretUp} height={20} onClick={() => handleQuantityBtn('incr')} /></button>
                    </div>
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                    <div className={styles.total_price}>{item.total_price}</div>
                </Col>
                <Col xs={2} sm={1} md={1} lg={1}>
                    <div className={styles.actions}>
                        <button onClick={() => dispatch(removeFromCart(item))}>
                            <FontAwesomeIcon icon={faTimes} height={20} />
                        </button>
                    </div>

                </Col>
            </Row>
        </div>
    )
}

export default CartItem