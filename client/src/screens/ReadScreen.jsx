import { useState, useEffect } from 'react'
import { useLetters } from '../hooks/useLetters.js'
import ConfirmOverlay from '../components/ConfirmOverlay.jsx'
import styles from './ReadScreen.module.css'

export default function ReadScreen({ letterId, isActive, onBack }) {
    const [letter, setLetter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [showConfirm, setShowConfirm] = useState(false)
    const { fetchLetter, deleteLetter } = useLetters()

    useEffect(() => {
        if (!isActive || !letterId) return
        setLoading(true)
        setLetter(null)
        fetchLetter(letterId)
            .then(setLetter)
            .catch(() => setLetter(null))
            .finally(() => setLoading(false))
    }, [letterId, isActive])

    async function handleDelete() {
        try {
            await deleteLetter(letterId)
            setShowConfirm(false)
            onBack()
        } catch {
            setShowConfirm(false)
        }
    }

    return (
        <div className={styles.container}>
            <button className={styles.back} onClick={onBack} aria-label="Back to archive">
                ← back
            </button>

            {loading ? (
                <div className={styles.loading}>…</div>
            ) : !letter ? (
                <div className={styles.error}>Letter not found.</div>
            ) : (
                <div className={styles.inner}>
                    <div className={`${styles.salutation} fade-up`}>
                        <span className={styles.dear}>Dear</span>
                        <span className={styles.recipient}>{letter.to}</span>
                    </div>

                    <div className={`${styles.body} fade-up`} style={{ animationDelay: '0.1s' }}>
                        {letter.body}
                    </div>

                    <div className={`${styles.dateWrap} fade-up`} style={{ animationDelay: '0.2s' }}>
                        {letter.date}
                    </div>

                    <div className={`${styles.actions} fade-up`} style={{ animationDelay: '0.3s' }}>
                        <button
                            className="btn-danger"
                            onClick={() => setShowConfirm(true)}
                        >
                            Delete forever
                        </button>
                    </div>
                </div>
            )}

            {showConfirm && (
                <ConfirmOverlay
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    )
}
