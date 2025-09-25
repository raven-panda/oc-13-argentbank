import z from 'zod';
import type { FormSchema } from '../../../../utils/FormUtils';

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
          defaultValue: defaultValues.firstName,
          autocomplete: 'name',
          validator: z.string().min(2, 'Type at least 2 characters'),
        },
        lastName: {
          defaultValue: defaultValues.lastName,
          autocomplete: 'family-name',
          validator: z.string().min(2, 'Type at least 2 characters'),
        },
      },
    },
  ];
}
