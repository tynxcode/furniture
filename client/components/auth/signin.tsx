import { faKey, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dispatch, SetStateAction } from 'react';
import { AuthStatusEnum } from '../../pages/auth';
import styles from './auth.module.scss'

import { useRouter } from 'next/router';

export interface SignInProps {
    csrfToken: string
    setStatus: Dispatch<SetStateAction<AuthStatusEnum>>
}

const SignIn: React.SFC<SignInProps> = ({csrfToken, setStatus}) => {
    const router = useRouter()
    const { error } = router.query

    return (
        <div className={styles.auth}>
            <form method='post' action='/api/auth/callback/credentials'>
            <h4>Sign In</h4>
                <div className={styles.error}>{error ? error : '' }</div>
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <div className={styles.form_item}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon  icon={faUserAlt}/></span>
                        <input name='username' type='text' placeholder='Username'/>
                    </div>
                </div>
                <div className={styles.form_item}>
                    <div className={styles.item}>
                        <span><FontAwesomeIcon icon={faKey}/></span>
                        <input name='password' type='password' placeholder='Password'/>
                    </div> 
                </div>
                <div className={styles.form_actions}>
                    <span onClick={() => setStatus(AuthStatusEnum.SignUp)}>Register</span>
                    <button type='submit'>Sign in</button>
                </div>
                
            </form>
        </div>
    );
}

export default SignIn;