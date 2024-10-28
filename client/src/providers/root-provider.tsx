import { ReactNode } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store, { persistor } from '@/lib/store';
import { DataProvider } from '@/providers/data-provider';
import { PersistGate } from 'redux-persist/integration/react';

export function RootProvider({ children }: { children: ReactNode }) {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </StoreProvider>
  );
}
