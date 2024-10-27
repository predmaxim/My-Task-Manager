import { Outlet } from 'react-router-dom';
import { HomeHeader } from './home-header';
import { Footer } from './footer';
import { Header } from './header';

export const HomeLayout = () => (
  <>
    <HomeHeader />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);

export const Layout = () => (
  <>
    <Header />
    <main className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);
