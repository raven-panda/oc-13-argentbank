import type { ZodType } from 'zod';
import type { FormSchema } from './FormTypes';
import type { $ZodCheck } from 'zod/v4/core';

export function extractFormSchemaValues(
  schema: FormSchema,
): Record<string, any> {
  const defaultValues: Record<string, any> = {};

  for (const formGroup of schema) {
    for (const fieldName in formGroup.fields) {
      defaultValues[fieldName] = formGroup.fields[fieldName].defaultValue;
    }
  }

  return defaultValues;
}

export function formatFieldValidators(
  schema: FormSchema,
): Record<string, ZodType> {
  const validators: Record<string, ZodType> = {};

  for (const formGroup of schema) {
    for (const fieldName in formGroup.fields) {
      if (formGroup.fields[fieldName].validator)
        validators[fieldName] = formGroup.fields[fieldName].validator;
    }
  }

  return validators;
}

/**
 * Checks if given zod field validator contains a minimal length of at least 1 character condition
 * @param validator Zod validator of the field
 * @returns {boolean} `true` if a minimal length of at least 1 character condition was found
 */
export function isFieldRequired(validator?: ZodType): boolean {
  if (!validator) return false;

  const def = validator.def;
  return (
    def.type === 'string' &&
    !!def.checks &&
    def.checks.some(
      (c: any) =>
        (c as $ZodCheck<any>)._zod.def.check === 'min_length' &&
        c._zod.def.minimum > 0,
    )
  );
}
