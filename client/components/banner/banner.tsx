import styles from './banner.module.scss'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAppStoreIos, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import Image from 'next/image'

export interface BannerProps {

}

const Banner: React.SFC<BannerProps> = () => {
    return (
        <section className={styles.banner}>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={5} xl={4}>
                        <div className={styles.content}>
                            <div className={styles.text_contaner}>
                                <h5>EST 2021</h5>
                                <div className={styles.slogan}>
                                    style <span>&amp;</span> <br /> comfort  <span>at</span><br /> <span>Mi</span> Furniture.
                                </div>
                                <div className={styles.awesome_text}>
                                    Trends go in and out of style every years. So while everyone should by furniture
                                    remember they should be worthy for your home.
                                </div>
                                <div className={styles.dowload_method}>
                                    <h6>Dowload is available on</h6>
                                    <div className={styles.dowload_btn}>
                                        <button><FontAwesomeIcon icon={faAppStoreIos} height={30} width={30} color='#14a7fa'/> <span>App Store</span></button>
                                        <button><FontAwesomeIcon icon={faGooglePlay} height={25} width={25} color='#f30606'/> <span>Google Play</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={7} xl={8}>
                        <div className={styles.image}>
                            <div className={styles.circle_border}>
                                <div className={styles.circle}>
                                    <Image src='/furniture/bed_01.png' height={550} width={550} />
                                    
                                </div>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Banner;