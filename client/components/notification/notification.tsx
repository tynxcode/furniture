import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './notification.module.scss'
import { closeNotification } from '../../redux/slices/notificationSlice';

export interface NotificationProps { }

export enum NotificationStatusEnum {
    Successfull = 'successfull',
    Error = 'error'
}

const Notification: React.SFC<NotificationProps> = () => {
    const notification = useSelector((state: RootState) => state.notification)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(closeNotification())
    };

    const { status, header, content, isActive } = notification

    return (
        <Modal show={isActive} onHide={handleClose} animation={false}>
            <div className={styles.notification} >
                <div className={styles.header} >
                    <h5> {header} </h5>
                    <button><FontAwesomeIcon icon={faTimes} /></button>
                </div>
                <div className={styles.body}>
                    <div className={styles.icon}>
                        <FontAwesomeIcon 
                            icon={ status === NotificationStatusEnum.Successfull ? faCheckCircle : faTimesCircle} 
                            height={50}
                            style={{ 
                                fontSize: '72px', 
                                color: status === NotificationStatusEnum.Successfull ? '#06e763' : '#f30606'
                            }} 
                        />
                    </div>
                    <div className={styles.text}>
                        {content}
                    </div>
                </div>
                <div className={styles.footer}>
                    <button className={styles.ok_btn} onClick={handleClose}>
                        Confirm
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default Notification;