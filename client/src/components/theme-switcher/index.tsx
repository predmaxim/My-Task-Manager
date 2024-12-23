import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store';
import { setTheme } from '@/lib/features/theme-slice';

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const [icon, setIcon] = useState(theme === 'light' ? 'RiMoonFill' : 'RiSunFill');

  const onClickHandler = () => {
    const newThemeColor = theme === 'light' ? 'dark' : 'light';
    setIcon(newThemeColor === 'light' ? 'RiMoonFill' : 'RiSunFill');
    dispatch(setTheme(newThemeColor));
  };

  return (
    <ButtonWithIcon
      className={styles.ThemeSwitcher}
      onClick={onClickHandler}
      icon={icon}
    />

  );
}
