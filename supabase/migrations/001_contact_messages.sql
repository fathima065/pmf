create extension if not exists pgcrypto;
create table if not exists public.contact_messages(id uuid primary key default gen_random_uuid(),name text not null,email text not null,company text not null default '',budget text not null default '',project_brief text not null,email_status text not null default 'pending',whatsapp_status text not null default 'not_sent',is_read boolean not null default false,created_at timestamptz not null default now());
alter table public.contact_messages enable row level security;
drop policy if exists "anyone can send a message" on public.contact_messages;
create policy "anyone can send a message" on public.contact_messages for insert to anon,authenticated with check(true);
