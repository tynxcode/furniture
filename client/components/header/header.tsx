import styles from './header.module.scss'
import Link from 'next/link'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router'
import { useState } from 'react';
import Image from 'next/image'
import MiniCart from '../cart/mini-cart';
import { signIn, useSession, signOut } from "next-auth/client"

export interface HeaderProps { }

const Header: React.SFC<HeaderProps> = () => {
    //States
    const [isActiveMobileNav, setActiveMobileNav] = useState<boolean>(false)
    const [isActiveMobileSearch, setActiveMobileSearch] = useState<boolean>(false)
    const [product, setProduct] = useState<string>('');

    const [session, loading] = useSession()

    //Router
    const router = useRouter()

    const handleSearch = e => {
        let { value } = e.target
        setProduct(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //If doesn't has product name on Search Form, handle mobile Form on Mobile Device
        if (!product) {
            return setActiveMobileSearch(s => s ? false : true)
        }
    }

    return (
        <header className={styles.header}>
            <Container>
                <Row>
                    <Col xs={1} sm={1} md={5} lg={4}>
                        <div className={styles.navbar}>
                            <div className={styles.mobile_bars__active} onClick={() => setActiveMobileNav(true)}>
                                <FontAwesomeIcon
                                    icon={faBars}
                                    height={20}
                                    width={20}
                                />
                            </div>
                            <nav className={isActiveMobileNav ? styles.nav__active : ''}>
                                {/* Only show on Mobile Device */}
                                <div className={styles.mobile_nav_header}>
                                    <div className={styles.mobile_bars__close} onClick={() => setActiveMobileNav(false)}>
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            height={20}
                                            width={20}
                                        />
                                    </div>
                                    <h5>Menu</h5>
                                </div>

                                <Link href="/" passHref>
                                    <a className={router.pathname === '/' ? styles.actived_link : ''}>Home</a>
                                </Link>
                                <Link href='/shop'>
                                    <a className={router.pathname === '/shop' ? styles.actived_link : ''}>Shop</a>
                                </Link>
                                <Link href='/cart'>
                                    <a className={router.pathname === '/cart' ? styles.actived_link : ''}>Cart</a>
                                </Link>
                                <Link href='/contact'>
                                    <a className={router.pathname === '/contact' ? styles.actived_link : ''}>Contact</a>
                                </Link>
                            </nav>
                        </div>
                    </Col>
                    <Col xs={4} sm={4} md={2} lg={4}>
                        <div className={styles.logo}>
                            <h3 onClick={() => router.push('/')}>Furniture.</h3>
                        </div>
                    </Col>
                    <Col xs={7} sm={7} md={5} lg={4}>
                        <div className={styles.search}>
                            <div className={styles.search_form}>
                                <form className={isActiveMobileSearch ? styles.mobile_form__active : ''}>
                                    <input
                                        type='text'
                                        placeholder='Search'
                                        onChange={handleSearch}
                                    />
                                    <button className={styles.search_btn} type='submit' onClick={handleSubmit}>
                                        <FontAwesomeIcon
                                            icon={faSearch}
                                            color='#2d2942'
                                        />
                                    </button>
                                </form>
                            </div>
                            <MiniCart />
                            <div className={styles.user}>
                                {session ?
                                    (<div className={styles.user_image} onClick={() => router.push('user')}>
                                        <Image src={session.user.image} height={35} width={35} />
                                    </div>) :
                                    (<div className={styles.user_icon} onClick={() => signIn()}>
                                        <FontAwesomeIcon icon={faUser} height={16} color='#fff' />
                                    </div>)
                                }
                                {session && (

                                    <div className={styles.user_area}>
                                        <div className={styles.user_info}>
                                            <div className={styles.info__image}>
                                                <Image src={session.user.image} height={75} width={75} />
                                            </div>
                                            <div className={styles.info__name}> {session.user.name} </div>
                                            <div className={styles.action} onClick={() => router.push('/user')}> Your profile </div>
                                        </div>
                                        <div className={styles.signout_btn}>
                                            <button onClick={() => signOut()}> Sign Out </button>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;