import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import styles from './mini-cart.module.scss'
import { RootState } from '../../redux/store';
import React from 'react';
import { CartItemInterface } from '../../interface/cart';
import { removeFromCart } from '../../redux/slices/cartSlice';

export interface MiniCartProps { }

const CartItem: React.SFC<{ cartItem: CartItemInterface }> = ({ cartItem }) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.product}>
            <div className={styles.product_img}>
                <Image src={cartItem.product.image_path} height={45} width={45} />
            </div>
            <div className={styles.product_infor}>
                <div className={styles.product_name}> {cartItem.product.name} </div>
                <div className={styles.price_and_quantity}>
                    <div className={styles.price}> ${cartItem.product.price} </div>
                    <div className={styles.quantity}> x{cartItem.quantity} </div>
                </div>
            </div>
            <div className={styles.product_actions}>
                <div className={styles.remove} onClick={() => dispatch(removeFromCart(cartItem))}>
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        color='#fb5959'
                    />
                </div>
            </div>
        </div>
    )
}

const MiniCart: React.SFC<MiniCartProps> = () => {
    const router = useRouter()
    const cart = useSelector((state: RootState) => state.cart.cartItem)


    const showCartItem = () => {
        let result = cart.map((v, i) => {
            return <CartItem cartItem={v} key={i} />
        })
        return result
    }

    return (
        <div className={styles.mini_cart}>
            <div className={styles.cart_icon}>
                <FontAwesomeIcon
                    icon={faShoppingBasket}
                    color='#fff'
                    size='1x'
                />
                <span> {cart.length} </span>
            </div>

            <div className={styles.cart_area}>
                {
                    cart.length > 0 ?
                    showCartItem() :
                    <div className={styles.no_product}>Empty cart !</div>
                }
                <div className={styles.to_cart}>
                    <button onClick={() => router.push('/cart')}> Go To Cart </button>
                </div>
            </div>
        </div>
    );
}

export default MiniCart;