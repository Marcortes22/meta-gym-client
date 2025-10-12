import { supabase } from '@/lib/supabase/client';
import { LoginCredentials } from '../types/auth.types';

export async function loginUser(credentials: LoginCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    throw new Error(error.message);
  }

  return user;
}