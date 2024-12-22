import { ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from '@/lib/store';
import { DataProvider } from '@/providers/data-provider';

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <StoreProvider store={store}>
      <DataProvider>
        {children}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          theme="dark"
        />
      </DataProvider>
    </StoreProvider>
  );
}
