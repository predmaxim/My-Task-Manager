import { ReactNode, useEffect } from 'react';
import { useAppSelector } from '@/lib/store';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    document.body.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
};
