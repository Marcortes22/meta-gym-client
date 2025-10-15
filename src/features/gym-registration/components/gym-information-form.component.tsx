'use client';

import * as React from 'react';
import { useForm } from '@tanstack/react-form';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Spinner } from '@/shared/components/ui/spinner';
import type { GymInformation, StepFormProps } from '../types/gym-registration.types';
import { gymInformationSchema } from '../schemas/validation.schemas';
import { createZodValidator } from '../utils/validation.utils';
import { SchedulePicker } from './schedule-picker.component';

interface GymInformationFormProps extends StepFormProps {
  initialData?: Partial<GymInformation>;
  onSubmit: (data: GymInformation) => void;
  disabled?: boolean;
}

function GymInformationForm({
  initialData = {},
  onSubmit,
  onNext,
  disabled = false,
}: GymInformationFormProps) {
  const form = useForm({
    defaultValues: {
      name: initialData.name || '',
      address: initialData.address || '',
      email: initialData.email || '',
      theme: initialData.theme || 'blue' as const,
      logo_url: initialData.logo_url || '',
      code: initialData.code || '',
      schedule: initialData.schedule || [],
    },
    onSubmit: ({ value }) => {
      onSubmit(value as GymInformation);
      onNext();
    },
  });

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Información del Gimnasio
        </h2>
        <p className="text-sm text-gray-600">
          Cuéntanos sobre tu gimnasio para crear tu perfil personalizado
        </p>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="name"
          validators={{
            onChange: createZodValidator(gymInformationSchema.shape.name),
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                Nombre del Gimnasio
                <span className="text-red-600">*</span>
              </label>
              <Input
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Ej: Fitness Pro Costa Rica"
                className="bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <p className="text-xs text-gray-600">
                Este será el nombre que vean tus miembros
              </p>
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onChange: createZodValidator(gymInformationSchema.shape.email),
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                Correo del Gimnasio
                <span className="text-red-600">*</span>
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="info@tugym.com"
                className="bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <form.Field
            name="theme"
            validators={{
              onChange: createZodValidator(gymInformationSchema.shape.theme),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label htmlFor={`gym-${field.name}`} className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                  Color del Tema
                  <span className="text-red-600">*</span>
                </label>
                <select
                  id={`gym-${field.name}`}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value as 'blue' | 'red' | 'orange' | 'yellow')}
                  onBlur={field.handleBlur}
                  title="Selecciona el color del tema"
                  aria-label="Color del Tema"
                  className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  <option value="blue">🔵 Azul</option>
                  <option value="red">🔴 Rojo</option>
                  <option value="orange">🟠 Naranja</option>
                  <option value="yellow">🟡 Amarillo</option>
                </select>
                <p className="text-xs text-gray-600">
                  Elige el color principal para tu gimnasio
                </p>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm font-medium text-red-600">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="code"
            validators={{
              onChange: createZodValidator(gymInformationSchema.shape.code),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                  Código del Gimnasio
                  <span className="text-red-600">*</span>
                </label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Ej: GYM001, FIT-CR"
                  className="bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
                <p className="text-xs text-gray-600">
                  Código único para identificar tu gimnasio (solo mayúsculas y números)
                </p>
                {field.state.meta.errors.length > 0 && (
                  <p className="text-sm font-medium text-red-600">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>
        </div>


        <form.Field
          name="logo_url"
          validators={{
            onChange: createZodValidator(gymInformationSchema.shape.logo_url),
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                URL del Logo <span className="text-gray-500 font-normal">(Opcional)</span>
              </label>
              <Input
                id={field.name}
                name={field.name}
                type="url"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="https://ejemplo.com/logo.png"
                className="bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
              <p className="text-xs text-gray-600">
                Puedes subir tu logo más tarde desde el panel de administración
              </p>
            </div>
          )}
        </form.Field>


        <form.Field
          name="address"
          validators={{
            onChange: createZodValidator(gymInformationSchema.shape.address),
          }}
        >
          {(field) => (
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 flex items-center gap-1">
                Dirección del Gimnasio
                <span className="text-red-600">*</span>
              </label>
              <textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                placeholder="Calle principal, Barrio, Ciudad, Provincia"
                rows={3}
                className="w-full rounded-md border-2 border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>


        <form.Field name="schedule">
          {(field) => (
            <div className="space-y-2">
              <SchedulePicker
                value={field.state.value || []}
                onChange={(schedule) => field.handleChange(schedule)}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm font-medium text-red-600">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-3 text-base font-semibold shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!form.state.isValid || disabled}
          >
            {disabled ? (
              <>
                <Spinner className="mr-2 h-5 w-5" />
                Procesando...
              </>
            ) : (
              'Continuar →'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export { GymInformationForm };