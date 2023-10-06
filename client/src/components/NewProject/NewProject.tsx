import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import axios from "axios";
import { ButtonWithIcon } from "src/components/ButtonWithIcon";
import { Modal } from "src/components/Modal";
import { icons } from 'src/components/icons';
import { onActionModal } from "src/utils/helpers";
import { ProjectType } from "src/utils/types";
import { BASE_URL } from "src/utils/constants";
import './NewProject.scss';

export function NewProject() {
  const [showNewProjectModal, setNewProjectModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [ProjectIcon, setProjectIcon] = useState<JSX.Element>();
  const [newProject, setNewProject] = useState<ProjectType>();
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onOkModal = () => {
    const project: ProjectType = {
      name: inputValue,
      status: 'active',
      created: new Date(),
      icon: ProjectIcon?.type.name
    };
    setNewProject(project);
    setNewProjectModal(false);
  };

  const setIconOnClickHandler = useCallback((icon: JSX.Element) => {
    setProjectIcon(icon);
    onActionModal(setShowIconModal, false);
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
        <label htmlFor="NewProjectForm__input" className="NewProjectForm__label label">Project Name:</label>
        <input
          type="text"
          id="NewProjectForm__input"
          className="NewProjectForm__input input"
          placeholder="My Project"
          value={inputValue}
          onChange={onChangeInputHandler}
          onSubmit={onOkModal}
          autoFocus
        />
      </div>
      <button
        type="button"
        className="NewProjectForm__selectIconBtn button"
        onClick={() => onActionModal(setShowIconModal, true)}
      >
        {SetProjectIconBtn()}
      </button>
    </form>
  )


  const createNewProject = useCallback(async (project: ProjectType) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/projects`, project);
      console.log(data)
      setNewProject(data.project);

    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    newProject && createNewProject(newProject);
    newProject && navigate(`/project/${newProject.name}`);
  }, [createNewProject, navigate, newProject]);

  return (
    <>
      <ButtonWithIcon
        className="NewProject"
        icon="RiAddLine"
        text="New Project"
        onClick={() => onActionModal(setNewProjectModal, true)}
      />
      {showNewProjectModal && createPortal(
        <Modal
          className="NewProject"
          isActive={true}
          onClose={() => onActionModal(setNewProjectModal, false)}
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
          onClose={() => onActionModal(setShowIconModal, false)}
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
