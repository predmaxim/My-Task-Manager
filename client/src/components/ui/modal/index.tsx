import { MouseEvent, ReactNode } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import styles from './modal.module.scss';
import { createPortal } from 'react-dom';

export type ModalProps = {
  className?: string,
  isActive: boolean,
  children: ReactNode,
  onClose: () => void,
  onOk?: (e: MouseEvent<HTMLButtonElement>) => void,
  header: string,
  formId?: string,
  showActionBtns?: boolean,
  width?: string,
}

export function Modal(
  {
    className,
    isActive,
    children,
    onOk,
    onClose,
    header,
    formId,
    showActionBtns = true,
    width = '600px',
  }: ModalProps) {

  const activeClass = isActive ? styles.active : '';

  if (!isActive) {
    return null;
  }

  return (
    createPortal(
      <div className={`${styles.Modal} ${className || ''}`}>
        <div className={`${styles.overlay} ${activeClass}`} onClick={onClose} />
        <div className={`${styles.body}  ${activeClass}`} style={{ maxWidth: width }}>
          <RiCloseLine onClick={onClose} className={styles.closeBtn} />
          <h5 className={styles.header}>{header}</h5>
          <div className={styles.content}>{children}</div>
          {showActionBtns &&
            <div className={styles.actions}>
              <button
                className={`${styles.cancelBtn}`}
                onClick={onClose}
                type="button"
              >
                Cancel
              </button>
              <button
                className={`${styles.okBtn}`}
                onClick={onOk}
                form={formId}
                type="submit"
              >
                Ok
              </button>
            </div>}
        </div>
      </div>,
      document.body,
    )
  );
}
