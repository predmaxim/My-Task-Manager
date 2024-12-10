import { Board } from 'src/components';
import './TasksPage.scss';

export default function TasksPage() {
  return (
    <main className="TasksPage">
      <div className="container">
        <Board />
      </div>
    </main>
  );
};
