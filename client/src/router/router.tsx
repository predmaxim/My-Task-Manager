import { HomeLayout, Layout } from 'components/Layouts';
import { NotFoundPage, ProjectsPage, TasksPage } from 'pages';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.projects} element={<ProjectsPage />} />
          </Route>
          <Route element={<Layout />}>
            <Route path={ROUTES.tasks} element={<TasksPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
