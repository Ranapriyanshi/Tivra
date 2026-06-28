-- Run this in your Supabase SQL editor to add the email column to the clients table
ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS email TEXT NOT NULL DEFAULT '';
