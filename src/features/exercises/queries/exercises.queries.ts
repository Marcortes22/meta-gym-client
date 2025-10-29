import { supabase } from '@/lib/supabase/client';

export async function listExercises() {
  const { data, error } = await supabase
    .from('exercises')
    .select(`id, name, main_muscle, category_id, created_at`)
    .order('name', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getRoutinesWithExercises() {
  const { data, error } = await supabase
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

export async function createExercise({ name, main_muscle, category_id }: { name: string; main_muscle?: string; category_id?: string }) {
  const { data, error } = await supabase
    .from('exercises')
    .insert([{ name, main_muscle, category_id }])
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
