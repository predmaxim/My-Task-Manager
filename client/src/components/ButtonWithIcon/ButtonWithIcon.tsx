import React, {MouseEvent} from 'react';
import {icons} from 'components/icons';
import './ButtonWithIcon.scss';
import {IconType} from 'react-icons';

export type ButtonWithIconProps = {
  className: string;
  icon?: string;
  text?: string;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  showActions?: boolean;
  actions?: {
    remove?: () => void;
    edit?: () => void;
  };
};

const getIconByName = (iconName: string): IconType => icons.find((el) => el.name === iconName) || icons[0];

export function ButtonWithIcon({
                                 className,
                                 icon = '',
                                 text,
                                 onClick,
                                 showActions = false,
                                 actions = {}
                               }: ButtonWithIconProps) {
  const BtnIcon = getIconByName(icon);
  const BtnIconRemove = getIconByName('RiDeleteBin6Line');
  const BtnIconEdit = getIconByName('RiPencilLine');

  return (
    <div className="ButtonWithIconWrap">
      <button className={`ButtonWithIcon button ${className}`} onClick={onClick}>
        {icon && icon.toLowerCase() !== 'loading...' && <BtnIcon className="ButtonWithIcon__icon"/>}
        {text && <span className="ButtonWithIcon__text">{text}</span>}
      </button>
      {showActions && (
        <div className="button__actions">
          {actions.remove && (
            <BtnIconRemove className="ButtonWithIcon__icon button" onClick={actions.remove}/>
          )}
          {actions.edit && (
            <BtnIconEdit className="ButtonWithIcon__icon button" onClick={actions.edit}/>
          )}
        </div>
      )}
    </div>
  );
}
