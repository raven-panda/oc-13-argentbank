import type {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from 'react';
import type { ZodType } from 'zod';

export type FieldValidator = (value: any) => string | undefined;
export interface FormSchema {
  [key: string]: FormSchemaField;
}
interface FormSchemaField {
  defaultValue: any;
  label: string;
  type?: HTMLInputTypeAttribute;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  validator?: ZodType;
}

export function extractFormSchemaValues(
  schema: FormSchema,
): Record<string, any> {
  const defaultValues: Record<string, any> = {};

  for (const fieldName in schema) {
    defaultValues[fieldName] = schema[fieldName].defaultValue;
  }

  return defaultValues;
}
