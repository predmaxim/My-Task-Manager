import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export function NotFoundPage() {
  return (
    <div className={`${styles.NotFoundPage} container`}>
      <h1 className={styles.NotFoundPage__header}>404 Page not found</h1>
      <div className={styles.NotFoundPage__link}>
        <RiArrowLeftLine /><Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}
