import logoHorizontal from '@/assets/img/logo-horizontal.svg';
import {Search} from '@/components/search';
import {Link} from 'react-router-dom';
import {ROUTES} from '@/router/routes';
import {CurrentProjectButton} from '@/components/current-project-button';
import {ThemeSwitcher} from '@/components/theme-switcher';
import './styles.scss';

export function Header() {
  return (
    <header className="Header">
      <div className="container">
        <Link to={ROUTES.projects} className="Header_logoLink">
          <img src={logoHorizontal} className="Header__logoImg" alt="logo"/>
        </Link>
        <Search className="Header__search"/>
        <div className="Header__buttonWrap">
          <ThemeSwitcher/>
          <CurrentProjectButton/>
        </div>
      </div>
    </header>
  );
}
