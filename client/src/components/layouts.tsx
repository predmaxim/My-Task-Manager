import { Outlet } from 'react-router-dom';
import { HomeHeader } from './home-header';
import { Footer } from './footer';
import { Header } from './header';
import { ProjectsHeader } from '@/components/projects-header';

export const HomeLayout = () => (
  <>
    <HomeHeader />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);

export const ProjectsLayout = () => (
  <>
    <ProjectsHeader />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);

export const TasksLayout = () => (
  <>
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);
