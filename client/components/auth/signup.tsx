import { faKey, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react';
import { AuthStatusEnum } from '../../pages/auth';
import styles from './auth.module.scss'

export interface SignUpProps {
    setStatus: Dispatch<SetStateAction<AuthStatusEnum>>
}

const SignUp: React.SFC<SignUpProps> = ({setStatus}) => {
    return (
        <div className={styles.auth}>
            <form method='post' action='/api/auth/callback/credentials'>
                <h4>Sign Up</h4>
                <div className={styles.form_item}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faUserAlt} /></span>
                        <input name='username' type='text' placeholder='Username' />
                    </div>
                </div>
                <div className={styles.form_item}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faKey} /></span>
                        <input name='password' type='password' placeholder='Password' />
                    </div>
                </div>
                <div className={styles.form_item}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faKey} /></span>
                        <input name='password' type='password' placeholder='Retype password' />
                    </div>
                </div>
                <div className={styles.form_item}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faUserAlt} /></span>
                        <input name='username' type='text' placeholder='Fullname' />
                    </div>
                </div>
                <div className={styles.form_item}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faUserAlt} /></span>
                        <input name='username' type='email' placeholder='Email' />
                    </div>
                </div>
                <div className={styles.form_actions}>
                    <span onClick={() => setStatus(AuthStatusEnum.SignIn)}>Sign in</span>
                    <button type='submit'>Sign up</button>
                </div>

            </form>
        </div>
    );
}

export default SignUp;