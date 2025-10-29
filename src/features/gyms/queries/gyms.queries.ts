import { supabase } from '@/lib/supabase/client';

export async function listGyms() {
  const { data, error } = await supabase.from('gyms').select('id,name').order('name', { ascending: true });
  if (error) throw error;
  return data;
}
