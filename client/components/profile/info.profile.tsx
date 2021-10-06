import { faAddressCard, faEnvelope, faKey, faPhoneAlt, faUserAlt, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './profile.module.scss'
import { Col, Row } from 'react-bootstrap'
import { ProfileInterface } from '../../interface/profile'
import { useState, useEffect } from 'react'
import { UpdatePasswordVars, UpdateProfileVars } from '../../gql/types'
import { useDispatch } from 'react-redux'
import { newNotification } from '../../redux/slices/notificationSlice'
import { NotificationStatusEnum } from '../notification/notification'

export interface ProfileInfoProps {
    profile: ProfileInterface
    onUpdateProfile: (variable: UpdateProfileVars) => void
    onUpdatePassword: (variable: UpdatePasswordVars) => void
}

const ProfileInfo: React.SFC<ProfileInfoProps> = ({ profile, onUpdatePassword, onUpdateProfile }) => {
    const [info, setInfo] = useState({
        fullname: 'Loading...',
        address: 'Loading...',
        phone: 'Loading...',
        email: 'Loading...',
        infoChange: false
    })

    const [password, setPassword] = useState({
        currentPassword: '********',
        newPassword: '',
        retypePassword: '',
        passwordChange: false,
        error: false
    })
    const dispatch = useDispatch()

    useEffect(() => {
        if (profile) {
            const { fullname, address, phone, email } = profile
            setInfo(s => ({
                ...s,
                fullname,
                address,
                phone,
                email
            }))
        }
    }, [profile])

    const handleChangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value, name } = e.target
        setInfo(s => ({
            ...s,
            infoChange: true,
            [name]: value
        }))
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { value, name } = e.target
        setPassword(s => ({
            ...s,
            passwordChange: true,
            [name]: value
        }))
    }

    const cancelChange = () => {
        const { fullname, address, phone, email } = profile

        setInfo(s => ({
            infoChange: false,
            fullname,
            address,
            phone,
            email
        }))

        setPassword(s => ({
            ...s,
            passwordChange: false,
            newPassword: '',
            retypePassword: '',
            currentPassword: "********"
        }))
    }

    const onUpdate = () => {
        if (password.passwordChange) {
            if (password.newPassword !== password.retypePassword || password.newPassword.length < 1) {
                setPassword(s => ({
                    ...s,
                    newPassword: '',
                    retypePassword: '',
                    error: true
                }))
                dispatch(newNotification({
                    header: "Profile notification",
                    status: NotificationStatusEnum.Error,
                    content: "Password is not matched !",
                    isActive: true
                }))
                return;
            }
            const { error, passwordChange, retypePassword, ...variables } = password
            onUpdatePassword({
                info: variables
            })
            setPassword(s => ({
                ...s,
                passwordChange: false
            }))
        }

        if (info.infoChange) {
            const { infoChange, ...variables } = info
            onUpdateProfile({
                info: variables
            })
            setInfo(s => ({
                ...s,
                infoChange: false
            }))
        }
    }

    return (
        <div className={styles.info_area}>
            <h5>Your information</h5>
            <div className={styles.hr__burning}></div>
            <div className={styles.content}>
                <Row>
                    <Col lg={6}>
                        <div className={styles.user_info}>
                            <h6>
                                <div className={styles.title_icon}>
                                    <FontAwesomeIcon icon={faUserTie} height={20} color='#f30606' />
                                </div>
                                <span>Full Name</span>
                            </h6>
                            <div className={styles.info_item}>
                                <input value={info.fullname} name='fullname' onChange={handleChangeInfo} />
                            </div>

                        </div>
                    </Col>

                    <Col lg={6}>
                        <div className={styles.user_info}>
                            <h6>
                                <div className={styles.title_icon}>
                                    <FontAwesomeIcon icon={faPhoneAlt} height={20} color='#4d68fe' />
                                </div>
                                <span>Phone number</span>
                            </h6>
                            <div className={styles.info_item}>
                                <input value={info.phone} name='phone' onChange={handleChangeInfo} />
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={styles.user_info}>
                            <h6>
                                <div className={styles.title_icon}>
                                    <FontAwesomeIcon icon={faAddressCard} height={20} color='#e21873' />
                                </div>
                                <span>Address</span>
                            </h6>
                            <div className={styles.info_item}>
                                <input value={info.address} name='address' onChange={handleChangeInfo} />
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={styles.user_info}>
                            <h6>
                                <div className={styles.title_icon}>
                                    <FontAwesomeIcon icon={faEnvelope} height={20} color='#ffda1f' />
                                </div>
                                <span>Email</span>
                            </h6>
                            <div className={styles.info_item}>
                                <input value={info.email} name='email' onChange={handleChangeInfo} />
                            </div>
                        </div>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col lg={6}>
                        <div className={styles.user_info}>
                            <h6>
                                <div className={styles.title_icon}>
                                    <FontAwesomeIcon icon={faUserAlt} height={20} color='#78e631' />
                                </div>
                                <span>Username</span>
                            </h6>
                            <div className={styles.info_item}>{profile ? profile.username : "Loading..."}</div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div className={styles.user_info}>
                            <h6>
                                <div className={styles.title_icon}>
                                    <FontAwesomeIcon icon={faKey} height={20} color='#ff8124' />
                                </div>
                                <span>Password</span>

                            </h6>
                            <div className={styles.info_item}>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={password.currentPassword}
                                    placeholder="Current password"
                                    onFocus={() => {
                                        setPassword(s => ({ ...s, currentPassword: '' }))
                                    }}
                                    onChange={handleChangePassword}
                                />
                                {password.passwordChange && (
                                    <>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={password.newPassword}
                                            onChange={handleChangePassword}
                                            placeholder="New password"
                                            style={{
                                                border: password.error ?
                                                    '1px solid #f30606' :
                                                    '1px solid #dcdcdc'
                                            }}
                                            onFocus={() => { setPassword(s => ({ ...s, newPassword: '' })) }}
                                        />
                                        <input
                                            type="password"
                                            name="retypePassword"
                                            value={password.retypePassword}
                                            onChange={handleChangePassword}
                                            placeholder="Re-Type password"
                                            style={{
                                                border: password.error ?
                                                    '1px solid #f30606' :
                                                    '1px solid #dcdcdc'
                                            }}
                                            onFocus={() => { setPassword(s => ({ ...s, retypePassword: '' })) }}
                                        />
                                    </>
                                )}

                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className={styles.info_action} style={{ display: (info.infoChange || password.passwordChange) ? 'flex' : 'none' }}>
                <button onClick={() => onUpdate()}>Save Change</button>
                <button onClick={() => cancelChange()}>Cancel Change</button>
            </div>
        </div>
    );
}

export default ProfileInfo;