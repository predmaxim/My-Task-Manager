import { Link } from 'react-router-dom';
import './HomeHeader.scss';
import logoVertical from 'src/assets/img/logoVertical.svg';

export function HomeHeader() {
  return (
    <header className="HomeHeader">
      <div className="container">
        <Link to="/">
          <img
            src={logoVertical}
            className="logoVertical"
            alt="logoVertical"
            width={239}
            height={169}
          />
        </Link>
      </div>
    </header >
  );
}
