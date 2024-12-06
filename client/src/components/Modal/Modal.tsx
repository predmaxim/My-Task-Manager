import { RiCloseLine } from 'react-icons/ri';
import './Modal.scss';

export type ModalProps = {
  isActive: boolean,
  children: JSX.Element,
  onClose: () => void
}

export function Modal({ isActive, children, onClose }: ModalProps) {
  const activeClass = isActive ? 'active' : '';

  return (
    <div className="Modal">
      <div className="Modal__overlay" onClick={onClose} />
      <div className={`Modal__body  ${activeClass}`}>
        <RiCloseLine onClick={onClose} className="Modal__closeBtn" />
        <div className="Modal__content">
          {children}
        </div>
      </div>
    </div>
  );
};

