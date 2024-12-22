import styles from '@/pages/login/styles.module.scss';

export function MePage() {
  return (
    <div className={`${styles.Me} container`}>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
