import { supabase } from '@/lib/supabase/client';
import type { NewRoutineInput } from '../types/routine.types';

export async function listRoutines(gym_id?: string | number) {
  let q = supabase.from('routines').select('*, routine_exercises ( *, exercises (id, name, main_muscle) )').order('created_at', { ascending: false });
  if (gym_id) q = q.eq('gym_id', gym_id);
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getRoutineById(id: string) {
  const { data, error } = await supabase
    .from('routines')
    .select(`*, routine_exercises ( *, exercises (id, name, main_muscle) )`)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createRoutine(payload: NewRoutineInput & { gym_id: string | number }) {
  const { gym_id, ...rest } = payload as unknown as { gym_id: string | number } & NewRoutineInput;
  const toInsert = { ...rest, gym_id };
  const { data, error } = await supabase
    .from('routines')
    .insert([toInsert])
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
