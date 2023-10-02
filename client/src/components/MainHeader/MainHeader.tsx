import './MainHeader.scss';
import logoVertical from 'src/assets/img/logoVertical.svg';

export function MainHeader() {
  return (
    <header className="MainHeader">
      <div className="container">
        <a href="/">
          <img src={logoVertical} alt="logoVertical" />
        </a>
      </div>
    </header >
  );
}
