import styles from '@/assets/css/sign-in.module.css';
import { useAuth } from '@/components/auth/hook/AuthHooks';
import Form from '@/components/form/main/Form';
import { getUserAuthForm } from '@/components/form/schema/auth-form/AuthFormSchema';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from '@tanstack/react-router';

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
              await login({
                email: value.email,
                password: value.password,
                rememberMe: value.rememberMe,
              });
              success = true;
              navigate({ to: '/bank-account' });
            } catch (e: any) {
              if ('status' in e && e.status === 400)
                error =
                  'No account found for given email and password. Try again.';
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
        />
      </section>
    </main>
  );
}
