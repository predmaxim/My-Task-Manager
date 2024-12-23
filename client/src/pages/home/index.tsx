import { ROUTES } from '@/router/routes';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import img from '@/assets/img/img_1.png';

export function HomePage() {
  return (
    <div className={`${styles.Home} container`}>
      <section className={styles.section}>
        <div className={styles.hero}>
          <p className={styles.description}>
            Stay organized and boost your productivity with our intuitive task manager.
            Manage your tasks, set priorities,
            and achieve your goals effortlessly.
          </p>
          <Link to={ROUTES.projects} className={styles.button}>Start Now</Link>
        </div>
        <img src={img} alt="project page image" className={styles.img} />
      </section>
    </div>
  );
}
