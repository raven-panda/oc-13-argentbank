import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../assets/css/sign-in.module.css';
import Form from '../components/form/Form';

export default function SignInPage() {
  return (
    <main className="main bg-dark">
      <section className={styles.signInContent}>
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        <Form
          schema={{
            username: {
              defaultValue: '',
              label: 'Username',
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
          onSubmit={({ value }) => {
            console.log(value);
          }}
          submitButtonLabel="Sign In"
        />
      </section>
    </main>
  );
}
