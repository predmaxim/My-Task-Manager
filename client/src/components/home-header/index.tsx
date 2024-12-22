import logoVertical from '@/assets/img/logo-vertical.svg';
import logoVerticalWhite from '@/assets/img/logo-vertical-white.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router/routes';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store.ts';

export function HomeHeader() {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <header className={styles.HomeHeader}>
      <div className="container">
        <Link to={ROUTES.home}>
          <img
            src={theme === 'light' ? logoVertical : logoVerticalWhite}
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
