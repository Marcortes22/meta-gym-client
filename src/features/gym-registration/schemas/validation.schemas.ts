import { z } from 'zod';

// Gym Information Schema
export const gymInformationSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre del gimnasio debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  address: z
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(255, 'La dirección no puede exceder 255 caracteres'),
  email: z
    .string()
    .email('Formato de email inválido')
    .min(1, 'El email es requerido'),
  theme: z.enum(['light', 'dark', 'system'], {
    message: 'Selecciona un tema válido',
  }),
  logo_url: z
    .string()
    .url('La URL del logo debe ser válida')
    .optional()
    .or(z.literal('')),
  code: z
    .string()
    .min(3, 'El código debe tener al menos 3 caracteres')
    .max(10, 'El código no puede exceder 10 caracteres')
    .regex(
      /^[A-Z0-9]+$/,
      'El código solo debe contener letras mayúsculas y números'
    ),
});

// Administrator Information Schema
export const administratorInformationSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  last_name: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  email: z
    .string()
    .email('Formato de email inválido')
    .min(1, 'El email es requerido'),
  phone: z
    .string()
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(15, 'El teléfono no puede exceder 15 dígitos')
    .regex(
      /^[\d\s\-\+\(\)]+$/,
      'El teléfono solo puede contener números, espacios, guiones, paréntesis y signo más'
    ),
});

// Membership Information Schema (for display/confirmation)
export const membershipInformationSchema = z.object({
  acknowledged: z
    .boolean()
    .refine((value) => value === true, {
      message: 'Debes confirmar para continuar',
    }),
});

// Combined Schema for the entire registration flow
export const gymRegistrationSchema = z.object({
  gym: gymInformationSchema,
  administrator: administratorInformationSchema,
  membership: membershipInformationSchema,
});

// Type exports
export type GymInformationFormData = z.infer<typeof gymInformationSchema>;
export type AdministratorInformationFormData = z.infer<typeof administratorInformationSchema>;
export type MembershipInformationFormData = z.infer<typeof membershipInformationSchema>;
export type GymRegistrationFormData = z.infer<typeof gymRegistrationSchema>;