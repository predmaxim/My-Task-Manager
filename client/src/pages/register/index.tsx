import styles from './styles.module.scss';
import { useRegisterMutation } from '@/services/auth';
import Input from '@/components/input';
import { FormEvent, useState } from 'react';
import { z } from 'zod';
import { setAuthData } from '@/lib/features/auth-slice';
import { useAppDispatch } from '@/lib/store';
import { UserSchema } from '@/zod-schemas/generated';
import { TokenSchema } from '@/zod-schemas/custom';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  const [register] = useRegisterMutation();
  const [errors, setErrors] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const { email, password, name, verifyPassword } = UserSchema.pick({
      email: true,
      password: true,
      name: true,
    }).extend({ verifyPassword: z.string() }).parse(formData);

    if (password !== verifyPassword) {
      console.error('Passwords do not match');
      setErrors('Passwords do not match');
      return;
    }

    try {
      const  data  = await register({ email, password, name });
      console.log('RegisterPage => handleSubmit => data:', data);

      if (data instanceof Error) {
        setErrors(data.message);
        return;
      }

      const authData = z.object({ user: UserSchema.omit({ password: true }) }).extend({ token: TokenSchema }).parse(data);
      dispatch(setAuthData(authData));
      setErrors(null);
    } catch (error) {
      console.error(error);
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
        {errors && <div className={styles.error}>{errors}</div>}
        <button type="submit" className={styles.submit}>Register</button>
      </form>
       <div className={styles.account}>
        <p>Already have an account?</p>
        <Link to="/login" className={styles.accountButton}>Login</Link>
      </div>
    </div>
  );
}
