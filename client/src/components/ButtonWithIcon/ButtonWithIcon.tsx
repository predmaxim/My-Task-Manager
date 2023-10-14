import { icons } from 'components/icons';
import { MouseEvent } from 'react';
import './ButtonWithIcon.scss';

export type ButtonWithIconProps = {
  className: string,
  icon?: string,
  text?: string,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void,
  showActions?: boolean,
  actions?: {
    remove?: () => void,
    edit?: () => void
  }
}

export function ButtonWithIcon({ className, icon, text, onClick, showActions = false, actions }: ButtonWithIconProps) {
  const GenerateBtnIcon = (icon: string) => icons.filter((el) => el.name === icon)[0];

  const BtnIcon = GenerateBtnIcon(icon ? icon : '');
  const BtnIconRemove = GenerateBtnIcon('RiDeleteBin6Line');
  const BtnIconEdit = GenerateBtnIcon('RiPencilLine');

  return (
    <div className={`ButtonWithIconWrap`}>
      <button
        className={`ButtonWithIcon button ${className}`}
        onClick={onClick}>
        {icon
          && icon.toLowerCase() !== 'loading...'
          && <BtnIcon className="ButtonWithIcon__icon" />}
        {text && <span className="ButtonWithIcon__text">{text}</span>}
      </button>
      {showActions &&
        <div className="button__actions">
          <BtnIconRemove className="ButtonWithIcon__icon button" onClick={actions && actions.remove} />
          <BtnIconEdit className="ButtonWithIcon__icon button" onClick={actions && actions.edit} />
        </div>}
    </div>);
}
