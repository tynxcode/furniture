import styles from './product.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faEye, faHeart, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'
import { ProductInterface } from '../../interface/product'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/slices/cartSlice'
import { CartItemInterface } from '../../interface/cart'
import Image from 'next/image'
import { useState } from 'react'

export interface ProductProps {
    product: ProductInterface
}

const Product: React.SFC<ProductProps> = ({ product }) => {
    const [isAddToCart, setIsAddToCart] = useState<boolean>(false)

    const router = useRouter()
    const dispatch = useDispatch()

    const onAddToCart = () => {
        const initializeCartItem = (): CartItemInterface => {
            let cartItem: CartItemInterface = {
                product,
                quantity: 1,
                total_price: product.price
            }
            return cartItem
        }
        setIsAddToCart(true)
        dispatch(addToCart(initializeCartItem()))
    }

    return (
        <div className={styles.product} >
            <div className={styles.image}>
                <Image src={product.image_path} height={150} width={150} />
                <span> <FontAwesomeIcon icon={faHeart} height={18} width={18} color='#fff' /> </span>
            </div>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.review_rate}>
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
                ({product.review.review_point})
            </div>
            <div className={styles.sub_text}>{product.brand}</div>
            <div className={styles.price_and_buying}>
                <div className={styles.price}>
                    $ {product.price}
                </div>
                <div className={styles.actions}>
                    <button className={styles.add_to_cart_btn} onClick={() => onAddToCart()}>
                        <FontAwesomeIcon icon={isAddToCart ? faCheck : faPlus} height={20} width={20} color='#fff' />
                    </button>
                    <button className={styles.view_btn} onClick={() => router.push(`product/${product.id}`)}>
                        <FontAwesomeIcon icon={faEye} height={20} width={20} color='#fff' />
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Product;