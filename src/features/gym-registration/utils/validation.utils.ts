import { z } from 'zod';
import * as React from 'react';

/**
 * Validates a field value using a Zod schema
 * @param schema - Zod schema for validation
 * @param value - Value to validate
 * @returns Error message or undefined if valid
 */
export function zodValidate<T>(
  schema: z.ZodSchema<T>,
  value: T
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

/**
 * Creates a validation function for TanStack Form using Zod
 * @param schema - Zod schema for validation
 * @returns Validation function for TanStack Form
 */
export function createZodValidator<T>(schema: z.ZodSchema<T>) {
  return ({ value }: { value: T }) => zodValidate(schema, value);
}

/**
 * Validates an entire form object using a Zod schema
 * @param schema - Zod schema for validation
 * @param formData - Form data to validate
 * @returns Object with field errors or undefined if valid
 */
export function zodValidateForm<T extends Record<string, unknown>>(
  schema: z.ZodSchema<T>,
  formData: T
): Record<keyof T, string> | undefined {
  const result = schema.safeParse(formData);
  
  if (result.success) {
    return undefined;
  }

  const errors: Record<string, string> = {};
  result.error.issues.forEach((issue) => {
    const path = issue.path[0] as keyof T;
    if (path && !errors[path as string]) {
      errors[path as string] = issue.message;
    }
  });

  return errors as Record<keyof T, string>;
}

/**
 * Validates a specific field path in a Zod schema
 * @param schema - Zod schema for validation
 * @param fieldPath - Path of the field to validate
 * @param value - Value to validate
 * @returns Error message or undefined if valid
 */
export function zodValidateField<T extends Record<string, unknown>>(
  schema: z.ZodSchema<T>,
  fieldPath: keyof T,
  value: unknown
): string | undefined {
  // Create a partial object with just the field we want to validate
  const partialData = { [fieldPath]: value } as Partial<T>;
  
  // Use safeParse on the full schema to get proper validation
  const result = schema.safeParse(partialData);
  
  if (result.success) {
    return undefined;
  }

  // Find the error for the specific field
  const fieldError = result.error.issues.find(
    (issue: z.ZodIssue) => issue.path[0] === fieldPath
  );
  
  return fieldError?.message;
}

/**
 * Custom hook to use Zod validation with form state
 * @param schema - Zod schema for validation
 * @param formData - Current form data
 * @returns Validation result and helper functions
 */
export function useZodValidation<T extends Record<string, unknown>>(
  schema: z.ZodSchema<T>, 
  formData: T
) {
  const [errors, setErrors] = React.useState<Record<string, string> | undefined>();

  const validate = React.useCallback(() => {
    const validationErrors = zodValidateForm(schema, formData);
    setErrors(validationErrors);
    return !validationErrors;
  }, [schema, formData]);

  const validateField = React.useCallback((fieldPath: keyof T, value: unknown) => {
    return zodValidateField(schema, fieldPath, value);
  }, [schema]);

  const clearErrors = React.useCallback(() => {
    setErrors(undefined);
  }, []);

  return {
    errors,
    validate,
    validateField,
    clearErrors,
    isValid: !errors,
  };
}

