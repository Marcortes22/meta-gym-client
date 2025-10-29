export interface CategoryExercise {
  id: string;
  name: string;
  created_at?: string;
}

export interface Exercise {
  id: string;
  name: string;
  main_muscle?: string | null;
  category_id?: string | null;
  created_at?: string;
}

export interface RoutineExercise {
  routine_id: string;
  exercise_id: string;
  sets?: number;
  reps?: string;
  position?: number;
  // Joined data for convenience
  exercise?: Exercise;
}

export type RoutineLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Routine {
  id: string;
  name: string;
  description?: string | null;
  level: RoutineLevel;
  created_at?: string;
  routine_exercises?: RoutineExercise[];
}

export interface NewRoutineInput {
  name: string;
  description?: string;
  level?: RoutineLevel;
}
