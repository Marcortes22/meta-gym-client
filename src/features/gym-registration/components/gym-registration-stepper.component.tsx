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
        <div className="rounded-2xl border-2 border-red-300 bg-red-50 p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-red-900">
              Error al crear gimnasio
            </h3>
          </div>
          <p className="text-base text-red-700 mb-6 leading-relaxed">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto rounded-lg bg-red-600 px-6 py-3 text-base font-semibold text-white hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-8">
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
    </div>
  );
}

export { GymRegistrationStepper };