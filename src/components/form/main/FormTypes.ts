import type {
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
} from 'react';
import type { ZodType } from 'zod';

export interface SubmitButtonProps {
  canSubmit: boolean;
}
export interface CancelButtonProps {
  reset: () => void;
}

export type FieldValidator = (value: any) => string | undefined;
export type FormSchema = FormSchemaGroup[];
export interface FormSchemaGroup {
  layoutType: 'row' | 'column';
  gap?: 'small' | 'medium' | 'large';
  fields: {
    [key: string]: FormSchemaField;
  };
}
export interface FormSchemaField {
  defaultValue: string | number | boolean | object;
  label?: string;
  type?: HTMLInputTypeAttribute;
  autocomplete?: HTMLInputAutoCompleteAttribute;
  validator?: ZodType;
  placeholder?: string;
}
