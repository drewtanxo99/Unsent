import { useState, useEffect } from 'react'
import { useLetters } from '../hooks/useLetters.js'
import styles from './ArchiveScreen.module.css'

export default function ArchiveScreen({ isActive, onRead, onHome }) {
    const [letters, setLetters] = useState([])
    const [loading, setLoading] = useState(true)
    const { fetchLetters } = useLetters()

    useEffect(() => {
        if (!isActive) return
        setLoading(true)
        fetchLetters()
            .then(setLetters)
            .catch(() => setLetters([]))
            .finally(() => setLoading(false))
    }, [isActive])

    return (
        <div className={styles.container}>
            <button className={styles.back} onClick={onHome} aria-label="Go home">
                ← home
            </button>

            <div className={styles.header}>
                <h2 className={`${styles.title} fade-up`}>My Letters</h2>
                {!loading && (
                    <span className={`${styles.count} fade-up`} style={{ animationDelay: '0.1s' }}>
                        {letters.length} {letters.length === 1 ? 'letter' : 'letters'}
                    </span>
                )}
            </div>

            <div className={styles.list}>
                {loading ? (
                    <p className={styles.loading}>…</p>
                ) : letters.length === 0 ? (
                    <p className={`${styles.empty} fade-up`}>
                        You haven't written anything yet.
                        <br />
                        There's someone waiting to hear from you.
                    </p>
                ) : (
                    letters.map((letter, i) => (
                        <button
                            key={letter.id}
                            className={`${styles.row} fade-up`}
                            style={{ animationDelay: `${i * 0.06}s` }}
                            onClick={() => onRead(letter.id)}
                        >
                            <div className={styles.rowLeft}>
                                <div className={styles.toLabel}>
                                    TO — <span>{letter.to.toUpperCase()}</span>
                                </div>
                                <div className={styles.preview}>
                                    {letter.body.slice(0, 90)}{letter.body.length > 90 ? '…' : ''}
                                </div>
                            </div>
                            <div className={styles.date}>{letter.date}</div>
                        </button>
                    ))
                )}
            </div>
        </div>
    )
}
