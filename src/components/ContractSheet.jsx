import { forwardRef } from 'react'
import { CLAUSES, CONFIG, EXCLUDED, EXCLUDED_NOTE, INCLUDED, consentText } from '../data/agreement'

/** نسخة العقد اللي بتتحول PDF: صفحتين A4 مترسومين برّه الشاشة */
const ContractSheet = forwardRef(function ContractSheet({ record }, ref) {
  return (
    <div ref={ref} className="pdf-stage" aria-hidden="true" dir="rtl" lang="ar">
      <div className="sheet-page" data-pdf-page>
        <div className="sheet-top">
          <div>
            <div className="sheet-logo">tap<span>ko</span></div>
            <h1 className="sheet-title">اتفاقية الاشتراك الشهري للسيستم</h1>
          </div>
          <div className="sheet-meta">
            REF: {record.ref}<br />
            TERMS: {CONFIG.termsVersion}<br />
            tapko.link
          </div>
        </div>

        <div>
          <h2>أطراف الاتفاق</h2>
          <table className="sheet-table">
            <tbody>
              <tr><td>الطرف الأول</td><td>tapko (مقدم الخدمة)</td></tr>
              <tr><td>الطرف الثاني</td><td>{record.name}</td></tr>
              <tr><td>النشاط التجاري</td><td>{record.business} ({record.type})</td></tr>
              <tr><td>رقم الموبايل</td><td dir="ltr" style={{ textAlign: 'right' }}>{record.phone}</td></tr>
              <tr><td>قيمة الاشتراك</td><td><span className="sheet-price">{CONFIG.price} جنيه مصري شهريًا</span></td></tr>
            </tbody>
          </table>
        </div>

        <div>
          <h2>الاشتراك بيشمل</h2>
          <ul className="sheet-list">
            {INCLUDED.map((i) => <li key={i.title}><b>{i.title}:</b> {i.text}</li>)}
          </ul>
        </div>

        <div>
          <h2>مش شامل في الاشتراك</h2>
          <ul className="sheet-list">
            {EXCLUDED.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <p style={{ margin: '6px 0 0' }}>{EXCLUDED_NOTE}</p>
        </div>

        <PageFoot record={record} page={1} />
      </div>

      <div className="sheet-page" data-pdf-page>
        <div>
          <h2>بنود الاتفاق</h2>
          <ol className="sheet-list">
            {CLAUSES.map((c) => <li key={c.title}><b>{c.title}:</b> {c.text}</li>)}
          </ol>
        </div>

        <div className="sheet-sign">
          <h2>الإمضاء الإلكتروني</h2>
          <p style={{ margin: 0 }}>{consentText(record.name)}</p>
          <table className="sheet-table" style={{ marginTop: 12 }}>
            <tbody>
              <tr><td>الاسم</td><td>{record.name}</td></tr>
              <tr><td>تاريخ الإمضاء</td><td>{record.signedAtText}</td></tr>
              <tr><td>رقم المرجع</td><td dir="ltr" style={{ textAlign: 'right' }}>{record.ref}</td></tr>
            </tbody>
          </table>
        </div>

        <PageFoot record={record} page={2} />
      </div>
    </div>
  )
})

function PageFoot({ record, page }) {
  return (
    <div className="sheet-foot">
      <span>tapko by NOURVERSE · صفحة {page} من 2</span>
      <span dir="ltr">{record.ref}</span>
    </div>
  )
}

export default ContractSheet
