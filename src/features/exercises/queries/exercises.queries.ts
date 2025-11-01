import { supabase } from '@/lib/supabase/client';

export async function listExercises(gym_id?: string | number) {
  let q = supabase
    .from('exercises')
    .select(`id, name, main_muscle, category_id, created_at`)
    .order('name', { ascending: true });
  if (gym_id) q = q.eq('gym_id', gym_id);

  const { data, error } = await q;

  if (error) throw error;
  return data;
}

export async function getRoutinesWithExercises(gym_id?: string | number) {
  let q = supabase
    .from('routines')
    .select(`
      id,
      name,
      description,
      level,
      created_at,
      routine_exercises (
        exercise_id, sets, reps, position,
        exercises!inner (id, name, main_muscle)
      )
    `)
    .order('name', { ascending: true });

  if (gym_id) q = q.eq('gym_id', gym_id);

  const { data, error } = await q;

  if (error) throw error;
  return data;
}

export async function addExerciseToRoutine(routineId: string, exerciseId: string, sets = 3, reps = '8-12', position = 0) {
  const { data, error } = await supabase
    .from('routine_exercises')
    .insert([{ routine_id: routineId, exercise_id: exerciseId, sets, reps, position }]);

  if (error) throw error;
  return data;
}

export async function createExercise({ name, main_muscle, category_id, gym_id }: { name: string; main_muscle?: string; category_id?: string; gym_id: string | number }) {
  const payload = { name, main_muscle, category_id, gym_id } as const;
  const { data, error } = await supabase
    .from('exercises')
    .insert([payload])
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function getExerciseById(id: string) {
  const { data, error } = await supabase
    .from('exercises')
    .select('id, name, main_muscle, category_id, created_at, gym_id')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateExercise(id: string, payload: { name?: string; main_muscle?: string; category_id?: string }) {
  const { data, error } = await supabase
    .from('exercises')
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExercise(id: string) {
  const { data, error } = await supabase
    .from('exercises')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
}
