import { MouseEvent } from 'react';
import { ButtonWithIcon } from '@/components/ui/button-with-iIcon';
import styles from './styles.module.scss';
import * as Icons from 'react-icons/ri';
import { MenuActionType } from '@/types';
import { createPortal } from 'react-dom';

export type PopupMenuType = {
  className?: string,
  actions: MenuActionType[],
  closeMenu: () => void
  isActive: boolean
}

export function PopupMenu({ actions, className, closeMenu, isActive }: PopupMenuType) {
  if (!isActive) {
    return null;
  }
  return (
    createPortal(
      <div
        className={`${styles.PopupMenu} ${className}`}
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        {actions.map(({ name, action, icon }) => {
          const Icon = Icons[icon as keyof typeof Icons];
          return (
            <button
              key={name}
              className={`${styles.PopupMenu__action} action-${name}`}
              onClick={action}
              onBlur={closeMenu}
            >
              {name}
              <Icon />
            </button>
          );
        })}
        <ButtonWithIcon
          className="close-btn"
          onClick={closeMenu}
          icon={'RiCloseLine'}
        />
      </div>,
      document.body,
    )
  );
}
