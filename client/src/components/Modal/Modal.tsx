import { MouseEvent, ReactNode } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import './Modal.scss';

export type ModalProps = {
  className: string,
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
    width = '600px'
  }: ModalProps) {

  const activeClass = isActive ? 'active' : '';

  return (
    <div className={`Modal ${className}`}>
      <div className={`Modal__overlay ${activeClass}`} onClick={onClose} />
      <div className={`Modal__body  ${activeClass}`} style={{ maxWidth: width }}>
        <RiCloseLine onClick={onClose} className="Modal__closeBtn" />
        <h5 className="Modal__header">{header}</h5>
        <div className="Modal__content">{children}</div>
        {showActionBtns &&
          <div className="actions">
            <button
              className="Modal__okBtn button"
              onClick={onOk}
              form={formId}
              type="submit"
            >Ok
            </button>
            <button
              className="Modal__cancelBtn button"
              onClick={onClose}
              type="button"
            >Cancel
            </button>
          </div>}
      </div>
    </div>
  );
}
