import './Header.scss';
import logoHorizontal from 'src/assets/img/logoHorizontal.svg';

export function Header() {
  return (
    <header className="Header">
      <div className="container">
        <a href="/">
          <img src={logoHorizontal} alt="logoHorizontal" />
        </a>
      </div>
    </header >
  );
}
