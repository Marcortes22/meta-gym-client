'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { stepperConfig } from '../hooks/use-gym-registration-stepper.hooks';
import type { StepId } from '../types/gym-registration.types';

interface StepperNavigationProps {
  currentStep: StepId;
  completedSteps: StepId[];
  className?: string;
}

function StepperNavigation({
  currentStep,
  completedSteps,
  className,
}: StepperNavigationProps) {
  return (
    <nav className={cn('mb-8', className)} aria-label="Progreso del registro">
      <div className="flex items-center justify-center">
        {stepperConfig.steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const isConnected = index < stepperConfig.steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                    {
                      // Estado activo
                      'border-orange-500 bg-orange-500 text-white': isActive,
                      // Estado completado
                      'border-green-500 bg-green-500 text-white': isCompleted,
                      // Estado pendiente
                      'border-gray-300 bg-white text-gray-500':
                        !isActive && !isCompleted,
                    }
                  )}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      'text-sm font-medium',
                      isActive
                        ? 'text-orange-500'
                        : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-500'
                    )}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>

              {/* Línea conectora */}
              {isConnected && (
                <div
                  className={cn(
                    'mx-4 h-0.5 w-16 transition-colors sm:w-24',
                    isCompleted
                      ? 'bg-green-500'
                      : currentStep === step.id
                      ? 'bg-orange-500'
                      : 'bg-gray-300'
                  )}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}

export { StepperNavigation };