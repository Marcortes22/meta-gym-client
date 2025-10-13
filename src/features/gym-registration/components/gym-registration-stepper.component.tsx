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

  const [completedSteps, setCompletedSteps] = React.useState<StepId[]>([]);
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

    const finalData: GymRegistrationData = {
      gym: formData.gym as GymInformation,
      membership: data,
    };

    try {
      const gymFormData: GymInformationFormData = {
        gym_name: finalData.gym.name,
        email: finalData.gym.email,
        address: finalData.gym.address,
        theme_color: finalData.gym.theme,
        gym_code: finalData.gym.code,
        logo_url: finalData.gym.logo_url,
        schedule: finalData.gym.schedule || [],
      };

      const response = await createGymWithUser(gymFormData);

      if (response.success) {
        console.log('El gimnasio y el usuario se crearon con éxito:', response.data);
        onComplete?.(finalData);
      } else {
        console.error('Error al crear el gimnasio y el usuario:', response.error);
        alert(`Error al crear el gimnasio: ${response.error}`);
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      alert('Error inesperado al crear el gimnasio');
    }
  }, [formData, completedSteps, onComplete]);

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
      <StepperNavigation
        currentStep={stepper.current?.id as StepId}
        completedSteps={completedSteps}
        className="mb-8"
      />

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
    </div>
  );
}

export { GymRegistrationStepper };