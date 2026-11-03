import { CLAUSES } from '../data/agreement'
import Reveal from './Reveal'

export default function Clauses() {
  return (
    <Reveal className="mt-14">
      <h2 className="anim-up mb-6 font-display text-2xl font-bold">بنود الاتفاق</h2>
      <ol className="border-t border-line">
        {CLAUSES.map((clause, i) => (
          <li
            key={clause.title}
            className="anim-up group grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5"
            style={{ '--i': i + 1 }}
          >
            <span className="font-mono font-bold text-lime tabular-nums transition-transform group-hover:-translate-x-1" dir="ltr">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="mb-1 font-semibold">{clause.title}</h3>
              <p className="text-mute">{clause.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Reveal>
  )
}
