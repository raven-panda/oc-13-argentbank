import z from 'zod';
import type { FormSchema } from '../../../../utils/FormSchema';

export function getUserAuthForm(): FormSchema {
  return [
    {
      layoutType: 'column',
      fields: {
        email: {
          type: 'email',
          defaultValue: '',
          label: 'Email address',
          autocomplete: 'email',
          validator: z.email().nonempty('Email cannot be empty'),
        },
        password: {
          type: 'password',
          defaultValue: '',
          label: 'Password',
          autocomplete: 'current-password',
          validator: z.string().nonempty('Password cannot be empty'),
        },
        rememberMe: {
          type: 'checkbox',
          defaultValue: true,
          label: 'Remember Me',
          validator: z.boolean(),
        },
      },
    },
  ];
}
