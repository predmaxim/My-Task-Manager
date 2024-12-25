import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonWithIcon } from '@/components/ui/button-with-iIcon';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store';
import { setTheme } from '@/lib/features/theme-slice';
import * as Icons from 'react-icons/ri';

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const [icon, setIcon] = useState(theme === 'light' ? 'RiMoonFill' : 'RiSunFill');

  const onClickHandler = () => {
    const themeColor = theme === 'light' ? 'dark' : 'light';
    setIcon(themeColor === 'light' ? 'RiMoonFill' : 'RiSunFill');
    dispatch(setTheme(themeColor));
  };

  return (
    <ButtonWithIcon
      className={styles.ThemeSwitcher}
      onClick={onClickHandler}
      icon={icon as keyof typeof Icons}
    />

  );
}
