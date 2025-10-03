import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { putUserProfile } from '../../api/user-api-queries';
import styles from '../../assets/css/components/username-edit.module.css';
import Form from '../form/Form';
import getUsernameEditForm from '../form/schema/username-edit-form/UsernameEditFormSchema';

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

    await putUserProfile({
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
    <div className={styles.usernameParagraph}>
      <p>
        {userFirstName} {userLastName}
      </p>
      <button onClick={() => setEditing(true)} className={styles.editButton}>
        <FontAwesomeIcon icon={faUserEdit} size="sm" /> Edit your name
      </button>
    </div>
  );
}
