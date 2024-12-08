import logoVertical from '@/assets/img/logo-vertical.svg';
import logoVerticalWhite from '@/assets/img/logo-vertical-white.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router/routes.ts';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store.ts';
import { ThemeSwitcher } from '@/components/layout/theme-switcher';
import { CurrentProjectButton } from '@/components/project/current-project-button';
import { ProfileButton } from '@/components/profile/profile-button';

export function HomeHeader() {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <header className={styles.HomeHeader}>
      <div className={`${styles.container} container`}>
        <div className={styles.leftSide}>
          <ThemeSwitcher />
        </div>
        <Link to={ROUTES.home}>
          <img
            src={theme === 'light' ? logoVertical : logoVerticalWhite}
            className={styles.logoVertical}
            alt="logoVertical"
            width={239}
            height={169}
          />
        </Link>
        <div className={styles.rightSide}>
          <CurrentProjectButton />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
