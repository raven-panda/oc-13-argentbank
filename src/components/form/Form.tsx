import { useForm } from '@tanstack/react-form';
import {
  extractFormSchemaValues,
  type FormSchema,
} from '../../utils/FormSchema';
import styles from '../../assets/css/components/form.module.css';
import z from 'zod';

export default function Form({
  schema,
  onSubmit,
  submitButtonLabel = 'Submit',
}: {
  schema: FormSchema;
  onSubmit: (value: any) => void;
  submitButtonLabel?: string;
}) {
  const form = useForm({
    defaultValues: extractFormSchemaValues(schema),
    validators: {
      onSubmit: z.object(formatFieldValidators(schema)),
    },
    onSubmit,
  });

  function formatFieldValidators(
    schema: FormSchema,
  ): Record<string, string | undefined> {
    const validators: Record<string, string | undefined> = {};

    for (const fieldName in schema) {
      if (schema[fieldName].validator)
        validators[fieldName] = schema[fieldName].validator;
    }

    return validators;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      noValidate
    >
      {Object.keys(schema).map((fieldName) => (
        <div
          key={fieldName}
          className={
            schema[fieldName].type !== 'checkbox'
              ? styles.inputTextWrapper
              : styles.inputCheckboxWrapper
          }
        >
          <form.Field
            name={fieldName}
            children={(field) => (
              <>
                {schema[fieldName].type !== 'checkbox' && (
                  <label htmlFor={field.name}>{schema[fieldName].label}</label>
                )}
                <input
                  id={field.name}
                  type={schema[fieldName].type}
                  autoComplete={schema[fieldName].autocomplete}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    if (schema[fieldName].type === 'checkbox') {
                      field.handleChange(e.target.checked);
                    } else {
                      field.handleChange(e.target.value);
                    }
                  }}
                  value={
                    schema[fieldName].type !== 'checkbox'
                      ? field.state.value
                      : undefined
                  }
                  checked={
                    schema[fieldName].type === 'checkbox'
                      ? String(field.state.value) === 'true'
                      : undefined
                  }
                />
                {schema[fieldName].type === 'checkbox' && (
                  <label htmlFor={field.name}>{schema[fieldName].label}</label>
                )}
                {field.state.meta.isTouched && !field.state.meta.isValid ? (
                  <em>
                    {field.state.meta.errors
                      .map((e) => e?.message)
                      .filter((e) => e)
                      .join(', ')}
                  </em>
                ) : null}
                {field.state.meta.isValidating ? 'Validating...' : null}
              </>
            )}
          />
        </div>
      ))}
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button
            type="submit"
            disabled={!canSubmit}
            className={styles.submitButton}
          >
            {isSubmitting ? '...' : submitButtonLabel}
          </button>
        )}
      />
    </form>
  );
}
