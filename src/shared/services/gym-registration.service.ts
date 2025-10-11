import { supabase } from '@/lib/supabase/client';
import type { GymInformationFormData, DaySchedule } from '@/features/gym-registration/types/gym-registration.types';

// Hardcoded tenant ID for development
const TENANT_ID = 1;

/**
 * Payload structure matching Supabase 'gyms' table schema
 */
export interface CreateGymPayload {
  tenant_id: number;
  name: string;
  email: string;
  address: string;
  theme: 'blue' | 'red' | 'orange' | 'yellow'; // Matches DB enum
  slug: string; // Database has 'slug' not 'gym_code'
  logo_url?: string | null;
  schedule: DaySchedule[];
}

export interface CreateGymResponse {
  success: boolean;
  data?: {
    id: number;
    name: string;
    slug: string;
  };
  error?: string;
}

/**
 * Creates a new gym in the database
 * @param formData - Gym information from the registration form
 * @returns Promise with the created gym data or error
 */
export async function createGym(
  formData: GymInformationFormData
): Promise<CreateGymResponse> {
  try {
    // Map form data to database schema
    const payload: CreateGymPayload = {
      tenant_id: TENANT_ID, // Hardcoded for development
      name: formData.gym_name,
      email: formData.email,
      address: formData.address,
      theme: formData.theme_color as 'blue' | 'red' | 'orange' | 'yellow',
      slug: formData.gym_code, // Form uses 'gym_code', DB uses 'slug'
      logo_url: formData.logo_url || null,
      schedule: formData.schedule,
    };

    const { data, error } = await supabase
      .from('gyms')
      .insert(payload)
      .select('id, name, slug')
      .single();

    if (error) {
      console.error('Error creating gym:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Unexpected error creating gym:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Validates if a gym slug is available
 * @param slug - The gym slug to validate
 * @returns Promise with boolean indicating if the slug is available
 */
export async function isGymSlugAvailable(slug: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from('gyms')
      .select('slug')
      .eq('slug', slug)
      .single();

    if (error && error.code === 'PGRST116') {
      // No rows returned, slug is available
      return true;
    }

    // If data exists, slug is not available
    return !data;
  } catch (error) {
    console.error('Error checking gym slug availability:', error);
    return false;
  }
}
