import type { HTMLInputTypeAttribute } from 'react';

interface InputFormSchema {
  [key: string]: {
    defaultValue: any;
    label: string;
    type?: HTMLInputTypeAttribute;
    validators?: any[];
  };
}
export interface FormSchema {
  defaultValues: {
    [key: string]: any;
  };
  labels: {
    [key: string]: string;
  };
  types: {
    [key: string]: HTMLInputTypeAttribute;
  };
}

export function createFormSchema(schema: InputFormSchema): FormSchema {
  const finalSchema: FormSchema = {
    defaultValues: {},
    labels: {},
    types: {},
  };

  for (const fieldName in schema) {
    finalSchema.defaultValues[fieldName] = schema[fieldName].defaultValue;
    finalSchema.labels[fieldName] = schema[fieldName].label;
    finalSchema.types[fieldName] = schema[fieldName].type ?? 'text';
  }

  return finalSchema;
}
