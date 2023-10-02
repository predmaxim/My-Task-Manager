import { RiArrowLeftLine } from 'react-icons/ri'
import { Header } from 'src/components';
import './NotFoundPage.scss';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="NotFoundPage">
        <div className="container">
          <h1 className="NotFoundPage__header">404 Page not found</h1>
          <div className="NotFoundPage__link">
            <RiArrowLeftLine /><a href="/">Go to Home</a>
          </div>
        </div>
      </main>
    </>
  );
}
