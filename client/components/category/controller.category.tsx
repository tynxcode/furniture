import styles from './category.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { CategoryEnum } from '../../interface/product'

export interface CategoryControllerProps {
    category: CategoryEnum
    getProducts: (category: CategoryEnum) => void
}

const CategoryController: React.SFC<CategoryControllerProps> = ({ category, getProducts }) => {

    const activeElement = (elm: CategoryEnum) => {
        if (elm == category)
            return styles.element__active
        return styles.element
    }

    const welcomeText = (elm: CategoryEnum): string => {
        switch (elm) {
            case CategoryEnum.Chair:
                return `Chairs always remain on trend. We help you to choose right one 
                    because it leads you to an overall inprovement in your lifestyle`
            case CategoryEnum.Bed:
                return `Bed always remain on trend. We help you to choose right one 
                    because it leads you to an overall inprovement in your lifestyle`
            case CategoryEnum.Table:
                return `Table always remain on trend. We help you to choose right one 
                    because it leads you to an overall inprovement in your lifestyle`
            case CategoryEnum.Sofa:
                return `Sofa always remain on trend. We help you to choose right one 
                    because it leads you to an overall inprovement in your lifestyle`
            case CategoryEnum.Wardrobe:
                return `Wardrobe always remain on trend. We help you to choose right one 
                    because it leads you to an overall inprovement in your lifestyle`
            case CategoryEnum.Lamp:
                return `Lamp always remain on trend. We help you to choose right one 
                    because it leads you to an overall inprovement in your lifestyle`
            default:
                return `Chairs always remain on trend. We help you to choose right one 
                    because it leads you to an overall inprovement in your lifestyle`
        }
    }

    return (
        <div className={styles.controller}>
            <div className={styles.picker}>
                <div className={activeElement(CategoryEnum.Chair)} onClick={() => getProducts(CategoryEnum.Chair)}>
                    <Image src='/icon/chair.png' width={20} height={20} />
                </div>
                <div className={activeElement(CategoryEnum.Bed)} onClick={() => getProducts(CategoryEnum.Bed)}>
                    <Image src='/icon/bed.png' width={20} height={20} />
                </div>
                <div className={activeElement(CategoryEnum.Table)} onClick={() => getProducts(CategoryEnum.Table)}>
                    <Image src='/icon/round-table.png' width={20} height={20} />
                </div>
                <div className={activeElement(CategoryEnum.Sofa)} onClick={() => getProducts(CategoryEnum.Sofa)}>
                    <Image src='/icon/sofa.png' width={20} height={20} />
                </div>
                <div className={activeElement(CategoryEnum.Wardrobe)} onClick={() => getProducts(CategoryEnum.Wardrobe)}>
                    <Image src='/icon/wardrobe.png' width={20} height={20} />
                </div>
                <div className={activeElement(CategoryEnum.Lamp)} onClick={() => getProducts(CategoryEnum.Lamp)}>
                    <Image src='/icon/lamp.png' width={20} height={20} />
                </div>
            </div>
            <div className={styles.introduction_text}>
                <h5>{category}</h5>
                <div className={styles.text}>
                    {welcomeText(category)}
                </div>
            </div>
            <div className={styles.browse_btn}>
                <button>
                    <FontAwesomeIcon icon={faLongArrowAltRight} height={30} width={30} color='#fff' />
                </button>
                <span>Browse All Product</span>
            </div>
        </div>
    );
}

export default CategoryController;