import { Footer, Header, HomeHeader } from 'components';
import { Outlet } from 'react-router-dom';

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
