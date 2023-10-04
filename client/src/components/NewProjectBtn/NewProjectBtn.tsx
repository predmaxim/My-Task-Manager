import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { ButtonWithIcon } from "src/components/ButtonWithIcon";
import { Modal } from "src/components/Modal";
import { icons } from 'src/components/icons';
import { IconType } from "react-icons";
import { ProjectType } from "src/utils/types";
import './NewProjectBtn.scss';
import axios from "axios";

export function NewProjectBtn() {
  const [showNewProjectModal, setNewProjectModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [ProjectIcon, setProjectIcon] = useState<JSX.Element>();
  const [inputValue, setInputValue] = useState('');
  const [newProject, setNewProject] = useState<ProjectType>();

  const navigate = useNavigate();

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(() => e.target.value);
  };

  const onOkModal = () => {
    const project: ProjectType = {
      name: inputValue,
      status: 'active',
      created: new Date(),
      icon: ProjectIcon?.type.name
    };
    setNewProject(project);
    createNewProject(project);
    // navigate(`/tasks`);
  };

  const openModal = (fn: (value: React.SetStateAction<boolean>) => void) => {
    fn(true);
  };

  const onCloseModal = (fn: (value: React.SetStateAction<boolean>) => void) => {
    fn(false);
  };

  const setIconOnClickHandler = useCallback((icon: JSX.Element) => {
    setProjectIcon(icon);
    onCloseModal(setShowIconModal);
  }, []);

  const SetProjectIconBtn = () => {
    return (
      ProjectIcon
        ? ProjectIcon
        : <span className="NewProjectForm__text">Select Icon</span>
    );
  };

  const getIcon = useMemo(() => {
    return icons.map((Icon: IconType) => {
      return (
        <button
          key={Icon.name}
          className="iconsBox__btn"
          onClick={() => {
            const newIcon = <Icon />;
            setIconOnClickHandler(newIcon);
          }}
        >
          <Icon className="iconsBox__icon" />
        </button>
      );
    });
  }, [setIconOnClickHandler]);

  const iconModal = (
    <div className="iconsBox">
      {getIcon}
    </div>
  );

  const newProjectForm = (
    <form className="NewProjectForm" id="NewProjectForm">
      <div className="input-wrapper">
        <label htmlFor="NewProjectForm__input" className="NewProjectForm__label">Project Name:</label>
        <input
          type="text"
          id="NewProjectForm__input"
          className="NewProjectForm__input"
          placeholder="My Project"
          value={inputValue}
          onChange={onChangeInputHandler}
          onSubmit={onOkModal}
        />
      </div>
      <button
        type="button"
        className="NewProjectForm__selectIconBtn"
        onClick={() => openModal(setShowIconModal)}
      >
        {SetProjectIconBtn()}
      </button>
    </form>
  )


  const createNewProject = useCallback(async (project: ProjectType) => {
    try {
      const { data } = await axios.post(`${URL}/api/projects`, project);
      console.log(data)

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    newProject && createNewProject(newProject)
  }, [createNewProject, newProject])

  return (
    <>
      <ButtonWithIcon
        className="NewProjectBtn"
        icon="RiAddLine"
        text="New Project"
        onClick={() => openModal(setNewProjectModal)}
      />
      {showNewProjectModal && createPortal(
        <Modal
          className="NewProject"
          isActive={true}
          onClose={() => onCloseModal(setNewProjectModal)}
          onOk={onOkModal}
          children={newProjectForm}
          header="Add New Project"
        // formId="NewProjectForm"
        />,
        document.body
      )}
      {showIconModal && createPortal(
        <Modal
          className="iconModal"
          isActive={true}
          onClose={() => onCloseModal(setShowIconModal)}
          onOk={onOkModal}
          children={iconModal}
          header="Select Icon"
          showActionBtns={false}
        />,
        document.body
      )}
    </>
  );
}
