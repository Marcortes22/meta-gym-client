'use client';

import * as React from 'react';
import { useStepper } from '../hooks/use-gym-registration-stepper.hooks';
import { StepperNavigation } from './stepper-navigation.component';
import { GymInformationForm } from './gym-information-form.component';
import { AdministratorInformationForm } from './administrator-information-form.component';
import { MembershipInformationForm } from './membership-information-form.component';
import type { 
  GymRegistrationData,
  GymInformation,
  AdministratorInformation,
  MembershipInformation,
  StepId
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
    administrator: Partial<AdministratorInformation>;
    membership: Partial<MembershipInformation>;
  }>({
    gym: {},
    administrator: {},
    membership: {
      hasBasicPlan: false,
      hasPremiumPlan: false,
      hasVipPlan: false,
      customPlans: [],
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

  const handleAdministratorSubmit = React.useCallback((data: AdministratorInformation) => {
    setFormData(prev => ({ ...prev, administrator: data }));
    if (!completedSteps.includes('admin-info')) {
      setCompletedSteps(prev => [...prev, 'admin-info']);
    }
  }, [completedSteps]);

  const handleMembershipSubmit = React.useCallback((data: MembershipInformation) => {
    const finalData: GymRegistrationData = {
      gym: formData.gym as GymInformation,
      administrator: formData.administrator as AdministratorInformation,
      membership: data,
    };
    
    setFormData(prev => ({ ...prev, membership: data }));
    if (!completedSteps.includes('membership-info')) {
      setCompletedSteps(prev => [...prev, 'membership-info']);
    }

    // Llamar al callback de finalización si se proporciona
    onComplete?.(finalData);
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
        'admin-info': () => (
          <AdministratorInformationForm
            initialData={formData.administrator}
            onSubmit={handleAdministratorSubmit}
            onNext={handleNext}
            onPrevious={handlePrevious}
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