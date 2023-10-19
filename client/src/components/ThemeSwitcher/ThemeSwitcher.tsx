import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setTheme } from '../../store/reducers/themeReducer';
import { ButtonWithIcon } from '../ButtonWithIcon';

export function ThemeSwitcher() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);
  const [icon, setIcon] = useState(theme === 'light' ? 'RiSunFill' : 'RiMoonFill');

  const onClickHandler = () => {
    const newThemeColor = theme === 'light' ? 'dark' : 'light';
    setIcon(newThemeColor === 'light' ? 'RiSunFill' : 'RiMoonFill');
    dispatch(setTheme(newThemeColor));
    document.body.className = newThemeColor;
  };

  return (
    <ButtonWithIcon
      className={'ThemeSwitcher'}
      onClick={onClickHandler}
      icon={icon}
    />

  );
}
