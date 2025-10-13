'use client';

import { defineStepper } from '@stepperize/react';

export const { useStepper, Scoped } = defineStepper(
  {
    id: 'gym-info',
    title: 'Gimnasio',
    description: 'Información del Gimnasio',
  },
  {
    id: 'membership-info',
    title: 'Finalizar', 
    description: 'Confirmar Registro',
  }
);

export const stepperConfig = {
  steps: [
    {
      id: 'gym-info' as const,
      title: 'Gimnasio',
      description: 'Información del Gimnasio',
      number: 1,
    },
    {
      id: 'membership-info' as const,
      title: 'Finalizar',
      description: 'Confirmar Registro', 
      number: 2,
    },
  ],
} as const;