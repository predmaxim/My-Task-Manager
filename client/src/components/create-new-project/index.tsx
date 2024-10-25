import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { icons } from '@/components/icons';
import { Modal } from '@/components/modal';
import React, { ChangeEvent, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconType } from 'react-icons';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/lib/store';
import { useCreateProjectMutation, useSetCurrentProjectMutation } from '@/services/projects';
import './styles.module.scss';

export function CreateNewProject() {
  const [createProject] = useCreateProjectMutation();
  const [setCurrentProject] = useSetCurrentProjectMutation();
  const [showNewProjectModal, setNewProjectModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [ProjectIcon, setProjectIcon] = useState<React.JSX.Element>();
  const [inputValue, setInputValue] = useState('');
  const [allIcons, setAllIcons] = useState<ReactNode[]>();
  const { projects } = useAppSelector((state) => state.projects);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onOkModal = async () => {
    if (inputValue) {
      if (projects?.some((el) => el.name === inputValue)) {
        toast(`Project name "${inputValue}" is busy`);
      } else {
        await createProject({ name: inputValue.trim(), icon: ProjectIcon?.type.name });
        await setCurrentProject({ id: inputValue.trim(), current: true });
        setNewProjectModal(false);
        setInputValue('');
        setProjectIcon(undefined);
        toast(`"${inputValue}" project was created`);
      }
    } else {
      toast('Field "ID" cannot be empty');
    }
  };

  const setIconOnClickHandler = useCallback((icon: React.JSX.Element) => {
    setProjectIcon(icon);
    setShowIconModal(false);
  }, []);

  const getIcon = useMemo(() => {
    return icons.map((Icon: IconType) => {
      return (
        <button
          key={Icon.name}
          className="iconsBox__btn"
          onClick={() => {
            setIconOnClickHandler(<Icon />);
          }}
        >
          <Icon className="iconsBox__icon" />
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
        onClick={() => setShowIconModal(true)}
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
        onClick={() => setNewProjectModal(true)}
      />
      {showNewProjectModal && createPortal(
        <Modal
          className="CreateNewProject"
          isActive={true}
          onClose={() => setNewProjectModal(false)}
          onOk={onOkModal}
          header="Add New Project"
        >
          {NewProjectForm}
        </Modal>,
        document.body,
      )}
      {showIconModal && createPortal(
        <Modal
          className="IconModal"
          isActive={true}
          onClose={() => setShowIconModal(false)}
          onOk={onOkModal}
          header="Select Icon"
          showActionBtns={false}
        >
          {IconModal}
        </Modal>,
        document.body,
      )}
    </>
  );
}
