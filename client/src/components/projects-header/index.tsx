import logoHorizontal from '@/assets/img/logo-horizontal.svg';
import logoHorizontalWhite from '@/assets/img/logo-horizontal-white.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router/routes';
import { CurrentProjectButton } from '@/components/current-project-button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { useAppSelector } from '@/lib/store';
import styles from './styles.module.scss';
import { ProfileButton } from '../profile-button';

export function ProjectsHeader() {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <header className={styles.ProjectsHeader}>
      <div className={styles.container}>
        <Link to={ROUTES.home} className={styles.logoLink}>
          <img
            src={theme === 'light' ? logoHorizontal : logoHorizontalWhite} className={styles.logoImg}
            alt="logo"
          />
        </Link>
        <div className={styles.buttonWrap}>
          <ThemeSwitcher />
          <CurrentProjectButton />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
