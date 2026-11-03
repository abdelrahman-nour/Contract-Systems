create table if not exists public.agreements (
  id            bigint generated always as identity primary key,
  ref           text not null unique,
  full_name     text not null,
  phone         text not null,
  business_name text not null,
  business_type text not null,
  price         integer not null,
  terms_version text not null,
  signed_at     timestamptz not null,
  user_agent    text,
  created_at    timestamptz not null default now()
);

alter table public.agreements enable row level security;

create policy "anyone can sign"
  on public.agreements
  for insert
  to anon
  with check (true);

