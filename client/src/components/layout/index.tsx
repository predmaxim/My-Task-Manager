import { Outlet } from 'react-router-dom';
import { HomeHeader } from '@/components/layout/home-header';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { ProjectsHeader } from '@/components/layout/projects-header';

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
