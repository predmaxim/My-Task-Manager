import './MainHeader.scss';
import logoVertical from 'assets/img/logoVertical.svg';

export function MainHeader() {
  return (
    <header className="MainHeader">
      <div className="container">
        <img src={logoVertical} alt="logoVertical" />
      </div>
    </header >
  );
}
