import logoHorizontal from '@/assets/img/logo-horizontal.svg';
import logoHorizontalWhite from '@/assets/img/logo-horizontal-white.svg';
import { Search } from '@/components/search';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router/routes';
import { CurrentProjectButton } from '@/components/current-project-button';
import { ThemeSwitcher } from '@/components/theme-switcher';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store.ts';
import { ProfileButton } from '../profile-button';

export function Header() {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <header className={styles.Header}>
      <div className={styles.container}>
        <Link to={ROUTES.home} className={styles.Header_logoLink}>
          <img
            src={theme === 'light' ? logoHorizontal : logoHorizontalWhite} className={styles.Header__logoImg}
            alt="logo"
          />
        </Link>
        <Search className={styles.Header__search} />
        <div className={styles.Header__buttonWrap}>
          <ThemeSwitcher />
          <CurrentProjectButton />
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}
