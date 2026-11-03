# tapko — صفحة اتفاقية الاشتراك الشهري

React + Vite + Tailwind CSS v4 + Supabase

## التشغيل

```bash
npm install
cp .env.example .env   # وحط بيانات Supabase
npm run dev
```

## الداتابيز
شغّل `supabase/agreements.sql` مرة واحدة من Supabase > SQL Editor.
من غير `.env` الصفحة بتشتغل عادي، بس الإمضاءات مش هتتسجل.

## تعديل السعر أو البنود
كله في `src/data/agreement.js`. لو غيّرت أي بند، زوّد `termsVersion` (v1 → v2).

## الرفع على Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY`
- اربطه بـ subdomain زي `agreement.tapko.link`

## هيكل الملفات
```
src/
  data/agreement.js        ← السعر والبنود والمشمول (عدّل هنا بس)
  lib/agreement.js         ← validation، رقم المرجع، الحفظ في Supabase، لينك واتساب
  lib/supabase.js          ← Supabase client
  lib/pdf.js               ← تحويل العقد لـ PDF (بيتحمّل بس لما العميل يدوس تحميل)
  components/
    Header, Footer, PriceHero, Coverage, Clauses
    SignForm.jsx           ← الفورم + نوع النشاط + "نشاط تجاري آخر"
    SignedView.jsx         ← صفحة "تم إمضاء الاتفاق" + تحميل PDF
    ContractSheet.jsx      ← شكل العقد A4 (صفحتين)
```
