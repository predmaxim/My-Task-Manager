import {Outlet} from 'react-router-dom';
import {HomeHeader} from './home-header';
import {Footer} from './footer';
import {Header} from './header';

export const HomeLayout = () => (
  <>
    <HomeHeader/>
    <Outlet/>
    <Footer/>
  </>
);

export const Layout = () => (
  <>
    <Header/>
    <Outlet/>
    <Footer/>
  </>
);
