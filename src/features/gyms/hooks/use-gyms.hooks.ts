"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { getGymById, updateGym, listGyms } from '../queries/gyms.queries';
import { useCurrentGym } from '@/lib/current-gym';

export function useGetGym() {
  const { gymId } = useCurrentGym();
  return useQuery({
    queryKey: gymId ? queryKeys.gyms.detail(gymId) : ['gyms', 'detail', 'idle'],
    queryFn: () => (gymId ? getGymById(gymId) : Promise.resolve(null)),
    enabled: !!gymId,
  });
}

export function useUpdateGym() {
  const qc = useQueryClient();
  const { gymId } = useCurrentGym();
  return useMutation({
    mutationFn: (payload: { name?: string; address?: string; email?: string; logo_url?: string; schedule?: unknown }) => {
      if (!gymId) throw new Error('No current gym selected');
      return updateGym(gymId, payload);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: gymId ? queryKeys.gyms.detail(gymId) : [] }),
  });
}

export function useListGyms() {
  return useQuery({
    queryKey: queryKeys.gyms.lists(),
    queryFn: listGyms,
    staleTime: 1000 * 60 * 5,
  });
}
