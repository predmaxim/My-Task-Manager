import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TasksPage } from 'pages/TasksPage';
import { ProjectsPage } from 'pages/ProjectsPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ROUTES } from './routes';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.projects} element={<ProjectsPage />} />
        <Route path={ROUTES.tasks} element={<TasksPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}