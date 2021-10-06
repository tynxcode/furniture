import { faFacebook, faInstagram, faPinterest, faTwitter, } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './footer.module.scss'

export interface FooterProps {

}

const Footer: React.SFC<FooterProps> = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <Row>
                    <Col xs={12} sm={12} md={4} lg={3}>
                        <h3>Furniture.</h3>
                        <div className={styles.welcome_text}>Lorem ipsum dolor sit amet consectetur adipisicing elit</div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={3}>
                        <div className={styles.pages}>
                            <div>
                                <h5> Pages </h5>
                                <div className={styles.hr__neuro}></div>
                                <ul>
                                    <li>Home Page</li>
                                    <li>Shop Page</li>
                                    <li>Cart Page</li>
                                    <li>Contact Us</li>
                                </ul>
                            </div>

                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={3}>
                        <div className={styles.support}>
                            <div>
                                <h5> Support &amp; Pivacy </h5>
                                <div className={styles.hr__neuro}></div>
                                <ul>
                                    <li>Terms &amp; Conditions</li>
                                    <li>Privacy Policy</li>
                                    <li>Company Support</li>
                                    <li>FAQuestions</li>
                                </ul>
                            </div>

                        </div>
                    </Col>
                    <Col xs={12} sm={12} md={4} lg={3}>
                        <div className={styles.contact}>
                            <div className={styles.social_linking}>
                                <div className={styles.social_item}>
                                    <FontAwesomeIcon icon={faFacebook} height={40} width={40} color='#415dfe'/>
                                </div>
                                <div className={styles.social_item}>
                                    <FontAwesomeIcon icon={faInstagram} height={40} color='#f12711'/>
                                </div>
                                <div className={styles.social_item}>
                                    <FontAwesomeIcon icon={faTwitter} height={40} color='#14a7fa'/>
                                </div>
                                <div className={styles.social_item}>
                                    <FontAwesomeIcon icon={faPinterest} height={40} color='#e21873'/>
                                </div>
                            </div>
                            <div className={styles.email}>
                                We would love to hear from you <br />
                                contact@site.com
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;