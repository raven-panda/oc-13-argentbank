import type {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from 'react';
import type { ZodType } from 'zod';

export type FieldValidator = (value: any) => string | undefined;
export type FormSchema = FormSchemaGroup[];
interface FormSchemaGroup {
  layoutType: 'row' | 'column';
  gap?: 'small' | 'medium' | 'large';
  fields: {
    [key: string]: FormSchemaField;
  };
}
interface FormSchemaField {
  defaultValue: any;
  label?: string;
  type?: HTMLInputTypeAttribute;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  validator?: ZodType;
}

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
