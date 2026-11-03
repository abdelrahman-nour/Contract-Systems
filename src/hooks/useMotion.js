import { createContext, useContext, useEffect, useRef, useState } from 'react'

/** true بعد ما الـ intro يخلص، علشان أنيميشن الصفحة يبدأ بعده مش تحته */
export const MotionReadyContext = createContext(true)
export const useMotionReady = () => useContext(MotionReadyContext)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** بيرجّع ref + inView: يبقى true أول ما العنصر يظهر على الشاشة (مرة واحدة) */
export function useInView({ threshold = 0.15 } = {}) {
  const ready = useMotionReady()
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ready || inView) return
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setInView(true)

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ready, inView, threshold])

  return [ref, inView]
}

/** عدّاد من 0 للرقم المطلوب (easeOutCubic) */
export function useCountUp(target, start, duration = 1200) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0))

  useEffect(() => {
    if (!start || prefersReducedMotion()) return setValue(target)
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, start, duration])

  return value
}
