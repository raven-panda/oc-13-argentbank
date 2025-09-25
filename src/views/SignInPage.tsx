import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../assets/css/sign-in.module.css';
import Form from '../components/form/Form';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hook/AuthHooks';
import { getUserAuthForm } from '../components/form/schema/auth-form/AuthFormSchema';
import { AxiosError } from 'axios';

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <main className="main bg-dark">
      <section className={styles.signInContent}>
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        <Form
          schema={getUserAuthForm()}
          onSubmit={async (value) => {
            let success = false;
            let error: string | undefined;
            try {
              const loginResponse = await login({
                email: value.email,
                password: value.password,
              });

              success = loginResponse.status === 200;
              console.log(loginResponse);

              if (success) navigate({ to: '/profile' });
            } catch (e) {
              if (e instanceof AxiosError && e.status === 400)
                error = 'Invalid crendentials';
            }

            return {
              success,
              errors: {
                email: error
                  ? {
                      message: error,
                    }
                  : undefined,
              },
            };
          }}
          submitButtonLabel="Sign In"
        />
      </section>
    </main>
  );
}
