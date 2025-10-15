import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/lib/query-keys';
import { loginUser, logoutUser, getCurrentUser } from '../services/auth.service';
import type { LoginCredentials } from '../types/auth.types';

export type { LoginCredentials };

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login exitoso :', data.user?.email);
      queryClient.setQueryData(queryKeys.auth.user(), data.user);
      queryClient.setQueryData(queryKeys.auth.session(), data.session);
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      console.error('Error al loguearse:', error.message);
    },
    
    retry: 0, 
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    
    onSuccess: () => {
      console.log('Cerrar sesión exitoso');
      queryClient.clear();
      router.push('/');
    },
    
    onError: (error: Error) => {
      console.error('Error al cerrar sesión:', error.message);
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, 
    retry: 1,
  });
}

export function useIsAuthenticated() {
  const { data: user, isLoading } = useCurrentUser();
  
  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { forgotPassword } = await import('../services/auth.service');
      return forgotPassword(email);
    },
    
    onSuccess: () => {
      console.log('Correo de recuperación enviado exitosamente');
    },
    
    onError: (error: Error) => {
      console.error('Error al enviar correo de recuperación:', error.message);
    },
    
    retry: 0,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      const { resetPassword } = await import('../services/auth.service');
      return resetPassword(password);
    },
    onSuccess: () => {
      console.log('Contraseña restablecida exitosamente');
    },
    onError: (error: Error) => {
      console.error('Error al restablecer contraseña:', error.message);
    },
    retry: 0,
  });
}
