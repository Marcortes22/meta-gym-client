import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { queryKeys } from '@/lib/query-keys';
import { loginUser, logoutUser, getCurrentUser } from '../services/auth.service';
import type { LoginCredentials } from '../types/auth.types';

export type { LoginCredentials };

/**
 * Custom hook for user login with TanStack Query
 * Handles authentication state and redirects after successful login
 * 
 * @example
 * ```tsx
 * const { mutate: login, isPending } = useLogin();
 * 
 * const handleLogin = (credentials) => {
 *   login(credentials);
 * };
 * ```
 */
export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    
    onSuccess: (data) => {
      console.log('✅ Login successful:', data.user?.email);
      
      // Update user cache
      queryClient.setQueryData(queryKeys.auth.user(), data.user);
      queryClient.setQueryData(queryKeys.auth.session(), data.session);
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
    
    onError: (error: Error) => {
      console.error('❌ Login error:', error.message);
    },
    
    retry: 0, // Don't retry login attempts
  });
}

/**
 * Custom hook for user logout with TanStack Query
 * Clears all cached data and redirects to login
 * 
 * @example
 * ```tsx
 * const { mutate: logout } = useLogout();
 * 
 * const handleLogout = () => logout();
 * ```
 */
export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    
    onSuccess: () => {
      console.log('✅ Logout successful');
      
      // Clear all cached data
      queryClient.clear();
      
      // Redirect to login
      router.push('/');
    },
    
    onError: (error: Error) => {
      console.error('❌ Logout error:', error.message);
    },
  });
}

/**
 * Custom hook to get current authenticated user
 * Uses TanStack Query for caching and automatic refetching
 * 
 * @example
 * ```tsx
 * const { data: user, isLoading } = useCurrentUser();
 * 
 * if (isLoading) return <Skeleton />;
 * if (!user) return <Login />;
 * 
 * return <Dashboard user={user} />;
 * ```
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: queryKeys.auth.user(),
    queryFn: getCurrentUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

/**
 * Hook to check if user is authenticated
 * Returns boolean state for easier conditional rendering
 * 
 * @example
 * ```tsx
 * const { isAuthenticated, isLoading } = useIsAuthenticated();
 * 
 * if (isLoading) return <Spinner />;
 * return isAuthenticated ? <Dashboard /> : <Login />;
 * ```
 */
export function useIsAuthenticated() {
  const { data: user, isLoading } = useCurrentUser();
  
  return {
    isAuthenticated: !!user,
    isLoading,
    user,
  };
}
