import { ReactNode, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProjectsFromDbThunk } from './store/asyncActions/getAllProjectsFromDbThunk';
import { ThunkDispatchType } from './utils/types';

export function GlobalProvider({ children }: { children: ReactNode }) {
  const dispatchThunk: ThunkDispatchType = useDispatch();

  useLayoutEffect(() => {
    document.body.className = matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    dispatchThunk(getAllProjectsFromDbThunk());
  }, [dispatchThunk]);

  return (
    <>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        theme="dark"
      />
    </>
  );
}
