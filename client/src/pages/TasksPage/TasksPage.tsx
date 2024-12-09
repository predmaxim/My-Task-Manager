import { Board, Header } from 'src/components';
import './TasksPage.scss';

export default function TasksPage() {
  return (
    <>
      <Header />
      <main className="TasksPage">
        <div className="container">
          <Board />
        </div>
      </main>
    </>
  )
}
