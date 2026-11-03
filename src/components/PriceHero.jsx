import { CONFIG } from '../data/agreement'
import { useCountUp, useMotionReady } from '../hooks/useMotion'

export default function PriceHero() {
  const ready = useMotionReady()
  const price = useCountUp(CONFIG.price, ready)

  return (
    <section className={`grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-end ${ready ? 'is-in' : ''}`}>
      <div className="min-w-0">
        <p className="anim-up mb-3 text-sm font-semibold text-lime" style={{ '--i': 0 }}>اتفاقية خدمة</p>
        <h1 className="anim-up font-display text-3xl leading-tight font-bold sm:text-4xl" style={{ '--i': 1 }}>
          اتفاقية الاشتراك الشهري للسيستم
        </h1>
        <p className="anim-up mt-4 max-w-[60ch] text-mute" style={{ '--i': 2 }}>
          الاتفاقية دي بتوضح إيه اللي بيشمله الاشتراك الشهري لتشغيل السيستم الخاص بنشاطك التجاري، وإيه اللي بيتحسب
          لوحده. اقرأ البنود، اكتب بياناتك، وأكد موافقتك في الآخر.
        </p>
      </div>

      <div className="anim-up rounded-2xl border border-lime/40 bg-panel/80 px-6 py-5 backdrop-blur sm:min-w-[210px]" style={{ '--i': 3 }}>
        <p className="text-sm text-mute">قيمة الاشتراك</p>
        <p className="mt-2 font-display text-5xl leading-none font-extrabold text-lime tabular-nums" aria-label={`${CONFIG.price}`}>
          {price}
        </p>
        <p className="mt-2 font-medium">جنيه مصري / شهريًا</p>
      </div>
    </section>
  )
}
