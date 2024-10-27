import styles from './styles.module.scss';
import { useLoginMutation } from '@/services/auth.ts';
import { FormEvent, useState } from 'react';
import { UserSchema } from '../../../../server/zod-schemas/generated';
import Input from '@/components/input';

export function LoginPage() {
  const [login] = useLoginMutation();
  const [errors, setErrors] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const { email, password } = UserSchema.pick({
      email: true,
      password: true,
    }).parse(formData);

    try {
      const user = await login({ email, password });

      if (user.error) {
        console.log(user);
        setErrors('Invalid email or password');
        return;
      }

      console.log('user:', user);
      setErrors(null);
    } catch (error) {
      console.error(error);
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
        {errors && <div className={styles.error}>{errors}</div>}
      </form>
    </div>
  );
}
