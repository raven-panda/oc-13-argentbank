import type { HTMLInputTypeAttribute } from 'react';

export interface FormSchema {
  [key: string]: FormSchemaField;
}
interface FormSchemaField {
  defaultValue: any;
  label: string;
  type?: HTMLInputTypeAttribute;
  validators?: any[];
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
