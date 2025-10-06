'use client';

import { defineStepper } from '@stepperize/react';

export const { useStepper, Scoped } = defineStepper(
  {
    id: 'gym-info',
    title: 'Gimnasio',
    description: 'Información del Gimnasio',
  },
  {
    id: 'admin-info', 
    title: 'Administrador',
    description: 'Información del Administrador',
  },
  {
    id: 'membership-info',
    title: 'Finalizar', 
    description: 'Información del Sistema',
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
      id: 'admin-info' as const,
      title: 'Administrador', 
      description: 'Información del Administrador',
      number: 2,
    },
    {
      id: 'membership-info' as const,
      title: 'Finalizar',
      description: 'Información del Sistema', 
      number: 3,
    },
  ],
} as const;