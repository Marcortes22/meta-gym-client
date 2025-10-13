import { z } from 'zod';
import * as React from 'react';


export function zodValidate<T>(
  schema: z.ZodSchema<T>,
  value: T
): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}

export function createZodValidator<T>(schema: z.ZodSchema<T>) {
  return ({ value }: { value: T }) => zodValidate(schema, value);
}

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


export function zodValidateField<T extends Record<string, unknown>>(
  schema: z.ZodSchema<T>,
  fieldPath: keyof T,
  value: unknown
): string | undefined {


  const partialData = { [fieldPath]: value } as Partial<T>;
  
  const result = schema.safeParse(partialData);
  
  if (result.success) {
    return undefined;
  }

  const fieldError = result.error.issues.find(
    (issue: z.ZodIssue) => issue.path[0] === fieldPath
  );
  
  return fieldError?.message;
}

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

