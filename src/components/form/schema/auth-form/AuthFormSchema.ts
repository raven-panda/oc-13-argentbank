import z from 'zod';
import type { FormSchema } from '../../../../utils/FormSchema';

export function getUserAuthForm(): FormSchema {
  return {
    email: {
      type: 'email',
      defaultValue: '',
      label: 'Email address',
      autocomplete: 'email',
      validator: z.email().nonempty(),
    },
    password: {
      type: 'password',
      defaultValue: '',
      label: 'Password',
      autocomplete: 'current-password',
      validator: z.string().nonempty(),
    },
    rememberMe: {
      type: 'checkbox',
      defaultValue: true,
      label: 'Remember Me',
      validator: z.boolean(),
    },
  };
}
