import { useForm } from '@tanstack/react-form';
import { createFormSchema, type InputFormSchema } from '../../utils/FormSchema';

export default function Form({
  definitionSchema,
  onSubmit,
  submitButtonLabel = 'Submit',
}: {
  definitionSchema: InputFormSchema;
  onSubmit: (value: any) => void;
  submitButtonLabel?: string;
}) {
  const schema = createFormSchema(definitionSchema);

  const form = useForm({
    defaultValues: schema.defaultValues,
    onSubmit,
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      {Object.keys(schema.defaultValues).map((fieldName) => (
        <div key={fieldName}>
          <form.Field
            name={fieldName}
            children={(field) => (
              <>
                {schema.types[fieldName] !== 'checkbox' && (
                  <label htmlFor={field.name}>{schema.labels[fieldName]}</label>
                )}
                <input
                  id={field.name}
                  type={schema.types[fieldName]}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    if (schema.types[fieldName] === 'checkbox') {
                      field.handleChange(e.target.checked);
                    } else {
                      field.handleChange(e.target.value);
                    }
                  }}
                  value={
                    schema.types[fieldName] !== 'checkbox'
                      ? field.state.value
                      : undefined
                  }
                  checked={
                    schema.types[fieldName] === 'checkbox'
                      ? String(field.state.value) === 'true'
                      : undefined
                  }
                />
                {schema.types[fieldName] === 'checkbox' && (
                  <label htmlFor={field.name}>{schema.labels[fieldName]}</label>
                )}
                {field.state.meta.isTouched && !field.state.meta.isValid ? (
                  <em>{field.state.meta.errors.join(', ')}</em>
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
          <button type="submit" disabled={!canSubmit}>
            {isSubmitting ? '...' : submitButtonLabel}
          </button>
        )}
      />
    </form>
  );
}
