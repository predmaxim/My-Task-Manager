import { Helmet, HelmetProvider } from 'react-helmet-async';
import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { APP_NAME } from '@/constants';
import styles from './styles.module.scss';

export function NotFoundPage() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Not Found - {APP_NAME}</title>
      </Helmet>
      <main className={styles.NotFoundPage}>
        <div className="container">
          <h1 className={styles.NotFoundPage__header}>404 Page not found</h1>
          <div className={styles.NotFoundPage__link}>
            <RiArrowLeftLine /><Link to="/">Go to Home</Link>
          </div>
        </div>
      </main>
    </HelmetProvider>
  );
}
