'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { createRoutine, listRoutines, getRoutineById } from '../queries/routines.queries';
import { listExercises, createExercise, addExerciseToRoutine } from '@/features/exercises/queries/exercises.queries';
import { useCurrentGym } from '@/lib/current-gym';
import type { NewRoutineInput } from '../types/routine.types';

export function useListRoutines() {
  const { gymId } = useCurrentGym();
  return useQuery({
    queryKey: [...queryKeys.routines.lists(), gymId ?? 'no-gym'],
    queryFn: () => listRoutines(gymId ?? undefined),
    staleTime: 1000 * 60 * 5,
    enabled: !!gymId,
  });
}

export function useGetRoutine(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.routines.detail(id) : ['routines', 'detail', 'idle'],
    queryFn: () => (id ? getRoutineById(id) : Promise.resolve(null)),
    enabled: !!id,
  });
}

export function useCreateRoutine() {
  const qc = useQueryClient();
  const { gymId } = useCurrentGym();
  return useMutation({
    mutationFn: (payload: NewRoutineInput) => {
      if (!gymId) throw new Error('No current gym selected');
      return createRoutine({ ...payload, gym_id: gymId });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [...queryKeys.routines.lists(), gymId ?? 'no-gym'] });
    },
  });
}

export function useListExercises() {
  const { gymId } = useCurrentGym();
  return useQuery({
    queryKey: [...queryKeys.exercises.lists(), gymId ?? 'no-gym'],
    queryFn: () => listExercises(gymId ?? undefined),
    staleTime: 1000 * 60 * 5,
    enabled: !!gymId,
  });
}

export function useCreateExercise() {
  const qc = useQueryClient();
  const { gymId: _gymId } = useCurrentGym();
  return useMutation({
    mutationFn: (payload: { name: string; main_muscle?: string; category_id?: string }) => {
      if (!_gymId) throw new Error('No current gym selected');
      return createExercise({ ...payload, gym_id: _gymId });
    },
  onSuccess: () => qc.invalidateQueries({ queryKey: [...queryKeys.exercises.lists(), _gymId ?? 'no-gym'] }),
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
  const { gymId } = useCurrentGym();
  return useMutation({
    mutationFn: ({ routineId, exerciseId, sets, reps, position }: AddExerciseToRoutineInput) =>
      addExerciseToRoutine(routineId, exerciseId, sets, reps, position),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [...queryKeys.routines.lists(), gymId ?? 'no-gym'] });
    },
  });
}
