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
    title: 'Membresía', 
    description: 'Planes de Membresía',
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
      title: 'Membresía',
      description: 'Planes de Membresía', 
      number: 3,
    },
  ],
} as const;