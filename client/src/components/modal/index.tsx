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

  const activeClass = isActive ? 'active' : '';

  if (!isActive) {
    return;
  }

  return (
    createPortal(
      <div className={`${styles.Modal} ${className || ''}`}>
        <div className={`${styles.Modal__overlay} ${activeClass}`} onClick={onClose} />
        <div className={`${styles.Modal__body}  ${activeClass}`} style={{ maxWidth: width }}>
          <RiCloseLine onClick={onClose} className={styles.Modal__closeBtn} />
          <h5 className={styles.Modal__header}>{header}</h5>
          <div className={styles.Modal__content}>{children}</div>
          {showActionBtns &&
            <div className={styles.actions}>
              <button
                className={`${styles.Modal__okBtn} button`}
                onClick={onOk}
                form={formId}
                type="submit"
              >Ok
              </button>
              <button
                className={`${styles.Modal__cancelBtn} button`}
                onClick={onClose}
                type="button"
              >Cancel
              </button>
            </div>}
        </div>
      </div>,
      document.body,
    )
  );
}
