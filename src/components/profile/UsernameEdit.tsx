import { useAppDispatch } from '@/api/Hooks';
import { authenticationActions } from '@/api/slices/AuthenticationSlice';
import styles from '@/assets/css/components/username-edit.module.css';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Form from '../form/main/Form';
import getUsernameEditForm from '../form/schema/username-edit-form/UsernameEditFormSchema';
import { LoaderIndicator } from '../layout/LoaderIndicator';

export default function UsernameEdit({
  userFirstName,
  userLastName,
  userLoading,
}: {
  userFirstName?: string;
  userLastName?: string;
  userLoading: boolean;
}) {
  const dispatch = useAppDispatch();
  const [isEditing, setEditing] = useState(false);

  const editUsername = async (newFirstName: string, newLastName: string) => {
    if (userFirstName === newFirstName && userLastName === newLastName) return;

    await dispatch(
      authenticationActions.editUserProfile({
        firstName: newFirstName,
        lastName: newLastName,
      }),
    );
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
      submitButton={({ canSubmit }) => (
        <button
          className={styles.editUsernameFormCta}
          type="submit"
          disabled={!canSubmit}
        >
          Save
        </button>
      )}
      cancelButton={({ reset }) => (
        <button
          className={styles.editUsernameFormCta}
          type="button"
          onClick={() => {
            setEditing(false);
            reset();
          }}
        >
          Cancel
        </button>
      )}
    />
  ) : (
    <div className={styles.usernameParagraph}>
      {userLoading ? (
        <LoaderIndicator />
      ) : (
        <>
          <p>
            {userFirstName} {userLastName}
          </p>
          <button
            onClick={() => setEditing(true)}
            className={styles.editButton}
          >
            <FontAwesomeIcon icon={faUserEdit} size="sm" /> Edit your name
          </button>
        </>
      )}
    </div>
  );
}
