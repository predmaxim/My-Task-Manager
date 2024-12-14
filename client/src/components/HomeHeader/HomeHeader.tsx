import logoVertical from 'assets/img/logoVertical.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../router/routes';
import './HomeHeader.scss';

export function HomeHeader() {
  return (
    <header className="HomeHeader">
      <div className="container">
        <Link to={ROUTES.projects}>
          <img
            src={logoVertical}
            className="logoVertical"
            alt="logoVertical"
            width={239}
            height={169}
          />
        </Link>
      </div>
    </header>
  );
}
