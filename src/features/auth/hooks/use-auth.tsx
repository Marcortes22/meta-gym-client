'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase/client';
import { AuthState, LoginCredentials, AuthUser } from '../types/auth.types';
import { loginUser, logoutUser } from '../services/auth.service';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to convert Supabase User to AuthUser
function mapSupabaseUserToAuthUser(user: User | null): AuthUser | null {
  if (!user || !user.email) return null;
  
  return {
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role,
    gym_name: user.user_metadata?.gym_name,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(mapSupabaseUserToAuthUser(session?.user ?? null));
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(mapSupabaseUserToAuthUser(session?.user ?? null));
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await loginUser(credentials);
      setUser(mapSupabaseUserToAuthUser(data.user));
      
      // Redirect to dashboard or home
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
      
      // Redirect to login
      window.location.href = '/';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cerrar sesión');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}