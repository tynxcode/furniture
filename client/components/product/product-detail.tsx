import React, { useState } from "react";
import { ProductInterface } from "../../interface/product";
import { faCaretDown, faCaretUp, faCartPlus, faStar, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './product-detail.module.scss'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import { CartItemInterface } from '../../interface/cart'

export interface ProductDetailProps {
    product: ProductInterface
}

const ProductDetail: React.SFC<ProductDetailProps> = ({ product }) => {
    const [quantity, setQuantity] = useState<number>(1)
    const dispatch = useDispatch()

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setQuantity(Number(value))
    }

    const handleQuantityBtn = (type: string) => {
        switch (type) {
            case 'incr':
                return setQuantity(s => s + 1)
            case 'decr':
                if (quantity > 1)
                    return setQuantity(s => s - 1)
            default:
                return;
        }
    }

    const initializeCartItem = (): CartItemInterface => {
        let cartItem: CartItemInterface = {
            product,
            quantity,
            total_price: product.price*quantity
        }
        return cartItem
    }

    return (
        <div className={styles.product_detail}>
            <div className={styles.brand}>{product.brand}</div>
            <h3>{product.name}</h3>
            <div className={styles.rating}>
                <span className={styles.rate}>
                    <FontAwesomeIcon
                        icon={faStar}
                        color={product.review.review_point > 0 ? "#fc0" : "#222"}
                        style={{ marginRight: '5px' }} height={20}
                    />
                    <FontAwesomeIcon
                        icon={faStar}
                        color={product.review.review_point > 1 ? "#fc0" : "#222"}
                        style={{ marginRight: '5px' }} height={20}
                    />
                    <FontAwesomeIcon
                        icon={faStar}
                        color={product.review.review_point > 2 ? "#fc0" : "#222"}
                        style={{ marginRight: '5px' }} height={20}
                    />
                    <FontAwesomeIcon
                        icon={faStar}
                        color={product.review.review_point > 3 ? "#fc0" : "#222"}
                        style={{ marginRight: '5px' }} height={20}
                    />
                    <FontAwesomeIcon
                        icon={faStar}
                        color={product.review.review_point > 4 ? "#fc0" : "#222"}
                        style={{ marginRight: '5px' }} height={20}
                    />
                </span>
                <span>({product.review.review_point}) - {product.review.total} reviews</span>
            </div>

            <h6>Description</h6>
            <div className={styles.description}>
                {product.description}
            </div>

            {/* <h6>Styles</h6>
            <div className={styles.styles}>
                <button className={styles.styles_item_active}> Round Table </button>
                <button className={styles.styles_item}> Square Table </button>
            </div> */}

            <h6>Price &amp; Quantity</h6>
            <div className={styles.price_quantity}>
                <div className={styles.quantity}>
                    <button><FontAwesomeIcon icon={faCaretDown} height={20} onClick={() => handleQuantityBtn('decr')} /> </button>
                    <input type='number' value={quantity} onChange={handleChangeQuantity} />
                    <button><FontAwesomeIcon icon={faCaretUp} height={20} onClick={() => handleQuantityBtn('incr')} /></button>
                </div>
                <div className={styles.price}>$ {product.price*quantity} USD</div>
            </div>

            <h6>Actions</h6>
            <div className={styles.actions}>
                <button className={styles.add_to_cart_btn} onClick={() => { quantity > 0 && dispatch(addToCart(initializeCartItem())) }}>
                    <FontAwesomeIcon icon={faCartPlus} height={20} />
                    &nbsp; Add to cart
                </button>
                <button className={styles.buy_now_btn}>
                    <FontAwesomeIcon icon={faWallet} height={20} />
                    &nbsp; Buy now
                </button>
            </div>
        </div>
    );
}

export default ProductDetail;