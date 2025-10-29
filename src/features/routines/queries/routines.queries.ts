import { supabase } from '@/lib/supabase/client';
import type { NewRoutineInput } from '../types/routine.types';

export async function listRoutines() {
  const { data, error } = await supabase.from('routines').select('*').order('created_at', { ascending: false });
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

export async function createRoutine(payload: NewRoutineInput) {
  const { data, error } = await supabase
    .from('routines')
    .insert([payload])
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
