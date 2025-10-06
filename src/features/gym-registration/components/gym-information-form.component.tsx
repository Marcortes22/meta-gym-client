'use client';

import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import type { GymInformation, StepFormProps } from '../types/gym-registration.types';

interface GymInformationFormProps extends StepFormProps {
  initialData?: Partial<GymInformation>;
  onSubmit: (data: GymInformation) => void;
}

function GymInformationForm({
  initialData = {},
  onSubmit,
  onNext,
}: GymInformationFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData.name || '',
      email: initialData.email || '',
      phone: initialData.phone || '',
      address: initialData.address || '',
    },
    onSubmit: ({ value }) => {
      onSubmit(value as GymInformation);
      onNext();
    },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">
          Información del Gimnasio
        </h2>
        <p className="text-gray-400">
          Cuéntanos sobre tu gimnasio para crear tu perfil personalizado
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
        {/* Nombre del Gimnasio */}
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) =>
              !value || value.length < 2
                ? 'El nombre del gimnasio debe tener al menos 2 caracteres'
                : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-1">
                Nombre del Gimnasio
                <span className="text-red-500">*</span>
              </label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Ej: Fitness Pro Costa Rica"
                className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
              />
              <p className="text-xs text-gray-400">
                Este será el nombre que vean tus miembros
              </p>
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Correo y Teléfono en fila */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return !value
                  ? 'El correo electrónico es requerido'
                  : !emailRegex.test(value)
                  ? 'Ingrese un correo electrónico válido'
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-1">
                  Correo del Gimnasio
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="info@tugym.com"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="phone"
            validators={{
              onChange: ({ value }) => {
                const phoneRegex = /^\+?[\d\s-()]{8,}$/;
                return !value
                  ? 'El teléfono es requerido'
                  : !phoneRegex.test(value)
                  ? 'Ingrese un número de teléfono válido'
                  : undefined;
              },
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-medium text-white flex items-center gap-1">
                  Teléfono
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="+506 8888-9888"
                  className="bg-gray-900 border-gray-600 text-white placeholder:text-gray-500"
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>

        {/* Dirección */}
        <form.Field
          name="address"
          validators={{
            onChange: ({ value }) =>
              !value || value.length < 10
                ? 'La dirección debe tener al menos 10 caracteres'
                : undefined,
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white flex items-center gap-1">
                Dirección del Gimnasio
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Calle principal, Barrio, Ciudad, Provincia"
                rows={3}
                className="w-full rounded-md border border-gray-600 bg-gray-900 px-3 py-2 text-white placeholder:text-gray-500 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-red-500">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        {/* Botón de continuar */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2"
            disabled={!form.state.isValid}
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
}

export { GymInformationForm };