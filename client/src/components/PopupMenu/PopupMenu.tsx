import { MouseEvent } from 'react';
import { ButtonWithIcon } from '../ButtonWithIcon';
import './PopupMenu.scss';

export type PopupMenuAction = {
  name: string,
  action: (e: MouseEvent<HTMLButtonElement>) => void,
}

export type PopupMenuType = {
  className: string,
  actions: PopupMenuAction[],
  closeMenu: () => void
}

export function PopupMenu({ actions, className, closeMenu }: PopupMenuType) {
  return (
    <div className={`PopupMenu ${className}`} onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      {actions.map(({ name, action }: PopupMenuAction) => {
        return (
          <button
            key={name}
            className={`PopupMenu__action action-${name}`}
            onClick={action}
            onBlur={closeMenu}
          >
            {name}
          </button>
        );
      })}
      <ButtonWithIcon
        className={'close-btn'}
        onClick={closeMenu}
        icon={'RiCloseLine'}
      />
    </div>
  );
}
