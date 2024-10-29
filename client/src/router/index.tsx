import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import { HomeLayout, TasksLayout } from '@/components/layouts';
import { TasksPage } from '@/pages/tasks';
import { NotFoundPage } from '@/pages/not-found';
import { HomePage } from '@/pages/home';
import { ProjectsPage } from '@/pages/projects';
import { LoginPage } from '@/pages/login';
import { RegisterPage } from '@/pages/register';
import { MePage } from '@/pages/me';
import { ProjectsHeader } from '@/components/projects-header';
import { useAppSelector } from '@/lib/store.ts';

export function Router() {
  const user = useAppSelector((state) => state.auth.user);
  const isLogged = Boolean(user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.home} element={<HomePage />} />
          </Route>
          <Route element={isLogged ? <ProjectsHeader /> : <HomeLayout />}>
            <Route path={ROUTES.projects} element={isLogged ? <ProjectsPage /> : <LoginPage />} />
          </Route>
          <Route element={isLogged ? <TasksLayout /> : <HomeLayout />}>
            <Route path={ROUTES.tasks} element={isLogged ? <TasksPage /> : <LoginPage />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.login} element={isLogged ? <MePage /> : <LoginPage />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.register} element={isLogged ? <MePage /> : <RegisterPage />} />
          </Route>
          <Route element={<HomeLayout />}>
            <Route path={ROUTES.me} element={isLogged ? <MePage /> : <LoginPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
