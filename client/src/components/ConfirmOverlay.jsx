import { useEffect } from 'react'
import styles from './ConfirmOverlay.module.css'

export default function ConfirmOverlay({ onConfirm, onCancel }) {
    // Close on Escape
    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') onCancel()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onCancel])

    return (
        <div
            className={styles.overlay}
            onClick={onCancel}
            role="dialog"
            aria-modal="true"
            aria-label="Confirm deletion"
        >
            <div className={styles.box} onClick={e => e.stopPropagation()}>
                <p className={styles.question}>Are you sure?</p>
                <p className={styles.sub}>
                    This letter will be gone forever. No archive.
                    <br />
                    No recovery. Just gone.
                </p>
                <div className={styles.actions}>
                    <button className="btn-danger" onClick={onConfirm}>
                        Yes, delete it
                    </button>
                    <button className="btn-ghost" onClick={onCancel}>
                        Keep it
                    </button>
                </div>
            </div>
        </div>
    )
}
