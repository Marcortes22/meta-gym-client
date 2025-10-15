'use client';

import * as React from 'react';
import Link from 'next/link';
import { GymRegistrationStepper } from '../../../features/gym-registration/components/gym-registration-stepper.component';
import type { GymRegistrationData } from '../../../features/gym-registration/types/gym-registration.types';
import { Button } from '@/shared/components/ui/button';

export default function GymRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const handleRegistrationComplete = async (data: GymRegistrationData) => {
    setIsSubmitting(true);
    
    try {
      console.log('Datos de registro del gimnasio:', data);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsCompleted(true);
    } catch (error) {
      console.error('Error al registrar el gimnasio:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <h2 className="text-xl font-semibold text-white">
            Procesando tu registro...
          </h2>
          <p className="text-gray-400">
            Estamos configurando tu gimnasio, por favor espera.
          </p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6 p-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              ¡Registro Completado!
            </h2>
            <p className="text-gray-400">
              Tu gimnasio ha sido registrado exitosamente. Revisa tu correo para las credenciales de acceso.
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-300 bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Perfil del gimnasio creado
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Usuario administrador creado
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Email de bienvenida enviado
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => window.location.href = '/'}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Iniciar Sesión
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full"
            >
              Registrar Otro Gimnasio
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Registro de Gimnasio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Configura tu gimnasio en Meta Gym siguiendo estos sencillos pasos. 
            Te guiaremos a través del proceso para personalizar tu experiencia.
          </p>
        </div>

        {/* Stepper Component */}
        <GymRegistrationStepper
          onComplete={handleRegistrationComplete}
          className="max-w-4xl mx-auto"
        />
      </div>
    </div>
  );
}