import {ReactNode, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getProjects} from '@/store/async-actions/get-projects';
import {ThunkDispatchType} from '@/utils/types';
import { Provider as StoreProvider } from "react-redux";
import { store } from "@/store";

export function GlobalProvider({children}: { children: ReactNode }) {
  const dispatchThunk: ThunkDispatchType = useDispatch();

  useEffect(() => {
    document.body.className = matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light';
    dispatchThunk(getProjects());
  }, [dispatchThunk]);

  return (
    <StoreProvider store={store}>
      {children}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        theme="dark"
      />
    </StoreProvider>
  );
}
