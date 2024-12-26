import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ButtonWithIcon } from '@/components/ui/button-with-iIcon';
import styles from './styles.module.scss';

type EntityId = number | string;

export type ActionMenuItem<TId extends EntityId> = {
  key: string;
  label: string;
  variant?: 'default' | 'danger';
  onSelect: (id: TId) => void | Promise<void>;
};

type ActionsMenuProps<TId extends EntityId> = {
  id: TId;
  actions: ActionMenuItem<TId>[];
  renderContent?: (args: { closeMenu: () => void; id: TId }) => ReactNode;
  buttonClassName?: string;
  menuClassName?: string;
  menuContentClassName?: string;
  menuItemClassName?: string;
  dangerMenuItemClassName?: string;
  icon?: 'RiMore2Line';
  onOpenChange?: (isOpen: boolean) => void;
  viewportPadding?: number;
};

export function ActionsMenu<TId extends EntityId>({
  id,
  actions,
  renderContent,
  buttonClassName,
  menuClassName,
  menuContentClassName,
  menuItemClassName,
  dangerMenuItemClassName,
  icon = 'RiMore2Line',
  onOpenChange,
  viewportPadding = 8,
}: ActionsMenuProps<TId>) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onClickOutside = (event: globalThis.MouseEvent) => {
      const targetNode = event.target as Node;
      const isInsideTrigger = triggerRef.current?.contains(targetNode);
      const isInsideMenu = menuRef.current?.contains(targetNode);

      if (!isInsideTrigger && !isInsideMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', onClickOutside);
    window.addEventListener('scroll', closeMenu, true);
    window.addEventListener('resize', closeMenu);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('scroll', closeMenu, true);
      window.removeEventListener('resize', closeMenu);
    };
  }, [closeMenu, isOpen]);

  const updatePosition = (buttonRect: DOMRect, menuHeight: number) => {
    const menuWidth = 208;

    const left = Math.max(
      viewportPadding,
      Math.min(buttonRect.right - menuWidth, window.innerWidth - menuWidth - viewportPadding),
    );

    const openUp = buttonRect.bottom + menuHeight > window.innerHeight - viewportPadding;
    const top = openUp
      ? Math.max(viewportPadding, buttonRect.top - menuHeight - 4)
      : Math.min(window.innerHeight - menuHeight - viewportPadding, buttonRect.bottom + 4);

    setPosition({ top, left });
  };

  const onClickTrigger = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updatePosition(e.currentTarget.getBoundingClientRect(), 220);
    setIsOpen(prevState => !prevState);
  };

  const onMouseDownTrigger = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const onClickAction = async (action: ActionMenuItem<TId>) => {
    closeMenu();
    await action.onSelect(id);
  };

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !menuRef.current) {
      return;
    }

    const triggerButton = triggerRef.current.querySelector('button');
    if (!triggerButton) {
      return;
    }

    const buttonRect = triggerButton.getBoundingClientRect();
    const menuHeight = menuRef.current.offsetHeight;
    updatePosition(buttonRect, menuHeight);
  }, [isOpen, actions.length, renderContent]);

  return (
    <>
      <div ref={triggerRef} className={styles.ActionsMenu__trigger}>
        <ButtonWithIcon
          className={`${styles.ActionsMenu__button} ${buttonClassName || ''}`}
          onClick={onClickTrigger}
          onMouseDown={onMouseDownTrigger}
          icon={icon}
          type="button"
        />
      </div>

      {isOpen && createPortal(
        <div
          ref={menuRef}
          className={`${styles.ActionsMenu__menu} ${menuClassName || ''}`}
          style={{ top: position.top, left: position.left }}
          onClick={(e) => e.stopPropagation()}
        >
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              className={`${styles.ActionsMenu__item} ${menuItemClassName || ''} ${action.variant === 'danger' ? `${styles.ActionsMenu__itemDanger} ${dangerMenuItemClassName || ''}` : ''}`}
              onClick={() => onClickAction(action)}
            >
              {action.label}
            </button>
          ))}
          {renderContent && (
            <div className={`${styles.ActionsMenu__content} ${menuContentClassName || ''}`}>
              {renderContent({ closeMenu, id })}
            </div>
          )}
        </div>,
        document.body,
      )}
    </>
  );
}
