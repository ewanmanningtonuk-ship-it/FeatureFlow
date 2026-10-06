import { useEffect, useState } from 'react'
import App from './App'
import PersonalizationPage from './components/personalization/PersonalizationPage'

// Which prototype this build serves. Each Vercel project sets VITE_PROTOTYPE to
// pick one; with it unset, production builds serve the tracker only, so the
// existing tracker deployment is unaffected. Local dev serves both, switched by
// the URL hash (/#personalization).
const PROTOTYPE = import.meta.env.VITE_PROTOTYPE || (import.meta.env.DEV ? 'all' : 'tracker')

const isPersonalizationHash = () => window.location.hash === '#personalization'

function DevSwitcher() {
  const [showPersonalization, setShowPersonalization] = useState(isPersonalizationHash)

  useEffect(() => {
    const onHashChange = () => setShowPersonalization(isPersonalizationHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return showPersonalization ? <PersonalizationPage /> : <App />
}

export default function Root() {
  if (PROTOTYPE === 'personalization') return <PersonalizationPage />
  if (PROTOTYPE === 'tracker') return <App />
  return <DevSwitcher />
}
