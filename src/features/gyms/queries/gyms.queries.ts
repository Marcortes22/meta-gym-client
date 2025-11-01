import { supabase } from '@/lib/supabase/client';

export async function listGyms() {
  const { data, error } = await supabase.from('gyms').select('id,name').order('name', { ascending: true });
  if (error) throw error;
  return data;
}

export async function getGymById(id: string | number) {
  // Select only columns that exist in the `gyms` table to avoid Postgres errors
  // (some instances may not have `created_at`). Fetch by id for accuracy.
  const { data, error } = await supabase
    .from('gyms')
    .select('id, name, address, email, logo_url, tenant_id, schedule')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateGym(id: string | number, payload: { name?: string; address?: string; email?: string; logo_url?: string; schedule?: unknown }) {
  const { data, error } = await supabase
    .from('gyms')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
