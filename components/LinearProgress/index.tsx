import styles from './LinearProgress.module.css'

export default function LinearProgress({hidden = false}) {
    return <div className={`${styles.slider} ${hidden && "opacity-0"}`}>
        <div className={styles.line}></div>
        <div className={`${styles.subline} ${styles.inc}`}></div>
        <div className={`${styles.subline} ${styles.dec}`}></div>
    </div>
}