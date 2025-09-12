import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../assets/css/sign-in.module.css';
import Form from '../components/form/Form';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hook/AuthHooks';

export default function SignInPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <main className="main bg-dark">
      <section className={styles.signInContent}>
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        <Form
          schema={{
            email: {
              defaultValue: '',
              label: 'Email address',
            },
            password: {
              defaultValue: '',
              label: 'Password',
            },
            rememberMe: {
              type: 'checkbox',
              defaultValue: true,
              label: 'Remember Me',
            },
          }}
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
