import { supabase } from '@/lib/supabase/client';
import type { GymInformationFormData, DaySchedule } from '@/features/gym-registration/types/gym-registration.types';

// Hardcoded tenant ID for development
const TENANT_ID = 1;

// Generate random password
function generateRandomPassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

/**
 * Payload structure matching Supabase 'gyms' table schema
 */
export interface CreateGymPayload {
  tenant_id: number;
  name: string;
  email: string;
  address: string;
  theme: 'blue' | 'red' | 'orange' | 'yellow';
  slug: string;
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
 * Creates a new gym and sends welcome email (simplified approach)
 * @param formData - Gym information from the registration form
 * @returns Promise with the created gym data or error
 */
export async function createGymWithUser(
  formData: GymInformationFormData
): Promise<CreateGymResponse> {
  try {
    // Generate password for the admin user
    const adminPassword = generateRandomPassword(12);
    
    // Step 1: Create gym in database first
    const gymPayload: CreateGymPayload = {
      tenant_id: TENANT_ID,
      name: formData.gym_name,
      email: formData.email,
      address: formData.address,
      theme: formData.theme_color,
      slug: formData.gym_code,
      logo_url: formData.logo_url || null,
      schedule: formData.schedule,
    };

    const { data: gymData, error: gymError } = await supabase
      .from('gyms')
      .insert(gymPayload)
      .select('id, name, slug')
      .single();

    if (gymError || !gymData) {
      console.error('❌ Error creating gym:', gymError);
      return {
        success: false,
        error: `Error al crear gimnasio: ${gymError?.message || 'Gimnasio no creado'}`,
      };
    }

    console.log('✅ Gym created:', gymData.id);

    try {
      // Step 2: Create auth user and user record via API route
      const userResponse = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: adminPassword,
          gymName: formData.gym_name,
          gymId: gymData.id,
          tenantId: TENANT_ID,
        }),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        console.error('❌ Error creating user:', errorData);
        
        // Rollback: Delete gym
        await supabase.from('gyms').delete().eq('id', gymData.id);
        console.warn('⚠️ User creation failed, gym deleted.');
        
        return {
          success: false,
          error: `Error al crear usuario: ${errorData.error}`,
        };
      }

      const userData = await userResponse.json();
      console.log('✅ User created:', userData.user.id);

      // Step 4: Create a register_request for tracking
      try {
        const { data: requestData, error: requestError } = await supabase
          .from('register_request')
          .insert({
            name: formData.gym_name,
            email: formData.email,
            tenant_id: TENANT_ID,
            tenant_name: formData.gym_name,
            state: 'COMPLETED' // Set as completed since everything was created
          })
          .select('id')
          .single();

        if (requestError) {
          console.error('❌ Error creating register request:', requestError);
        } else {
          console.log('✅ Register request created:', requestData);
        }
      } catch (error) {
        console.warn('⚠️ Register request creation failed, but gym and user were created:', error);
      }

      // Step 5: Send welcome email with credentials
      try {
        const response = await fetch('/api/send-welcome-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,
            gymName: formData.gym_name,
            password: adminPassword, // Generated random password
            loginUrl: `${window.location.origin}/login`
          }),
        });

        if (response.ok) {
          console.log('✅ Welcome email sent successfully');
        } else {
          console.warn('⚠️ Email sending failed, but gym and user were created');
        }
      } catch (emailError) {
        console.warn('⚠️ Email sending failed, but gym and user were created:', emailError);
      }

      return {
        success: true,
        data: {
          id: gymData.id,
          name: gymData.name,
          slug: gymData.slug,
        },
      };

    } catch (error) {
      console.error('❌ Error in gym creation process:', error);
      console.warn('⚠️ Auth user created but process failed. Manual cleanup may be required.');
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Error inesperado en el proceso',
      };
    }

  } catch (error) {
    console.error('❌ Unexpected error in createGymWithUser:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error inesperado',
    };
  }
}

/**
 * Legacy function - kept for compatibility
 */
export async function createGym(
  formData: GymInformationFormData
): Promise<CreateGymResponse> {
  return createGymWithUser(formData);
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