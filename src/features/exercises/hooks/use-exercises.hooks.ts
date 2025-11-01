"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { useCurrentGym } from '@/lib/current-gym';
import {
  listExercises,
  createExercise,
  getExerciseById,
  updateExercise,
  deleteExercise,
} from '../queries/exercises.queries';

export function useListExercises() {
  const { gymId } = useCurrentGym();
  return useQuery({
    queryKey: [...queryKeys.exercises.lists(), gymId ?? 'no-gym'],
    queryFn: () => listExercises(gymId ?? undefined),
    enabled: !!gymId,
    staleTime: 1000 * 60 * 5,
  });
}

export function useGetExercise(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.exercises.detail(id) : ['exercises', 'detail', 'idle'],
    queryFn: () => (id ? getExerciseById(id) : Promise.resolve(null)),
    enabled: !!id,
  });
}

export function useCreateExercise() {
  const qc = useQueryClient();
  const { gymId } = useCurrentGym();
  return useMutation({
    mutationFn: (payload: { name: string; main_muscle?: string; category_id?: string }) => {
      if (!gymId) throw new Error('No current gym selected');
      return createExercise({ ...payload, gym_id: gymId });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: [...queryKeys.exercises.lists(), gymId ?? 'no-gym'] }),
  });
}

export function useUpdateExercise() {
  const qc = useQueryClient();
  const { gymId } = useCurrentGym();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { name?: string; main_muscle?: string; category_id?: string } }) =>
      updateExercise(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...queryKeys.exercises.lists(), gymId ?? 'no-gym'] }),
  });
}

export function useDeleteExercise() {
  const qc = useQueryClient();
  const { gymId } = useCurrentGym();
  return useMutation({
    mutationFn: (id: string) => deleteExercise(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [...queryKeys.exercises.lists(), gymId ?? 'no-gym'] }),
  });
}
