import styles from './LinearProgress.module.css'

export default function LinearProgress({hidden = false, thin = false}) {
    return <div className={`${styles.slider} ${hidden && "opacity-0"} ${thin ? styles.thinSlider : styles.thickSlider}`}>
        <div className={styles.line}/>
        <div className={`${styles.subline} ${styles.inc}`}/>
        <div className={`${styles.subline} ${styles.dec}`}/>
    </div>
}