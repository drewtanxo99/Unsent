import { useEffect, useRef } from 'react'
import styles from './Landing.module.css'

export default function Landing({ onBegin, onArchive }) {
    const containerRef = useRef(null)

    useEffect(() => {
        const els = containerRef.current?.querySelectorAll('[data-anim]')
        if (!els) return
        els.forEach((el, i) => {
            el.style.animationDelay = `${i * 0.15}s`
            el.classList.add('fade-up')
        })
    }, [])

    return (
        <div className={styles.container} ref={containerRef}>

            {/* Decorative top mark */}
            <div className={styles.topMark} data-anim>
                <span className={styles.topLine} />
                <span className={styles.topDot} />
                <span className={styles.topLine} />
            </div>

            {/* Hero brand */}
            <div className={styles.hero} data-anim>
                <p className={styles.eyebrow}>a private space</p>
                <h1 className={styles.title}>
                    <span className={styles.titleGhost}>U</span>nsent
                </h1>
                <p className={styles.tagline}>for the things you couldn't say</p>
            </div>

            {/* Ornamental divider */}
            <div className={styles.divider} data-anim>
                <span className={styles.divLine} />
                <span className={styles.divSymbol}>✦</span>
                <span className={styles.divLine} />
            </div>

            {/* Body copy */}
            <div className={styles.body} data-anim>
                <p className={styles.bodyText}>
                    Write to the person you loved in silence.
                    The one who left before you were ready.
                    Your younger self. A dream you finally let go.
                    <br /><br />
                    Say the thing. No one else will read it.
                </p>
            </div>

            {/* CTA */}
            <div className={styles.actions} data-anim>
                <button className={`btn-primary ${styles.mainCta}`} onClick={onBegin}>
                    Begin Writing
                </button>
                <button className="btn-ghost" onClick={onArchive}>
                    My Letters →
                </button>
            </div>

            {/* Feature hints */}
            <div className={styles.hints} data-anim>
                <span className={styles.hint}>Private</span>
                <span className={styles.hintDot}>·</span>
                <span className={styles.hint}>On-device</span>
                <span className={styles.hintDot}>·</span>
                <span className={styles.hint}>Always yours</span>
            </div>


        </div>
    )
}
