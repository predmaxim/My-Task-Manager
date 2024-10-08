import {HomeLayout, Layout} from '@/components/layouts';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ROUTES} from './routes';
import {ProjectsPage} from '@/pages/projects';
import {TasksPage} from '@/pages/tasks';
import {NotFoundPage} from '@/pages/not-found';

export function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomeLayout/>}>
            <Route path={ROUTES.projects} element={<ProjectsPage/>}/>
          </Route>
          <Route element={<Layout/>}>
            <Route path={ROUTES.tasks} element={<TasksPage/>}/>
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
