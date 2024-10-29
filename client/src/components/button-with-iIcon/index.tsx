import { MouseEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import * as Icons from 'react-icons/ri';
import { RiDeleteBin6Line, RiPencilLine } from 'react-icons/ri';
import { IconType } from 'react-icons';

export type ButtonWithIconProps = {
  className: string;
  icon?: keyof typeof Icons | null;
  text?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  showActions?: boolean;
  actions?: {
    remove?: () => void;
    edit?: () => void;
  };
};

export function ButtonWithIcon(
  {
    className,
    icon = null,
    text,
    onClick,
    showActions = false,
    actions = {},
  }: ButtonWithIconProps) {
  const [IconComponent, setIconComponent] = useState<IconType | null>(null);

  useEffect(() => {
    if (icon) {
      const Icon = Icons[icon as keyof typeof Icons];
      if (Icon) {
        setIconComponent(() => Icon);
      }
    }
  }, [icon]);

  return (
    <div className={styles.ButtonWithIconWrap}>
      <button className={`${styles.ButtonWithIcon} button ${className}`} onClick={onClick}>
        {icon && icon.toLowerCase() !== 'loading...' && IconComponent &&
          <IconComponent className={styles.ButtonWithIcon__icon} />}
        {text && <span className={styles.ButtonWithIcon__text}>{text}</span>}
      </button>
      {showActions && (
        <div className={styles.button__actions}>
          {actions.remove && (
            <RiDeleteBin6Line className={`${styles.ButtonWithIcon__icon} button`} onClick={actions.remove} />
          )}
          {actions.edit && (
            <RiPencilLine className={`${styles.ButtonWithIcon__icon} button`} onClick={actions.edit} />
          )}
        </div>
      )}
    </div>
  );
}
