import React, { Dispatch, SetStateAction, useState } from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CategoryEnum } from '../../interface/product';
import { GetShopProductsVars } from '../../gql/types';
import styles from './shop.module.scss'

export interface FilterProps {
    getProducts: (filter: GetShopProductsVars) => void
    setCategoryTitle: Dispatch<SetStateAction<string>>
}

const Filter: React.SFC<FilterProps> = ({ getProducts, setCategoryTitle }) => {
    const [category, setCategory] = useState<CategoryEnum | string>('all')
    const [search, setSearch] = useState<string>('')
    const [price, setPrice] = useState<number>(0)

    

    const isChecked = (cate: CategoryEnum | string): boolean => {
        if (cate === category)
            return true
        return false
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target
        setSearch(value)
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target
        setPrice(Number(value))
    }

    const handleChangeOptions = (cate: CategoryEnum | string) => {
        setCategory(cate)
        setCategoryTitle(prev => {
            // if we're searching a product, keep the previous title
            if ((/search/i).test(prev)) {
                return prev
            }
            return cate // if not, set title as selected category
        })
        // If category is "all", get all products
        if (cate === 'all') {
            return getProducts({
                category: null
            })
        }
        // get product by selected category
        getProducts({ category: cate })
    }

    const searchProduct = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        // if search field is empty, get products with current filter
        if (search.length === 0) {
            setCategoryTitle(category)
            return getProducts({
                name: null,
            })
        }
        // Set title and get product by product's name
        setCategoryTitle(`Search result of "${search}"`)
        getProducts({
            name: search
        })
    }

    const getProductWithPriceRange = () => {
        if (price === 0) {
            return getProducts({
                price: null
            })
        }
        getProducts({
            price
        })
    }

    return (
        <article className={styles.filter}>
            <h4>Filter</h4>
            <div className={styles.category}>
                <h6>Category</h6>
                <div className={styles.category_options}>
                    <div className={styles.category_item}>
                        All
                        <label className={styles.checkbox}>
                            <input
                                type='checkbox'
                                onChange={() => handleChangeOptions('all')}
                                checked={isChecked('all')}
                            />
                            <span className={styles.checker}></span>
                        </label>
                    </div>
                    <div className={styles.category_item}>
                        Chair
                        <label className={styles.checkbox}>
                            <input
                                type='checkbox'
                                onChange={() => handleChangeOptions(CategoryEnum.Chair)}
                                checked={isChecked(CategoryEnum.Chair)}
                            />
                            <span className={styles.checker}></span>
                        </label>
                    </div>
                    <div className={styles.category_item}>
                        Lamp
                        <label className={styles.checkbox}>
                            <input
                                type='checkbox'
                                onChange={() => handleChangeOptions(CategoryEnum.Lamp)}
                                checked={isChecked(CategoryEnum.Lamp)}
                            />
                            <span className={styles.checker}></span>
                        </label>
                    </div>
                    <div className={styles.category_item}>
                        Bed
                        <label className={styles.checkbox}>
                            <input
                                type='checkbox'
                                onChange={() => handleChangeOptions(CategoryEnum.Bed)}
                                checked={isChecked(CategoryEnum.Bed)}
                            />
                            <span className={styles.checker}></span>
                        </label>
                    </div>
                    <div className={styles.category_item}>
                        Sofa
                        <label className={styles.checkbox}>
                            <input
                                type='checkbox'
                                onChange={() => handleChangeOptions(CategoryEnum.Sofa)}
                                checked={isChecked(CategoryEnum.Sofa)}
                            />
                            <span className={styles.checker}></span>
                        </label>
                    </div>
                    <div className={styles.category_item}>
                        Table
                        <label className={styles.checkbox}>
                            <input
                                type='checkbox'
                                onChange={() => handleChangeOptions(CategoryEnum.Table)}
                                checked={isChecked(CategoryEnum.Table)}
                            />
                            <span className={styles.checker}></span>
                        </label>
                    </div>
                    <div className={styles.category_item}>
                        Wardrobe
                        <label className={styles.checkbox}>
                            <input
                                type='checkbox'
                                onChange={() => handleChangeOptions(CategoryEnum.Wardrobe)}
                                checked={isChecked(CategoryEnum.Wardrobe)}
                            />
                            <span className={styles.checker}></span>
                        </label>
                    </div>
                </div>
            </div>
            <div className={styles.search}>
                <h6>Search Product</h6>
                <form className={styles.search_form} onSubmit={searchProduct}>
                    <input type='text' onChange={handleSearchChange} value={search} />
                    <button type='submit'> <FontAwesomeIcon icon={faSearch} height={20} /> </button>
                </form>
            </div>
            {/* <div className={styles.rating}>
                <h6>Product Rating</h6>
                <span className={styles.rate}>
                    <FontAwesomeIcon icon={faStar} style={{ marginRight: '5px' }} height={20} />
                    <FontAwesomeIcon icon={faStar} style={{ marginRight: '5px' }} height={20} />
                    <FontAwesomeIcon icon={faStar} style={{ marginRight: '5px' }} height={20} />
                    <FontAwesomeIcon icon={faStar} style={{ marginRight: '5px' }} height={20} />
                    <FontAwesomeIcon icon={faStar} style={{ marginRight: '5px' }} height={20} />
                </span>
                <div className={styles.rating_content}> 4 star or above </div>
            </div> */}
            <div className={styles.price_range}>
                <h6>Price Range</h6>
                <div className={styles.price}>$ {price} USD</div>
                <input type='range' min={0} max={1000} defaultValue={0} onChange={handlePriceChange} />
                <div className={styles.get_products_btn}>
                    <button onClick={() => getProductWithPriceRange()}> Get Products </button>
                </div>

            </div>

        </article>
    );
}

export default Filter;