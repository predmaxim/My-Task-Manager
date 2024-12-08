import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes';
import { HomeLayout, ProjectsLayout, TasksLayout } from '@/components/layout';
import { TasksPage } from 'src/pages/tasks-page';
import { NotFoundPage } from 'src/pages/not-found-page';
import { HomePage } from 'src/pages/home-page';
import { ProjectsPage } from 'src/pages/projects-page';
import { LoginPage } from 'src/pages/login-page';
import { RegisterPage } from 'src/pages/register-page';
import { MePage } from 'src/pages/me-page';
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
          <Route element={isLogged ? <ProjectsLayout /> : <HomeLayout />}>
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
