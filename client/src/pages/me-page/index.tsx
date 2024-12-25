import styles from './styles.module.scss';
import { logout } from '@/lib/features/auth-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store.ts';
import { useNavigate } from 'react-router-dom';

export function MePage() {
  // const { data: user, isLoading, error } = useGetMeQuery();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const router = useNavigate();
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    router('/');
  };


  return (
    <section className={`${styles.Me} container`}>
      <h1>About me</h1>
      {user.avatar && <img src={user.avatar} alt={user.name} />}
      <p>{user.name} ({user.email})</p>
      <button onClick={handleLogout} className={styles.logout}>Logout</button>
    </section>
  );
}
