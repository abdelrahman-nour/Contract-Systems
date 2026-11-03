import { useEffect, useState } from 'react'
import Logo from './Logo'

const SEEN_KEY = 'tapko-intro-seen'

/** الـ intro بيظهر مرة واحدة في الـ session، ومش بيظهر لو الجهاز مفعّل reduce motion */
export function shouldShowIntro() {
  try {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return false
    return !sessionStorage.getItem(SEEN_KEY)
  } catch {
    return true
  }
}

export default function Intro({ onDone }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setLeaving(true), 1900)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (!leaving) return
    try { sessionStorage.setItem(SEEN_KEY, '1') } catch { /* private mode */ }
    document.body.style.overflow = ''
    onDone() // الصفحة تبدأ أنيميشنها وهي الـ intro بيطلع لفوق
  }, [leaving, onDone])

  return (
    <div
      className={`intro ${leaving ? 'is-out pointer-events-none' : ''}`}
      onClick={() => setLeaving(true)}
      role="presentation"
    >
      <div className="flex flex-col items-center gap-4" dir="ltr">
        <div className="intro-logo">
          <Logo className="h-14 sm:h-16" />
        </div>
        <div className="intro-line w-40" />
        <p className="intro-tag text-sm text-mute">One tap. Everything connected.</p>
      </div>
    </div>
  )
}
