import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import { HomeLayout, Layout } from '@/components/layouts';
import { TasksPage } from '@/pages/tasks';
import { NotFoundPage } from '@/pages/not-found';
import { HomePage } from '@/pages/home';
import { ProjectsPage } from '@/pages/projects';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { MePage } from '@/pages/me';

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.projects} element={<ProjectsPage />} />
          </Route>
          <Route element={<Layout />}>
            <Route path={ROUTES.tasks} element={<TasksPage />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.login} element={<LoginPage />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.register} element={<RegisterPage />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.me} element={<MePage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
