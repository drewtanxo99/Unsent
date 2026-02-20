export default function GlowEffect() {
    return (
        <div
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '600px',
                height: '320px',
                background: 'radial-gradient(ellipse at 50% 0%, rgba(232,192,128,0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
                animation: 'breathe 7s ease-in-out infinite',
            }}
        />
    )
}
