'use client';

import { useQuery } from '@tanstack/react-query';
import { listGyms } from '../queries/gyms.queries';
import { queryKeys } from '@/lib/query-keys';

export function useListGyms() {
  return useQuery({
    queryKey: queryKeys.gyms?.lists ? queryKeys.gyms.lists() : ['gyms','list'],
    queryFn: listGyms,
    staleTime: 1000 * 60 * 5,
  });
}
