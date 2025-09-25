import { useState } from 'react';
import getUsernameEditForm from '../form/schema/username-edit-form/UsernameEditFormSchema';
import Form from '../form/Form';
import styles from '../../assets/css/components/username-edit.module.css';

export default function UsernameEdit({
  userFirstName,
  userLastName,
}: {
  userFirstName: string;
  userLastName: string;
}) {
  const [isEditing, setEditing] = useState(false);

  return isEditing ? (
    <Form
      className={styles.usernameEditFormWrapper}
      schema={getUsernameEditForm({
        firstName: userFirstName,
        lastName: userLastName,
      })}
      onSubmit={async ({ firstName, lastName }) => {
        console.log({ firstName, lastName });
        return undefined;
      }}
      submitButtonLabel="Save"
    />
  ) : (
    <>
      <p>
        {userFirstName} {userLastName}
      </p>
      <button onClick={() => setEditing(true)}>Edit</button>
    </>
  );
}
