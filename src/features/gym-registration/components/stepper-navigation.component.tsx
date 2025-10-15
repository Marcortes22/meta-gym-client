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
                    'flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 shadow-md',
                    {
                      'bg-gradient-to-br from-blue-600 to-indigo-600 text-white ring-4 ring-blue-200': isActive,
                      'bg-gradient-to-br from-green-500 to-emerald-600 text-white': isCompleted,
                      'bg-white text-gray-400 border-2 border-gray-300':
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
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    step.number
                  )}
                </div>
                
                <div className="mt-2 text-center max-w-[100px]">
                  <div
                    className={cn(
                      'text-xs font-semibold transition-colors duration-300',
                      isActive
                        ? 'text-blue-700'
                        : isCompleted
                        ? 'text-green-700'
                        : 'text-gray-500'
                    )}
                  >
                    {step.title}
                  </div>
                  <div className={cn(
                    "text-[10px] mt-0.5 hidden sm:block transition-colors duration-300",
                    isActive ? 'text-blue-600' : 'text-gray-400'
                  )}>
                    {step.description}
                  </div>
                </div>
              </div>

              {isConnected && (
                <div
                  className={cn(
                    'mx-3 h-0.5 w-12 rounded-full transition-all duration-300 sm:w-20 self-start mt-5',
                    isCompleted
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                      : isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600'
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