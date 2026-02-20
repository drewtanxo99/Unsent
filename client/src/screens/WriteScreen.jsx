import { useState, useRef, useCallback } from 'react'
import { useLetters } from '../hooks/useLetters.js'
import styles from './WriteScreen.module.css'

export default function WriteScreen({ recipient, onSeal, onDiscard }) {
    const [body, setBody] = useState('')
    const [error, setError] = useState(false)
    const [sealing, setSealing] = useState(false)
    const [showDiscard, setShowDiscard] = useState(false)
    const textareaRef = useRef(null)
    const { createLetter } = useLetters()

    const wordCount = body.trim() === '' ? 0 : body.trim().split(/\s+/).length

    const handleChange = useCallback((e) => {
        setBody(e.target.value)
        setError(false)
        const ta = textareaRef.current
        if (ta) {
            ta.style.height = 'auto'
            ta.style.height = ta.scrollHeight + 'px'
        }
    }, [])

    async function handleSeal() {
        if (!body.trim() || sealing) return
        setSealing(true)
        try {
            await createLetter({ to: recipient, body: body.trim() })
            onSeal()
        } catch {
            setError(true)
            setSealing(false)
        }
    }

    function handleDiscardConfirm() {
        setBody('')
        setShowDiscard(false)
        onDiscard()
    }

    return (
        <div className={styles.container}>
            <button className={styles.back} onClick={() => setShowDiscard(true)} aria-label="Go back">
                ← back
            </button>

            <div className={styles.inner}>
                <div className={styles.salutation}>
                    <span className={styles.dear}>Dear</span>
                    <span className={styles.recipient}>{recipient || '…'}</span>
                </div>

                <div className={`${styles.paperWrap} ${error ? styles.errorFlash : ''}`}>
                    <textarea
                        ref={textareaRef}
                        className={styles.textarea}
                        value={body}
                        onChange={handleChange}
                        placeholder="Say the thing you never could…"
                        rows={6}
                        spellCheck="true"
                        autoFocus
                    />
                </div>
            </div>

            {/* Fixed bottom bar */}
            <div className={styles.bottomBar}>
                <div className={styles.bottomFade} />
                <div className={styles.bottomContent}>
                    <span className={`${styles.wordCount} ${wordCount > 0 ? styles.active : ''}`}>
                        {wordCount > 0 ? `${wordCount} word${wordCount !== 1 ? 's' : ''}` : ''}
                    </span>
                    <div className={styles.bottomActions}>
                        <button className="btn-ghost" onClick={() => setShowDiscard(true)}>
                            Discard
                        </button>
                        <button
                            className="btn-primary"
                            onClick={handleSeal}
                            disabled={!body.trim() || sealing}
                        >
                            {sealing ? 'Sealing…' : 'Seal & Keep'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Discard confirm */}
            {showDiscard && (
                <div className={styles.overlay} onClick={() => setShowDiscard(false)}>
                    <div className={styles.confirmBox} onClick={e => e.stopPropagation()}>
                        <p className={styles.confirmQ}>Leave this letter?</p>
                        <p className={styles.confirmSub}>Your words will be lost.</p>
                        <div className={styles.confirmActions}>
                            <button className="btn-danger" onClick={handleDiscardConfirm}>Yes, discard it</button>
                            <button className="btn-ghost" onClick={() => setShowDiscard(false)}>Keep writing</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
