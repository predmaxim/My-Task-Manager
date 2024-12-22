import {ReactNode, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getProjects} from '@/store/async-actions/get-projects';
import {ThunkDispatchType} from '@/utils/types';

export function GlobalProvider({children}: { children: ReactNode }) {
  const dispatchThunk: ThunkDispatchType = useDispatch();

  useEffect(() => {
    document.body.className = matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    dispatchThunk(getProjects());
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
