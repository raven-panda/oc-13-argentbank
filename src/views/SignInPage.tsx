import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../assets/css/sign-in.module.css';
import Form from '../components/form/Form';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hook/AuthHooks';
import { getUserAuthForm } from '../components/form/schema/auth-form/AuthFormSchema';

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
          onSubmit={async ({
            value,
          }: {
            value: { email: string; password: string; rememberMe: boolean };
          }) => {
            const loginResponse = await login({
              email: value.email,
              password: value.password,
            });
            const success = loginResponse.status === 200;
            console.log({ value, success });

            if (success) navigate({ to: '/profile' });
          }}
          submitButtonLabel="Sign In"
        />
      </section>
    </main>
  );
}
