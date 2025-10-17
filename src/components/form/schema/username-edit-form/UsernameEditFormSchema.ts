import z from 'zod';
import type { FormSchema } from '../../main/FormTypes';

export default function getUsernameEditForm(defaultValues: {
  firstName: string | undefined;
  lastName: string | undefined;
}): FormSchema {
  return [
    {
      layoutType: 'row',
      gap: 'small',
      fields: {
        firstName: {
          defaultValue: '',
          autocomplete: 'name',
          validator: z.string().min(2, 'Type at least 2 characters'),
          placeholder: defaultValues.firstName,
        },
        lastName: {
          defaultValue: '',
          autocomplete: 'family-name',
          validator: z.string().min(2, 'Type at least 2 characters'),
          placeholder: defaultValues.lastName,
        },
      },
    },
  ];
}
