import { useEffect } from 'react'
import Personalization from './Personalization'

const TITLE = 'Pacewise — Personalised running advice'
const FAVICON = '/favicon-personalization.svg'
const FONT_URL = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Fraunces:opsz,wght@9..144,600&display=swap'

// Standalone page for the Personalization prototype. It sets its own tab title,
// favicon and font, and puts the previous ones back when it unmounts.
export default function PersonalizationPage() {
  useEffect(() => {
    const icon = document.querySelector('link[rel="icon"]')
    const prevTitle = document.title
    const prevIcon = icon?.getAttribute('href')

    document.title = TITLE
    icon?.setAttribute('href', FAVICON)

    const font = document.createElement('link')
    font.rel = 'stylesheet'
    font.href = FONT_URL
    document.head.appendChild(font)

    return () => {
      document.title = prevTitle
      if (prevIcon) icon?.setAttribute('href', prevIcon)
      font.remove()
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#fbf6ee] px-4 py-10 sm:py-16">
      <Personalization />
    </main>
  )
}
