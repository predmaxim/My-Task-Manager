import { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
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
  buttonClassName?: string;
  menuClassName?: string;
  menuItemClassName?: string;
  dangerMenuItemClassName?: string;
  icon?: 'RiMore2Line';
  onOpenChange?: (isOpen: boolean) => void;
  viewportPadding?: number;
};

export function ActionsMenu<TId extends EntityId>({
  id,
  actions,
  buttonClassName,
  menuClassName,
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

  const estimatedMenuHeight = useMemo(() => Math.max(44, actions.length * 44), [actions.length]);

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

    const closeMenu = () => {
      setIsOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    window.addEventListener('scroll', closeMenu, true);
    window.addEventListener('resize', closeMenu);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      window.removeEventListener('scroll', closeMenu, true);
      window.removeEventListener('resize', closeMenu);
    };
  }, [isOpen]);

  const updatePosition = (buttonRect: DOMRect) => {
    const menuWidth = 208;

    const left = Math.max(
      viewportPadding,
      Math.min(buttonRect.right - menuWidth, window.innerWidth - menuWidth - viewportPadding),
    );

    const openUp = buttonRect.bottom + estimatedMenuHeight > window.innerHeight - viewportPadding;
    const top = openUp
      ? Math.max(viewportPadding, buttonRect.top - estimatedMenuHeight - 4)
      : Math.min(window.innerHeight - estimatedMenuHeight - viewportPadding, buttonRect.bottom + 4);

    setPosition({ top, left });
  };

  const onClickTrigger = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    updatePosition(e.currentTarget.getBoundingClientRect());
    setIsOpen(prevState => !prevState);
  };

  const onMouseDownTrigger = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const onClickAction = async (action: ActionMenuItem<TId>) => {
    setIsOpen(false);
    await action.onSelect(id);
  };

  return (
    <>
      <div ref={triggerRef} className={styles.ActionsMenu__trigger}>
        <ButtonWithIcon
          className={`${styles.ActionsMenu__button} ${buttonClassName || ''}`}
          onClick={onClickTrigger}
          onMouseDown={onMouseDownTrigger}
          icon={icon}
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
        </div>,
        document.body,
      )}
    </>
  );
}
