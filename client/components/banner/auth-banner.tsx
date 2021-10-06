import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useRouter } from 'next/router';
import styles from './auth-banner.module.scss'

export interface AuthBannerProps {

}

const AuthBanner: React.SFC<AuthBannerProps> = () => {
    const router = useRouter()

    return (
        <div className={styles.banner}>
            
            <div className={styles.banner_area}>
                <div>
                <h3 onClick={() => router.push('/')}>Furniture.</h3>
                    <h4>Welcome to Tynx&apos; furniture shop</h4>
                    <Image src='/banner/auth.png' height={350} width={350} />
                    <div className={styles.contact}>
                        <div className={styles.contact_item}>
                            <FontAwesomeIcon icon={faFacebook} height={24} color='#14a7fa'/>
                            <span> Tynx Fanpage </span>
                        </div>
                        <div className={styles.contact_item}>
                            <FontAwesomeIcon icon={faInstagram} height={24} color='#e21873'/>
                            <span> furnituretynx </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AuthBanner;