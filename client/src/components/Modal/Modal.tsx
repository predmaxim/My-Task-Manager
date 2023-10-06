import { RiCloseLine } from 'react-icons/ri';
import './Modal.scss';

export type ModalProps = {
  className: string,
  isActive: boolean,
  children: JSX.Element,
  onClose: () => void,
  onOk?: () => void,
  header: string,
  formId?: string,
  showActionBtns?: boolean
}

export function Modal({ className, isActive, children, onOk, onClose, header, formId, showActionBtns = true }: ModalProps) {
  const activeClass = isActive ? 'active' : '';

  return (
    <div className={`Modal ${className}`}>
      <div className={`Modal__overlay ${activeClass}`} onClick={onClose} />
      <div className={`Modal__body  ${activeClass}`}>

        <RiCloseLine onClick={onClose} className="Modal__closeBtn" />

        <h5 className="Modal__header">{header}</h5>
        <div className="Modal__content">{children}</div>

        {
          showActionBtns &&
          <div className="actions">
            <button
              className="Modal__okBtn button"
              onClick={onOk}
              type="submit"
              form={formId}
            >Ok
            </button>
            <button
              className="Modal__cancelBtn button"
              onClick={onClose}
              type="button"
            >Cancel
            </button>
          </div>
        }

      </div>
    </div>
  );
};

