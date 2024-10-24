import { ReactNode, useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGetProjectsQuery } from '@/services/projects';
import store, { useAppDispatch } from '@/lib/store';
import { setProjects } from '@/lib/features/projects-slice';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

export function RootProvider({ children }: { children: ReactNode }) {
  const { data, error, isLoading } = useGetProjectsQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setProjects(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

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
