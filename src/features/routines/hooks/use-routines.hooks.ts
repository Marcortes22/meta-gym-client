'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { createRoutine, listRoutines, getRoutineById } from '../queries/routines.queries';
import { listExercises, createExercise, addExerciseToRoutine } from '@/features/exercises/queries/exercises.queries';
import type { NewRoutineInput } from '../types/routine.types';

export function useListRoutines() {
  return useQuery({
    queryKey: queryKeys.routines.lists(),
    queryFn: listRoutines,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetRoutine(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.routines.detail(id) : undefined,
    queryFn: () => (id ? getRoutineById(id) : Promise.resolve(null)),
    enabled: !!id,
  });
}

export function useCreateRoutine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: NewRoutineInput) => createRoutine(payload),
    onSuccess: () => {
      qc.invalidateQueries(queryKeys.routines.lists());
    },
  });
}

export function useListExercises() {
  return useQuery({
    queryKey: queryKeys.exercises.lists(),
    queryFn: listExercises,
    staleTime: 1000 * 60 * 5,
  });
}

export function useCreateExercise() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; main_muscle?: string; category_id?: string }) => createExercise(payload),
    onSuccess: () => qc.invalidateQueries(queryKeys.exercises.lists()),
  });
}

export interface AddExerciseToRoutineInput {
  routineId: string;
  exerciseId: string;
  sets?: number;
  reps?: string;
  position?: number;
}

export function useAddExerciseToRoutine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ routineId, exerciseId, sets, reps, position }: AddExerciseToRoutineInput) =>
      addExerciseToRoutine(routineId, exerciseId, sets, reps, position),
    onSuccess: () => {
      qc.invalidateQueries(queryKeys.routines.lists());
    },
  });
}
