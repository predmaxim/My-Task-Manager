import { ButtonHTMLAttributes, MouseEvent } from 'react';
import styles from './styles.module.scss';
import * as Icons from 'react-icons/ri';

export type ButtonWithIconProps = {
  className?: string;
  icon?: keyof typeof Icons | null;
  text?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export function ButtonWithIcon(
  {
    className,
    icon = null,
    text,
    onClick,
    ...otherProps
  }: ButtonWithIconProps & ButtonHTMLAttributes<HTMLButtonElement>) {

  const ButtonIcon = Icons[icon as keyof typeof Icons];

  return (
    <button
      {...otherProps}
      className={`${styles.ButtonWithIcon} ${className}`}
      onClick={onClick}
      type={otherProps.type ?? 'button'}
    >
      {icon && !icon.toLowerCase().includes('loading') &&
        <ButtonIcon className={styles.ButtonWithIcon__icon} />}
      {text && <span className={styles.ButtonWithIcon__text}>{text}</span>}
    </button>
  );
}
