import './Header.scss';
import logoHorizontal from 'assets/img/logoHorizontal.svg';

export function Header() {
  return (
    <header className="Header">
      <div className="container">
        <img src={logoHorizontal} alt="logoHorizontal" />
      </div>
    </header >
  );
}
