import './MainHeader.scss';
import logoVertical from 'src/assets/img/logoVertical.svg';

export function MainHeader() {
  return (
    <header className="MainHeader">
      <div className="container">
        <a href="/">
          <img src={logoVertical} className="logoVertical" alt="logoVertical" width={239} height={169} />
        </a>
      </div>
    </header >
  );
}
