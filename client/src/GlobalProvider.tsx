import { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAllProjectsFromDbThunk } from './store/asyncActions/getAllProjectsFromDbThunk';
import { ThunkDispatchType } from './utils/types';

export function GlobalProvider({ children }: { children: ReactNode }) {
  const dispatch: ThunkDispatchType = useDispatch();

  useEffect(() => {
    dispatch(getAllProjectsFromDbThunk());
  }, [dispatch]);

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
