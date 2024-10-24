import logoVertical from '@/assets/img/logo-vertical.svg';
import {Link} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import styles from './styles.module.scss';

export function HomeHeader() {
  return (
    <header className={styles.HomeHeader}>
      <div className="container">
        <Link to={ROUTES.projects}>
          <img
            src={logoVertical}
            className={styles.logoVertical}
            alt="logoVertical"
            width={239}
            height={169}
          />
        </Link>
      </div>
    </header>
  );
}
