'use client';

import * as React from 'react';
import { GymRegistrationStepper } from '../../features/gym-registration/components/gym-registration-stepper.component';
import type { GymRegistrationData } from '../../features/gym-registration/types/gym-registration.types';

export default function GymRegistrationPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);

  const handleRegistrationComplete = async (data: GymRegistrationData) => {
    setIsSubmitting(true);
    
    try {
      // Aquí iría la lógica para enviar los datos al backend
      console.log('Datos de registro del gimnasio:', data);
      
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsCompleted(true);
    } catch (error) {
      console.error('Error al registrar el gimnasio:', error);
      // Aquí podrías mostrar un toast de error o manejar el error de otra manera
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
              Tu gimnasio ha sido registrado exitosamente. En breve recibirás un correo con los detalles de acceso.
            </p>
          </div>

          <div className="space-y-3 text-sm text-gray-300 bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Perfil del gimnasio creado
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Administrador configurado
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Planes de membresía establecidos
            </div>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Iniciar Nuevo Registro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Registro de Gimnasio
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Configura tu gimnasio en Meta Gym siguiendo estos sencillos pasos. 
            Te guiaremos através del proceso para personalizar tu experiencia.
          </p>
        </div>

        {/* Stepper Component */}
        <GymRegistrationStepper
          onComplete={handleRegistrationComplete}
          className="max-w-4xl mx-auto"
        />

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-3">
              ¿Necesitas ayuda?
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Si tienes alguna pregunta durante el proceso de registro, no dudes en contactarnos.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-gray-300">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                soporte@metagym.com
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +506 2222-3333
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}