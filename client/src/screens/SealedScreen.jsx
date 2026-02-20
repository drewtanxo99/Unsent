import styles from './SealedScreen.module.css'

export default function SealedScreen({ onWriteAnother, onArchive }) {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.candle} role="img" aria-label="candle">
                    🕯
                </div>
                <h2 className={styles.heading}>Sealed</h2>
                <p className={styles.sub}>
                    It's kept now. Safe, private, entirely yours.
                    <br />
                    You said the thing. That took courage.
                </p>
                <div className={styles.actions}>
                    <button className="btn-primary" onClick={onWriteAnother}>
                        Write Another
                    </button>
                    <button className="btn-ghost" onClick={onArchive}>
                        See My Letters →
                    </button>
                </div>
            </div>
        </div>
    )
}
