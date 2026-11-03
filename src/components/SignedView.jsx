import { useRef, useState } from 'react'
import { CONFIG } from '../data/agreement'
import { whatsappLink } from '../lib/agreement'
import { downloadPdf } from '../lib/pdf'
import ContractSheet from './ContractSheet'
import { CheckIcon, DownloadIcon } from './Icons'

export default function SignedView({ record }) {
  const sheetRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | working | done | error

  async function handleDownload() {
    setStatus('working')
    try {
      const pages = sheetRef.current.querySelectorAll('[data-pdf-page]')
      await downloadPdf([...pages], `tapko-agreement-${record.ref}.pdf`)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const label = {
    idle: 'تحميل العقد PDF',
    working: 'بيتجهز...',
    done: 'اتحمّل، حمّل تاني',
    error: 'تحميل العقد PDF',
  }[status]

  return (
    <main className="is-in pt-12">
      <div className="flex items-center gap-4">
        <span className="badge-pop relative grid size-14 shrink-0 place-content-center rounded-full bg-lime text-lime-ink">
          <span className="badge-ring" aria-hidden="true" />
          <span className="check-draw"><CheckIcon size={26} stroke={3} /></span>
        </span>
        <div className="anim-up min-w-0" style={{ '--i': 2 }}>
          <h1 className="font-display text-2xl leading-tight font-bold sm:text-3xl">تم إمضاء الاتفاق بينك وبين tapko</h1>
          <p className="mt-1 text-mute">نسخة العقد بتاعتك جاهزة، حمّلها واحتفظ بيها.</p>
        </div>
      </div>

      <dl style={{ '--i': 3 }} className="anim-up mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 rounded-2xl border border-line bg-panel p-6 text-[15px]">
        <dt className="text-mute">رقم المرجع</dt>
        <dd className="text-right font-mono font-bold text-lime" dir="ltr">{record.ref}</dd>
        <dt className="text-mute">الاسم</dt>
        <dd className="min-w-0 break-words">{record.name}</dd>
        <dt className="text-mute">النشاط التجاري</dt>
        <dd className="min-w-0 break-words">{record.business} ({record.type})</dd>
        <dt className="text-mute">الاشتراك</dt>
        <dd className="tabular-nums">{CONFIG.price} جنيه / شهريًا</dd>
        <dt className="text-mute">تاريخ الإمضاء</dt>
        <dd>{record.signedAtText}</dd>
      </dl>

      <div className="anim-up mt-6 grid gap-3 sm:grid-cols-2" style={{ '--i': 4 }}>
        <button type="button" className="btn-primary" onClick={handleDownload} disabled={status === 'working'}>
          <DownloadIcon />
          {label}
        </button>
        <a className="btn-ghost" href={whatsappLink(record)} target="_blank" rel="noopener noreferrer">
          ابعت نسخة على واتساب tapko
        </a>
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-danger">
          التحميل منجحش. جرّب تاني، أو افتح الصفحة من متصفح تاني.
        </p>
      )}
      <p className="mt-4 text-xs text-mute">
        لو زرار واتساب مفتحش: <span className="font-mono select-all" dir="ltr">{CONFIG.whatsappDisplay}</span>
      </p>

      <ContractSheet ref={sheetRef} record={record} />
    </main>
  )
}
