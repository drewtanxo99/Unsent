import styles from './NavDots.module.css'

export default function NavDots({ current, onNavigate }) {
    const dots = [
        { id: 'landing', label: 'Home' },
        { id: 'archive', label: 'My Letters' },
    ]

    return (
        <nav className={styles.nav} aria-label="Navigation">
            {dots.map(dot => (
                <button
                    key={dot.id}
                    className={`${styles.dot} ${current === dot.id ? styles.active : ''}`}
                    onClick={() => onNavigate(dot.id)}
                    aria-label={dot.label}
                    title={dot.label}
                />
            ))}
        </nav>
    )
}
