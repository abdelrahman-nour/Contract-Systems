import { useCallback, useState } from 'react'
import { MotionReadyContext } from './hooks/useMotion'
import Intro, { shouldShowIntro } from './components/Intro'
import Header from './components/Header'
import Footer from './components/Footer'
import PriceHero from './components/PriceHero'
import Coverage from './components/Coverage'
import Clauses from './components/Clauses'
import SignForm from './components/SignForm'
import SignedView from './components/SignedView'

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)
  const [ready, setReady] = useState(!showIntro)
  const [record, setRecord] = useState(null)

  const handleIntroDone = useCallback(() => {
    setReady(true)
    setTimeout(() => setShowIntro(false), 800) // بعد ما الـ intro يخلص حركته لفوق
  }, [])

  function handleSigned(newRecord) {
    setRecord(newRecord)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <MotionReadyContext.Provider value={ready}>
      {showIntro && <Intro onDone={handleIntroDone} />}
      <div className="page-glow" aria-hidden="true" />

      <div className="page-gutter">
        <div className="mx-auto max-w-3xl py-8 sm:py-12">
          <Header />

          {record ? (
            <SignedView record={record} />
          ) : (
            <main>
              <PriceHero />
              <Coverage />
              <Clauses />
              <SignForm onSigned={handleSigned} />
            </main>
          )}

          <Footer />
        </div>
      </div>
    </MotionReadyContext.Provider>
  )
}
