'use client';

import * as React from 'react';
import { useStepper } from '../hooks/use-gym-registration-stepper.hooks';
import { useGymRegistrationForm } from '../hooks/use-gym-registration-form.hooks';
import { StepperNavigation } from './stepper-navigation.component';
import { GymInformationForm } from './gym-information-form.component';
import { MembershipInformationForm } from './membership-information-form.component';
import type { GymRegistrationData, StepId } from '../types/gym-registration.types';

interface GymRegistrationStepperProps {
  onComplete?: (data: GymRegistrationData) => void;
  className?: string;
}

function GymRegistrationStepper({ onComplete, className }: GymRegistrationStepperProps) {
  const stepper = useStepper();
  const {
    formData,
    completedSteps,
    isPending,
    error,
    handleGymSubmit,
    handleMembershipSubmit,
  } = useGymRegistrationForm({ onComplete });

  const handleNext = React.useCallback(() => {
    stepper.next();
  }, [stepper]);

  const handlePrevious = React.useCallback(() => {
    stepper.prev();
  }, [stepper]);

  const isFirstStep = stepper.current?.id === 'gym-info';
  const isLastStep = stepper.current?.id === 'membership-info';

  if (error) {
    return (
      <div className={className}>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <h3 className="mb-2 text-lg font-semibold text-red-900">
            Error al crear gimnasio
          </h3>
          <p className="text-sm text-red-700 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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
            disabled={isPending}
          />
        ),
        'membership-info': () => (
          <MembershipInformationForm
            initialData={formData.membership}
            onSubmit={handleMembershipSubmit}
            onNext={handleNext}
            onPrevious={handlePrevious}
            isLastStep={isLastStep}
            isSubmitting={isPending}
          />
        ),
      })}
    </div>
  );
}

export { GymRegistrationStepper };