import { useForm, type StandardSchemaV1Issue } from '@tanstack/react-form';
import {
  extractFormSchemaValues,
  type FormSchema,
} from '../../utils/FormSchema';
import styles from '../../assets/css/components/form.module.css';
import z from 'zod';

export default function Form({
  schema,
  submitButtonLabel = 'Submit',
  onSubmit,
  cancelCallback,
}: {
  schema: FormSchema;
  submitButtonLabel?: string;
  onSubmit: (
    value: Record<string, any>,
  ) => Promise<
    | {
        success: boolean;
        errors: Record<string, StandardSchemaV1Issue | undefined>;
      }
    | undefined
  >;
  cancelCallback?: () => void;
}) {
  const form = useForm({
    defaultValues: extractFormSchemaValues(schema),
    validators: {
      onSubmitAsync: async ({ value }) => {
        const response = await onSubmit(value);
        if (!response) return null;

        return { fields: response.errors };
      },
      onChange: z.object(formatFieldValidators(schema)),
    },
  });

  function formatFieldValidators(
    schema: FormSchema,
  ): Record<string, z.ZodType> {
    const validators: Record<string, z.ZodType> = {};

    for (const formGroup of schema) {
      for (const fieldName in formGroup.fields) {
        if (formGroup.fields[fieldName].validator)
          validators[fieldName] = formGroup.fields[fieldName].validator;
      }
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
      {schema.map((fieldGroup, key) => (
        <div
          key={fieldGroup.layoutType + key}
          className={styles[`formGroup_${fieldGroup.layoutType}`]}
        >
          {Object.keys(fieldGroup.fields).map((fieldName) => (
            <div
              key={fieldName}
              className={
                fieldGroup.fields[fieldName].type !== 'checkbox'
                  ? styles.inputTextWrapper
                  : styles.inputCheckboxWrapper
              }
            >
              <form.Field
                name={fieldName}
                children={(field) => (
                  <>
                    {fieldGroup.fields[fieldName].label &&
                      fieldGroup.fields[fieldName].type !== 'checkbox' && (
                        <label htmlFor={field.name}>
                          {fieldGroup.fields[fieldName].label}
                        </label>
                      )}
                    <input
                      id={field.name}
                      type={fieldGroup.fields[fieldName].type}
                      autoComplete={fieldGroup.fields[fieldName].autocomplete}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => {
                        if (fieldGroup.fields[fieldName].type === 'checkbox') {
                          field.handleChange(e.target.checked);
                        } else {
                          field.handleChange(e.target.value);
                        }
                      }}
                      value={
                        fieldGroup.fields[fieldName].type !== 'checkbox'
                          ? field.state.value
                          : undefined
                      }
                      checked={
                        fieldGroup.fields[fieldName].type === 'checkbox'
                          ? String(field.state.value) === 'true'
                          : undefined
                      }
                    />
                    {fieldGroup.fields[fieldName].label &&
                      fieldGroup.fields[fieldName].type === 'checkbox' && (
                        <label htmlFor={field.name}>
                          {fieldGroup.fields[fieldName].label}
                        </label>
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
      {cancelCallback && <button onClick={cancelCallback}>Cancel</button>}
    </form>
  );
}
