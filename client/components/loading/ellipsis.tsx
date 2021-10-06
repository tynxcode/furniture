import styles from './loading.module.scss'

export interface EllipsisLoadingProps {
    
}
 
const EllipsisLoading: React.SFC<EllipsisLoadingProps> = () => {
    return (  
        <div className={styles.lds_ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
 
export default EllipsisLoading;