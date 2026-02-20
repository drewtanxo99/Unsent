import { useState, useEffect } from 'react'
import Particles from './components/Particles.jsx'
import GlowEffect from './components/GlowEffect.jsx'
import NavDots from './components/NavDots.jsx'
import Landing from './screens/Landing.jsx'
import WhoScreen from './screens/WhoScreen.jsx'
import WriteScreen from './screens/WriteScreen.jsx'
import SealedScreen from './screens/SealedScreen.jsx'
import ArchiveScreen from './screens/ArchiveScreen.jsx'
import ReadScreen from './screens/ReadScreen.jsx'

const SCREENS = ['landing', 'who', 'write', 'sealed', 'archive', 'read']
const NAV_SCREENS = ['landing', 'archive']

export default function App() {
    const [screen, setScreen] = useState('landing')
    const [recipient, setRecipient] = useState('')
    const [letterId, setLetterId] = useState(null)

    const show = (name) => setScreen(name)

    // Escape key handler
    useEffect(() => {
        function handleKey(e) {
            if (e.key !== 'Escape') return
            if (screen === 'read') return show('archive')
            if (screen === 'write') return show('who')
            if (screen === 'who') return show('landing')
            if (screen === 'sealed') return show('who')
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [screen])

    const navDotScreen = NAV_SCREENS.includes(screen) ? screen : null

    return (
        <div className="app-shell">
            <GlowEffect />
            <Particles />
            <NavDots
                current={navDotScreen}
                onNavigate={(id) => show(id)}
            />

            {/* Landing */}
            <div className={`screen ${screen !== 'landing' ? 'off' : ''}`}>
                <Landing
                    onBegin={() => show('who')}
                    onArchive={() => show('archive')}
                />
            </div>

            {/* Who */}
            <div className={`screen ${screen !== 'who' ? 'off' : ''}`}>
                <WhoScreen
                    onContinue={(r) => { setRecipient(r); show('write') }}
                    onBack={() => show('landing')}
                />
            </div>

            {/* Write */}
            <div className={`screen ${screen !== 'write' ? 'off' : ''}`}>
                <WriteScreen
                    recipient={recipient}
                    onSeal={() => show('sealed')}
                    onDiscard={() => { setRecipient(''); show('who') }}
                />
            </div>

            {/* Sealed */}
            <div className={`screen ${screen !== 'sealed' ? 'off' : ''}`}>
                <SealedScreen
                    onWriteAnother={() => { setRecipient(''); show('who') }}
                    onArchive={() => show('archive')}
                />
            </div>

            {/* Archive */}
            <div className={`screen ${screen !== 'archive' ? 'off' : ''}`}>
                <ArchiveScreen
                    isActive={screen === 'archive'}
                    onRead={(id) => { setLetterId(id); show('read') }}
                    onHome={() => show('landing')}
                />
            </div>

            {/* Read */}
            <div className={`screen ${screen !== 'read' ? 'off' : ''}`}>
                <ReadScreen
                    letterId={letterId}
                    isActive={screen === 'read'}
                    onBack={() => show('archive')}
                />
            </div>
        </div>
    )
}
