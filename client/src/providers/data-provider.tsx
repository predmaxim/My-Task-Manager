import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.classList.add(theme);
  }, [dispatch, theme]);

  return <>{children}</>;
};
