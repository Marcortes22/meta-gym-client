'use client';

import * as React from 'react';
import { useStepper } from '../hooks/use-gym-registration-stepper.hooks';
import { StepperNavigation } from './stepper-navigation.component';
import { GymInformationForm } from './gym-information-form.component';
import { MembershipInformationForm } from './membership-information-form.component';
import { createGymWithUser } from '@/shared/services/gym-registration.service';
import type { 
  GymRegistrationData,
  GymInformation,
  MembershipInformation,
  StepId,
  GymInformationFormData
} from '../types/gym-registration.types';

interface GymRegistrationStepperProps {
  onComplete?: (data: GymRegistrationData) => void;
  className?: string;
}

function GymRegistrationStepper({ 
  onComplete,
  className 
}: GymRegistrationStepperProps) {
  const stepper = useStepper();
  
  // Estado para almacenar los datos de cada paso
  const [formData, setFormData] = React.useState<{
    gym: Partial<GymInformation>;
    membership: Partial<MembershipInformation>;
  }>({
    gym: {
      name: '',
      address: '',
      email: '',
      theme: 'blue' as const,
      logo_url: '',
      code: '',
      schedule: [],
    },
    membership: {
      acknowledged: false,
    }
  });

  // Estado para rastrear pasos completados
  const [completedSteps, setCompletedSteps] = React.useState<StepId[]>([]);

  // Handlers para cada paso
  const handleGymSubmit = React.useCallback((data: GymInformation) => {
    setFormData(prev => ({ ...prev, gym: data }));
    if (!completedSteps.includes('gym-info')) {
      setCompletedSteps(prev => [...prev, 'gym-info']);
    }
  }, [completedSteps]);

  const handleMembershipSubmit = React.useCallback(async (data: MembershipInformation) => {
    setFormData(prev => ({ ...prev, membership: data }));
    if (!completedSteps.includes('membership-info')) {
      setCompletedSteps(prev => [...prev, 'membership-info']);
    }

    // Preparar datos finales
    const finalData: GymRegistrationData = {
      gym: formData.gym as GymInformation,
      membership: data,
    };

    try {
      // Crear gimnasio y usuario administrador en Supabase con transacción
      const gymFormData: GymInformationFormData = {
        gym_name: finalData.gym.name,
        email: finalData.gym.email,
        address: finalData.gym.address,
        theme_color: finalData.gym.theme,
        gym_code: finalData.gym.code,
        logo_url: finalData.gym.logo_url,
        schedule: finalData.gym.schedule,
      };

      const response = await createGymWithUser(gymFormData);

      if (response.success) {
        console.log('✅ Gym and user created successfully:', response.data);
        // Llamar al callback de finalización con los datos completos
        onComplete?.(finalData);
      } else {
        console.error('❌ Failed to create gym and user:', response.error);
        alert(`Error al crear el gimnasio: ${response.error}`);
      }
    } catch (error) {
      console.error('❌ Unexpected error:', error);
      alert('Error inesperado al crear el gimnasio');
    }
  }, [formData, completedSteps, onComplete]);

  // Navegación
  const handleNext = React.useCallback(() => {
    stepper.next();
  }, [stepper]);

  const handlePrevious = React.useCallback(() => {
    stepper.prev();
  }, [stepper]);

  const isFirstStep = stepper.current?.id === 'gym-info';
  const isLastStep = stepper.current?.id === 'membership-info';

  return (
    <div className={className}>
      {/* Navegación del stepper */}
      <StepperNavigation
        currentStep={stepper.current?.id as StepId}
        completedSteps={completedSteps}
        className="mb-8"
      />

      {/* Contenido de cada paso usando el método switch de stepperize */}
      {stepper.switch({
        'gym-info': () => (
          <GymInformationForm
            initialData={formData.gym}
            onSubmit={handleGymSubmit}
            onNext={handleNext}
            isFirstStep={isFirstStep}
          />
        ),
        'membership-info': () => (
          <MembershipInformationForm
            initialData={formData.membership}
            onSubmit={handleMembershipSubmit}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLastStep={isLastStep}
          />
        ),
      })}

      {/* Información de progreso para desarrollo/debug */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-900 rounded border border-gray-700">
          <details>
            <summary className="text-sm text-gray-400 cursor-pointer">
              Debug Info (Solo en desarrollo)
            </summary>
            <div className="mt-2 text-xs text-gray-500">
              <p>Paso actual: {stepper.current?.id}</p>
              <p>Pasos completados: {completedSteps.join(', ')}</p>
              <p>¿Es primer paso?: {isFirstStep.toString()}</p>
              <p>¿Es último paso?: {isLastStep.toString()}</p>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

export { GymRegistrationStepper };