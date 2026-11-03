import { INCLUDED, EXCLUDED, EXCLUDED_NOTE } from '../data/agreement'
import { CheckIcon, CrossIcon } from './Icons'
import Reveal from './Reveal'

export default function Coverage() {
  return (
    <Reveal className="grid gap-4 sm:grid-cols-2">
      <div className="anim-up min-w-0 rounded-2xl border border-line bg-panel p-6" style={{ '--i': 0 }}>
        <h2 className="mb-5 flex items-center gap-3 font-display text-xl font-bold">
          <span className="grid size-7 place-content-center rounded-full bg-lime text-lime-ink">
            <CheckIcon />
          </span>
          الاشتراك بيشمل
        </h2>
        <ul className="grid gap-3 text-[15px]">
          {INCLUDED.map((item, i) => (
            <li key={item.title} className="anim-up flex gap-3" style={{ '--i': i + 2 }}>
              <span className="text-lime" aria-hidden="true">●</span>
              <span>
                <b className="font-semibold">{item.title}:</b> {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="anim-up min-w-0 rounded-2xl border border-dashed border-line p-6" style={{ '--i': 1 }}>
        <h2 className="mb-5 flex items-center gap-3 font-display text-xl font-bold">
          <span className="grid size-7 place-content-center rounded-full border-2 border-danger text-danger">
            <CrossIcon />
          </span>
          مش شامل في الاشتراك
        </h2>
        <ul className="grid gap-3 text-[15px]">
          {EXCLUDED.map((text, i) => (
            <li key={text} className="anim-up flex gap-3" style={{ '--i': i + 3 }}>
              <span className="text-danger" aria-hidden="true">●</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 border-t border-line pt-4 text-sm text-mute">{EXCLUDED_NOTE}</p>
      </div>
    </Reveal>
  )
}
