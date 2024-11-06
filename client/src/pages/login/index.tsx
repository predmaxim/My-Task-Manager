import styles from './styles.module.scss';
import { useLoginMutation } from '@/services/auth';
import { FormEvent, useState } from 'react';
import Input from '@/components/input';
import { Link } from 'react-router-dom';
import { LoginSchema } from '@/zod-schemas/custom';
import { errorHandler } from '@/utils/error-handler.ts';
import { setAuthData } from '@/lib/features/auth-slice.ts';
import { useAppDispatch } from '@/lib/store.ts';

export function LoginPage() {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const { email, password } = LoginSchema.parse(formData);

    try {
      const authData = await login({ email, password });

      if ('error' in authData) {
        const errorMessage = errorHandler(authData.error);
        setErrors(errorMessage);
        throw new Error('Invalid email or password');
      }

      dispatch(setAuthData(authData.data));
      setErrors(null);
    } catch (error) {
      const errorMessage = errorHandler(error);
      console.error(errorMessage);
      setErrors('Invalid email or password');
    }
  };
  return (
    <div className={styles.Login}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input name="email" type="email" label="Email" className={styles.form__input} required />
        <Input name="password" type="password" label="Password" className={styles.form__input} required />
        <button type="submit" className={styles.submit}>Login</button>
      </form>
      {errors && <p className={styles.error}>{errors}</p>}
      <div className={styles.account}>
        <p>No account?</p>
        <Link to="/register" className={styles.accountButton}>Register</Link>
      </div>
    </div>
  );
}
