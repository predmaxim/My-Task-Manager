import { useMemo } from 'react';
import { icons } from 'src/components/icons';
import './ButtonWithIcon.scss';

export type ButtonWithIconProps = {
  className: string,
  icon?: string,
  text?: string,
  onClick: () => void
}

export function ButtonWithIcon({ className, icon, text, onClick }: ButtonWithIconProps) {
  const BtnIcon = useMemo(() => icons.filter((el) => el.name === icon)[0], [icon]);

  return (
    <button className={`ButtonWithIcon button ${className}`} onClick={onClick}>
      {
        icon &&
        <BtnIcon className="ButtonWithIcon__icon" />
      }
      <span className="ButtonWithIcon__text">{text}</span>
    </button >
  );
}
