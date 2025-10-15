import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import type { GymInformationFormData } from '@/features/gym-registration/types/gym-registration.types';
import { createGymWithUser, type CreateGymResponse } from '@/shared/services/gym-registration.service';


export function useCreateGym(options?: {
  onSuccess?: (data: CreateGymResponse) => void;
  onError?: (error: Error) => void;
}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: GymInformationFormData) => {
      const response = await createGymWithUser(formData);
      if (!response.success) {
        throw new Error(response.error || 'Error al crear gimnasio');
      }
      return response;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.gyms.lists() });
      if (data.data) {
        queryClient.setQueryData(
          queryKeys.gyms.detail(data.data.gymId),
          data.data
        );
      }
      options?.onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error('Error creando el gimnasio:', error);
      options?.onError?.(error);
    },
    retry: 1,
  });
}
