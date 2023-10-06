import { Outlet } from 'react-router-dom';
import { Footer, Header, HomeHeader } from 'src/components';

export const HomeLayout = () => (
  <>
    <HomeHeader />
    <Outlet />
    <Footer />
  </>
);

export const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);