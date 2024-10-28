import { ROUTES } from '@/router/routes';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store';
import { Link } from 'react-router-dom';

export function HomePage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className={`${styles.Home} container`}>
      <section className={styles.section}>
        <div className={styles.hero}>
          <p className={styles.description}>
            Stay organized and boost your productivity with our intuitive task manager.
            Manage your tasks, set priorities,
            and achieve your goals effortlessly.
          </p>
          <Link to={user ? ROUTES.projects : ROUTES.login} className={styles.button}>Start Now</Link>
        </div>
        <img src="public/img_1.png" alt="image" className={styles.img} />
      </section>
    </div>
  );
}
