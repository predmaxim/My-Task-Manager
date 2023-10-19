import logoHorizontal from 'assets/img/logoHorizontal.svg';
import { Search } from 'components/Search';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router/routes';
import { CurrentProjectBtn } from '../CurrentProjectBtn';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher';
import './Header.scss';

export function Header() {
  return (
    <header className="Header">
      <div className="container">
        <Link to={ROUTES.projects} className="Header_logoLink">
          <img src={logoHorizontal} className="Header__logoImg" alt="logo" />
        </Link>
        <Search className="Header__search" />
        <div className="Header__buttonWrap">
          <ThemeSwitcher />
          <CurrentProjectBtn />
        </div>
      </div>
    </header>
  );
}
