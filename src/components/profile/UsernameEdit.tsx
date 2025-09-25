import { useState } from 'react';
import getUsernameEditForm from '../form/schema/username-edit-form/UsernameEditFormSchema';
import Form from '../form/Form';
import styles from '../../assets/css/components/username-edit.module.css';
import { useQueryClient } from '@tanstack/react-query';
import { api } from '../../queryClient';
import { PROFILE_URI } from '../../definitions/api/api-uri';

export default function UsernameEdit({
  userFirstName,
  userLastName,
}: {
  userFirstName: string;
  userLastName: string;
}) {
  const queryClient = useQueryClient();
  const [isEditing, setEditing] = useState(false);

  const editUsername = async (newFirstName: string, newLastName: string) => {
    if (userFirstName === newFirstName && userLastName === newLastName) return;

    await api.put(PROFILE_URI, {
      firstName: newFirstName,
      lastName: newLastName,
    });
    queryClient.invalidateQueries({ queryKey: ['getProfile'] });
  };

  return isEditing ? (
    <Form
      className={styles.usernameEditFormWrapper}
      schema={getUsernameEditForm({
        firstName: userFirstName,
        lastName: userLastName,
      })}
      onSubmit={async ({ firstName, lastName }) => {
        console.log({ firstName, lastName });
        await editUsername(firstName, lastName);
        setEditing(false);
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
