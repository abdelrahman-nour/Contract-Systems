import { useState } from 'react'
import { BUSINESS_TYPES, CONFIG, OTHER_TYPE } from '../data/agreement'
import Reveal from './Reveal'
import { buildRecord, cleanText, getMissingFields, saveAgreement } from '../lib/agreement'

const EMPTY = { name: '', phone: '', business: '', type: '', otherType: '' }

export default function SignForm({ onSigned }) {
  const [form, setForm] = useState(EMPTY)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const missing = getMissingFields(form)
  const isComplete = missing.length === 0
  const displayName = cleanText(form.name).length >= 3 ? cleanText(form.name) : '(اكتب بياناتك الأول)'

  const update = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setError('')
  }

  // لو البيانات بقت ناقصة بعد ما وافق، الموافقة بتتلغي
  const canAgree = isComplete
  const checked = agreed && canAgree

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isComplete) return setError(`ناقص: ${missing.join('، ')}.`)
    if (!checked) return setError('علّم على خانة الموافقة الأول.')

    setSubmitting(true)
    const record = buildRecord(form)
    const result = await saveAgreement(record)
    setSubmitting(false)

    if (!result.ok) {
      return setError('الإمضاء متسجلش بسبب مشكلة في الاتصال. اتأكد من النت وجرّب تاني.')
    }
    onSigned(record)
  }

  return (
    <Reveal className="mt-14">
    <div className="anim-up rounded-2xl border border-line bg-panel p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold">تأكيد الموافقة</h2>
      <p className="mt-2 mb-6 text-mute">اكتب بياناتك علشان تقدر تأكد الموافقة.</p>

      <form onSubmit={handleSubmit} noValidate className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="fullName" label="الاسم بالكامل">
            <input id="fullName" className="field" autoComplete="name" placeholder="مثال: أحمد محمد علي"
              value={form.name} onChange={update('name')} />
          </Field>

          <Field id="phone" label="رقم الموبايل">
            <input id="phone" className="field text-right tabular-nums" type="tel" inputMode="tel" dir="ltr"
              autoComplete="tel" placeholder="01xxxxxxxxx" value={form.phone} onChange={update('phone')} />
          </Field>

          <Field id="business" label="اسم النشاط التجاري">
            <input id="business" className="field" autoComplete="organization" placeholder="مثال: سنتر النور / عيادة د. أحمد"
              value={form.business} onChange={update('business')} />
          </Field>

          <Field id="type" label="نوع النشاط">
            <select id="type" className="field" value={form.type} onChange={update('type')}>
              <option value="" disabled>اختار نوع النشاط</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </Field>

          {form.type === OTHER_TYPE && (
            <Field id="otherType" label="اكتب نوع النشاط" className="sm:col-span-2">
              <input id="otherType" className="field" autoFocus placeholder="مثال: جيم، صيدلية، مطعم..."
                value={form.otherType} onChange={update('otherType')} />
            </Field>
          )}
        </div>

        <label htmlFor="agree" className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-ink p-4">
          <input id="agree" type="checkbox" className="checkbox mt-1" disabled={!canAgree}
            checked={checked} onChange={(e) => { setAgreed(e.target.checked); setError('') }} />
          <span className="text-[15px]">
            أنا <b className="font-semibold text-lime">{displayName}</b> قرأت بنود اتفاقية الاشتراك الشهري بقيمة{' '}
            <b className="tabular-nums">{CONFIG.price}</b> جنيه، وفهمت إن إضافة أي فيتشرز جديدة ليها تسعير منفصل، و
            <b>أوافق</b> على كل البنود.
          </span>
        </label>

        {error && <p role="alert" className="text-sm text-danger">{error}</p>}

        <button type="submit" className="btn-primary" disabled={!checked || submitting}>
          {submitting ? 'بيتسجل الإمضاء...' : 'أوافق وأمضي الاتفاق'}
        </button>
      </form>
    </div>
    </Reveal>
  )
}

function Field({ id, label, className = '', children }) {
  return (
    <div className={`grid min-w-0 gap-2 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium">
        {label} <span className="text-lime">*</span>
      </label>
      {children}
    </div>
  )
}
