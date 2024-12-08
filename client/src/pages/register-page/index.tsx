import styles from './styles.module.scss';
import { useRegisterMutation } from '@/services/auth-service.ts';
import Input from '@/components/ui/input';
import { FormEvent, useState } from 'react';
import { setAuthData } from '@/lib/features/auth-slice';
import { useAppDispatch } from '@/lib/store';
import { Link } from 'react-router-dom';
import { AuthSchema, RegisterSchema } from '@/zod-schemas/custom';
import { errorHandler } from '@/utils/error-handler.ts';

export function RegisterPage() {
  const [register] = useRegisterMutation();
  const [errors, setErrors] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget));
      const {
        email,
        password,
        name,
      } = RegisterSchema.parse(formData);

      const registerData = await register({ email, password, name });
      console.log('RegisterPage => handleSubmit => registerData:', registerData);

      if ('error' in registerData) {
        const errorMessage = errorHandler(registerData.error);
        setErrors(errorMessage);
        return;
      }

      const authData = AuthSchema.parse(registerData.data);
      dispatch(setAuthData(authData));
      setErrors(null);
    } catch (error) {
      const errorMessage = errorHandler(error);
      console.error(errorMessage);
      setErrors(errorMessage);
    }
  };
  return (
    <div className={styles.Register}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input name="name" type="text" label="User Name" className={styles.form__input} required />
        <Input name="email" type="email" label="Email" className={styles.form__input} required />
        <Input name="password" type="password" label="Password" className={styles.form__input} required />
        <Input name="verifyPassword" type="password" label="Verify password" className={styles.form__input} required />
        <button type="submit" className={styles.submit}>Register</button>
      </form>
      {errors && <p className={styles.error}>{errors}</p>}
      <div className={styles.account}>
        <p>Already have an account?</p>
        <Link to="/login" className={styles.accountButton}>Login</Link>
      </div>
    </div>
  );
}
