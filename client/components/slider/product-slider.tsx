import Image from 'next/image'
import styles from './product-slider.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductInterface } from '../../interface/product';

export interface ProductSliderProps { 
    product: ProductInterface
}

const ProductSlider: React.SFC<ProductSliderProps> = ({product}) => {

    const CustomArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, background: "#14a7fa", borderRadius: '50px'}}
            onClick={onClick}
          />
        );
      }

    const slickSettings = {
        infinite: true,
        lazyLoad: true,
        speed: 500,
        slidesToShow: 5,
        nextArrow: <CustomArrow />,
        prevArrow: <CustomArrow />,
        responsive: [
            {
              breakpoint: 1399,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 1099,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1
              }
            }
          ]
    }

    return (
        <div className={styles.product_slider}>
            <div className={styles.product_image}>
                <Image src={product.image_path} height={400} width={400} />
            </div>
            <div className={styles.image_slider}>
                <Slider {...slickSettings}>
                    <div className={styles.slider_item}>
                        <Image src={product.image_path} className={styles.current_img} height={100} width={100}/>
                    </div>
                    <div className={styles.slider_item}>
                        <Image src={product.image_path}  height={100} width={100}/>
                    </div>
                    <div className={styles.slider_item}>
                        <Image src={product.image_path}  height={100} width={100}/>
                    </div>
                    <div className={styles.slider_item}>
                        <Image src={product.image_path}  height={100} width={100}/>
                    </div>
                    <div className={styles.slider_item}>
                        <Image src={product.image_path}  height={100} width={100}/>
                    </div>
                    <div className={styles.slider_item}>
                        <Image src={product.image_path}  height={100} width={100}/>
                    </div>
                </Slider>
            </div>
        </div>
    );
}

export default ProductSlider;