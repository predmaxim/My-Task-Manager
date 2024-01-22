import {ButtonWithIcon} from 'components/ButtonWithIcon';
import {icons} from 'components/icons';
import {Modal} from 'components/Modal';
import React, {ChangeEvent, ReactNode, useCallback, useEffect, useMemo, useState} from 'react';
import {createPortal} from 'react-dom';
import {IconType} from 'react-icons';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {createNewProjectThunk} from 'store/asyncActions/createNewProjectThunk';
import {onActionModal} from 'utils/helpers';
import {ThunkDispatchType} from 'utils/types';
import {RootState} from '../../store';
import {setCurrentProjectThunk} from '../../store/asyncActions/setCurrentProjectThunk';
import {ProjectsReducerStateType} from '../../store/reducers/projectReducer';
import './CreateNewProject.scss';

export function CreateNewProject() {
  const dispatch: ThunkDispatchType = useDispatch();
  const [showNewProjectModal, setNewProjectModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [ProjectIcon, setProjectIcon] = useState<JSX.Element>();
  const [inputValue, setInputValue] = useState('');
  const [allIcons, setAllIcons] = useState<ReactNode[]>();
  const {projects}: ProjectsReducerStateType = useSelector((state: RootState) => state.projects);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onOkModal = () => {
    if (inputValue) {
      if (projects.some(el => el.name === inputValue)) {
        toast(`Project name "${inputValue}" is busy`);
      } else {
        dispatch(createNewProjectThunk(inputValue.trim(), ProjectIcon?.type.name));
        dispatch(setCurrentProjectThunk(inputValue.trim()));
        setNewProjectModal(false);
        setInputValue('');
        setProjectIcon(undefined);
        toast(`"${inputValue}" project was created`);
      }
    } else {
      toast('Field "Name" cannot be empty');
    }
  };

  const setIconOnClickHandler = useCallback((icon: React.JSX.Element) => {
    setProjectIcon(icon);
    onActionModal(setShowIconModal, false);
  }, []);

  const getIcon = useMemo(() => {
    return icons.map((Icon: IconType) => {
      return (
        <button
          key={Icon.name}
          className="iconsBox__btn"
          onClick={() => {
            setIconOnClickHandler(<Icon/>);
          }}
        >
          <Icon className="iconsBox__icon"/>
        </button>
      );
    });
  }, [setIconOnClickHandler]);

  const IconModal: React.JSX.Element = (
    <div className="iconsBox">
      {allIcons}
    </div>
  );

  const NewProjectForm: React.JSX.Element = (
    <div className="CreateNewProjectForm" id="CreateNewProjectForm">
      <div className="input-wrapper">
        <label htmlFor="CreateNewProjectForm__input" className="CreateNewProjectForm__label label">Project Name:</label>
        <input
          type="text"
          id="CreateNewProjectForm__input"
          className="CreateNewProjectForm__input input"
          placeholder="My Project"
          value={inputValue}
          onChange={onChangeInputHandler}
          autoFocus
        />
      </div>
      <ButtonWithIcon
        className="CreateNewProjectForm__selectIconBtn"
        icon={ProjectIcon?.type.name}
        text={!ProjectIcon ? 'Select Icon' : undefined}
        onClick={() => onActionModal(setShowIconModal, true)}
      />
    </div>
  );

  useEffect(() => {
    setAllIcons(getIcon);
  }, [getIcon]);

  return (
    <>
      <ButtonWithIcon
        className="CreateNewProject"
        icon="RiAddLine"
        text="New Project"
        onClick={() => onActionModal(setNewProjectModal, true)}
      />
      {showNewProjectModal && createPortal(
        <Modal
          className="CreateNewProject"
          isActive={true}
          onClose={() => onActionModal(setNewProjectModal, false)}
          onOk={onOkModal}
          header="Add New Project"
        >
          {NewProjectForm}
        </Modal>,
        document.body
      )}
      {showIconModal && createPortal(
        <Modal
          className="IconModal"
          isActive={true}
          onClose={() => onActionModal(setShowIconModal, false)}
          onOk={onOkModal}
          header="Select Icon"
          showActionBtns={false}
        >
          {IconModal}
        </Modal>,
        document.body
      )}
    </>
  );
}
