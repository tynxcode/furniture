import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faAngleDown, faCog, faHome, } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './menu.module.scss'
import { useState } from 'react';
import { UserMenuEnum } from '../../pages/user';

export interface MenuProps {
    setComponents: (option: UserMenuEnum) => void
}


const Menu: React.SFC<MenuProps> = ({setComponents}) => {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false)

    return (
        <div className={styles.menu}>
            <h6>
                <span>Menu</span>
                <button onClick={() => setMobileMenu(s => !s)}>
                    <FontAwesomeIcon icon={faAngleDown} />
                </button>
            </h6>
            <div className={mobileMenu ? styles.menu_items : styles.menu_items__close}>
                <div className={styles.menu_item} onClick={() => setComponents(UserMenuEnum.Home)}>
                    <div className={styles.menu_icon}>
                        <FontAwesomeIcon icon={faHome} height={20} />
                    </div>
                    <span> Home </span>
                </div>
                <div className={styles.menu_item} onClick={() => setComponents(UserMenuEnum.Account)}>
                    <div className={styles.menu_icon}>
                        <FontAwesomeIcon icon={faUser} height={20} />
                    </div>
                    <span> Account </span>
                </div>
                <div className={styles.menu_item} onClick={() => setComponents(UserMenuEnum.Setting)}>
                    <div className={styles.menu_icon}>
                        <FontAwesomeIcon icon={faCog} height={20} />
                    </div>
                    <span> Settings </span>
                </div>
            </div>
        </div>

    );
}

export default Menu;