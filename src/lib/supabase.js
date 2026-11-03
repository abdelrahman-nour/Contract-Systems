import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

// لو مفيش .env الصفحة بتشتغل عادي، بس الإمضاءات مش هتتسجل في الداتابيز
export const supabase = url && key
  ? createClient(url, key, { auth: { persistSession: false } })
  : null
