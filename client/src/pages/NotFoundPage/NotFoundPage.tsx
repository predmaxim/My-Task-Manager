import { RiArrowLeftLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

export default function NotFoundPage() {
  return (
    <main className="NotFoundPage">
      <div className="container">
        <h1 className="NotFoundPage__header">404 Page not found</h1>
        <div className="NotFoundPage__link">
          <RiArrowLeftLine /><Link to="/">Go to Home</Link>
        </div>
      </div>
    </main>
  );
};
