import type { GymInformationFormData } from '@/features/gym-registration/types/gym-registration.types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const EDGE_FUNCTION_URL = `${SUPABASE_URL}/functions/v1/create-gym-complete`;
export interface CreateGymResponse {
  success: boolean;
  data?: {
    gymId: number;
    userId: string;
    gymName: string;
    slug: string;
  };
  error?: string;
}

export async function createGymWithUser(
  formData: GymInformationFormData
): Promise<CreateGymResponse> {
  try {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error('Supabase configuration missing');
    }
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({
        gym_name: formData.gym_name,
        email: formData.email,
        address: formData.address,
        theme_color: formData.theme_color,
        gym_code: formData.gym_code,
        logo_url: formData.logo_url,
        schedule: formData.schedule,
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Error al crear gimnasio';
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
        console.error('Error en la llamada a la edge function:', errorData);
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    const result: CreateGymResponse = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Error desconocido');
    }
        
    return {
      success: true,
      data: result.data,
    };

  } catch (error) {
    console.error('Error en la llamada a la edge function:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error inesperado',
    };
  }
}
export async function createGym(
  formData: GymInformationFormData
): Promise<CreateGymResponse> {
  return createGymWithUser(formData);
}
