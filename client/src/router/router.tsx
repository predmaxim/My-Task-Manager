import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TasksPage } from 'src/pages';
import { ProjectsPage } from 'src/pages';
import { NotFoundPage } from 'src/pages';
import { HomeLayout, Layout } from 'src/components/Layouts';
import { ROUTES } from './routes';
import { ToastContainer } from 'react-toastify';

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout />} >
            <Route path={ROUTES.projects} element={<ProjectsPage />} />
          </Route>
          <Route element={<Layout />} >
            <Route path={ROUTES.tasks} element={<TasksPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        theme="light"
      />
    </>
  );
}