'use client';

import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/shared/components/ui/button';
import type { MembershipInformation, StepFormProps } from '../types/gym-registration.types';

interface MembershipInformationFormProps extends StepFormProps {
  initialData?: Partial<MembershipInformation>;
  onSubmit: (data: MembershipInformation) => void;
}

function MembershipInformationForm({
  initialData = {},
  onSubmit,
  onNext,
  onPrevious,
  isLastStep = true,
}: MembershipInformationFormProps) {
  const form = useForm({
    defaultValues: {
      hasBasicPlan: initialData.hasBasicPlan || false,
      hasPremiumPlan: initialData.hasPremiumPlan || false,
      hasVipPlan: initialData.hasVipPlan || false,
      customPlans: initialData.customPlans || [],
    },
    onSubmit: ({ value }) => {
      onSubmit(value as MembershipInformation);
      onNext();
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Planes de Membresía
        </h2>
        <p className="text-gray-400">
          Configura los tipos de membresía que ofrecerás en tu gimnasio
        </p>
      </div>

      <form
        className="space-y-6 bg-gray-800 rounded-lg p-6 border border-gray-700"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Planes Predefinidos */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            Planes Predefinidos
          </h3>

          {/* Plan Básico */}
          <form.Field name="hasBasicPlan">
            {(field) => (
              <div className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="mt-1 h-4 w-4 text-orange-500 bg-gray-900 border-gray-600 rounded focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">Plan Básico</div>
                    <div className="text-gray-400 text-sm">
                      Acceso a equipos básicos y área de cardio. Perfecto para usuarios que buscan mantenerse en forma.
                    </div>
                  </div>
                </label>
              </div>
            )}
          </form.Field>

          {/* Plan Premium */}
          <form.Field name="hasPremiumPlan">
            {(field) => (
              <div className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="mt-1 h-4 w-4 text-orange-500 bg-gray-900 border-gray-600 rounded focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">Plan Premium</div>
                    <div className="text-gray-400 text-sm">
                      Incluye clases grupales, entrenador personal y acceso completo al gimnasio.
                    </div>
                  </div>
                </label>
              </div>
            )}
          </form.Field>

          {/* Plan VIP */}
          <form.Field name="hasVipPlan">
            {(field) => (
              <div className="border border-gray-600 rounded-lg p-4 hover:border-gray-500 transition-colors">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={field.state.value}
                    onChange={(e) => field.handleChange(e.target.checked)}
                    className="mt-1 h-4 w-4 text-orange-500 bg-gray-900 border-gray-600 rounded focus:ring-orange-500"
                  />
                  <div className="flex-1">
                    <div className="text-white font-medium mb-1">Plan VIP</div>
                    <div className="text-gray-400 text-sm">
                      Acceso 24/7, área VIP, spa, nutricionista y todos los beneficios premium.
                    </div>
                  </div>
                </label>
              </div>
            )}
          </form.Field>
        </div>

        {/* Información sobre personalización */}
        <div className="border border-blue-500 rounded-lg p-4 bg-blue-500/10">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-2">
                Personalización Futura
              </h4>
              <p className="text-sm text-gray-300">
                Estos son los planes base que puedes ofrecer. Una vez configurado el sistema, podrás:
              </p>
              <ul className="text-sm text-gray-300 mt-2 space-y-1">
                <li>• Crear planes personalizados con precios específicos</li>
                <li>• Configurar beneficios únicos para cada plan</li>
                <li>• Establecer promociones y descuentos temporales</li>
                <li>• Gestionar planes familiares o corporativos</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nota importante */}
        <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-orange-500">
          <p className="text-sm text-gray-300">
            <strong className="text-orange-400">Nota:</strong> Puedes modificar estos planes en cualquier momento desde el panel de administración. 
            También podrás agregar planes personalizados según las necesidades de tu gimnasio.
          </p>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onPrevious}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Anterior
          </Button>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-2"
          >
            {isLastStep ? 'Finalizar Registro' : 'Continuar'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export { MembershipInformationForm };