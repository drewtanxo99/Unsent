import { useState } from 'react'
import styles from './WhoScreen.module.css'

const PRESETS = [
    'someone I loved',
    'someone who hurt me',
    'a version of myself',
    'someone I lost',
    'a dream I let go of',
]

export default function WhoScreen({ onContinue, onBack }) {
    const [selected, setSelected] = useState('')
    const [custom, setCustom] = useState('')

    const recipient = custom.trim() || selected
    const canContinue = recipient.length > 0

    function handlePreset(val) {
        setSelected(val)
        setCustom('')
    }

    function handleCustom(e) {
        setCustom(e.target.value)
        setSelected('')
    }

    return (
        <div className={styles.container}>
            <button className={styles.back} onClick={onBack} aria-label="Go back">
                ← back
            </button>

            <div className={styles.inner}>
                <h2 className={`${styles.question} fade-up`} style={{ animationDelay: '0s' }}>
                    Who have you been carrying in silence?
                </h2>

                <div className={styles.presets}>
                    {PRESETS.map((p, i) => (
                        <button
                            key={p}
                            className={`${styles.preset} ${selected === p ? styles.active : ''} fade-up`}
                            style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                            onClick={() => handlePreset(p)}
                        >
                            <span className={styles.dash}>—</span>
                            {p}
                        </button>
                    ))}
                </div>

                <div className={`${styles.customWrap} fade-up`} style={{ animationDelay: '0.6s' }}>
                    <input
                        className={styles.customInput}
                        type="text"
                        placeholder="or write their name…"
                        value={custom}
                        onChange={handleCustom}
                        maxLength={80}
                        autoComplete="off"
                        spellCheck="false"
                    />
                </div>

                <div className={`${styles.actions} fade-up`} style={{ animationDelay: '0.72s' }}>
                    <button
                        className="btn-primary"
                        disabled={!canContinue}
                        onClick={() => canContinue && onContinue(recipient)}
                    >
                        Continue →
                    </button>
                </div>
            </div>
        </div>
    )
}
