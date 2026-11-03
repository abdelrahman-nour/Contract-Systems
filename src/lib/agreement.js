import { CONFIG, OTHER_TYPE } from '../data/agreement'
import { supabase } from './supabase'

export const cleanText = (v) => v.replace(/\s+/g, ' ').trim()
export const cleanPhone = (v) => v.replace(/[\s-]/g, '')

export const resolveType = (form) =>
  form.type === OTHER_TYPE ? cleanText(form.otherType) : form.type

/** يرجّع قايمة باللي ناقص في الفورم (فاضية = الفورم سليم) */
export function getMissingFields(form) {
  const missing = []
  if (cleanText(form.name).length < 3) missing.push('الاسم بالكامل')
  if (!/^01[0125]\d{8}$/.test(cleanPhone(form.phone))) missing.push('رقم موبايل صحيح (11 رقم يبدأ بـ 01)')
  if (cleanText(form.business).length < 2) missing.push('اسم النشاط التجاري')
  if (!form.type) missing.push('نوع النشاط')
  else if (form.type === OTHER_TYPE && resolveType(form).length < 2) missing.push('نوع النشاط التجاري')
  return missing
}

const pad = (n) => String(n).padStart(2, '0')

export function makeRef(date = new Date()) {
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `TPK-${String(date.getFullYear()).slice(2)}${pad(date.getMonth() + 1)}${pad(date.getDate())}-${rnd}`
}

export function formatDate(date) {
  try {
    return date.toLocaleString('ar-EG', { timeZone: 'Africa/Cairo', dateStyle: 'long', timeStyle: 'short' })
  } catch {
    return date.toLocaleString()
  }
}

export function buildRecord(form) {
  const now = new Date()
  return {
    ref: makeRef(now),
    name: cleanText(form.name),
    phone: cleanPhone(form.phone),
    business: cleanText(form.business),
    type: resolveType(form),
    signedAt: now.toISOString(),
    signedAtText: formatDate(now),
  }
}

/** بيسجّل الإمضاء في Supabase. لو الداتابيز مش متظبطة بيرجّع ok من غير تسجيل. */
export async function saveAgreement(record) {
  if (!supabase) return { ok: true, saved: false }

  for (let attempt = 0; attempt < 3; attempt++) {
    const { error } = await supabase.from('agreements').insert({
      ref: record.ref,
      full_name: record.name,
      phone: record.phone,
      business_name: record.business,
      business_type: record.type,
      price: CONFIG.price,
      terms_version: CONFIG.termsVersion,
      signed_at: record.signedAt,
      user_agent: navigator.userAgent.slice(0, 300),
    })
    if (!error) return { ok: true, saved: true }
    if (error.code === '23505') { record.ref = makeRef(); continue } // رقم مرجع مكرر
    return { ok: false, error }
  }
  return { ok: false, error: new Error('duplicate ref') }
}

export function whatsappLink(record) {
  const msg = [
    'تم إمضاء اتفاقية الاشتراك الشهري - tapko',
    '',
    `رقم المرجع: ${record.ref}`,
    `الاسم: ${record.name}`,
    `النشاط التجاري: ${record.business}`,
    `نوع النشاط: ${record.type}`,
    `الموبايل: ${record.phone}`,
    `الاشتراك: ${CONFIG.price} جنيه شهريًا`,
    `تاريخ الإمضاء: ${record.signedAtText}`,
    `نسخة البنود: ${CONFIG.termsVersion}`,
  ].join('\n')
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`
}
