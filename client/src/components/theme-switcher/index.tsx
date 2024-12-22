import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ButtonWithIcon } from '@/components/button-with-iIcon';
import styles from './styles.module.scss';
import { useAppSelector } from '@/lib/store';
import { setTheme } from '@/lib/features/theme-slice';

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const [icon, setIcon] = useState(theme === 'light' ? 'RiSunFill' : 'RiMoonFill');

  const onClickHandler = () => {
    const newThemeColor = theme === 'light' ? 'dark' : 'light';
    setIcon(newThemeColor === 'light' ? 'RiSunFill' : 'RiMoonFill');
    dispatch(setTheme(newThemeColor));
    document.body.className = newThemeColor;
  };

  return (
    <ButtonWithIcon
      className={styles.ThemeSwitcher}
      onClick={onClickHandler}
      icon={icon}
    />

  );
}
