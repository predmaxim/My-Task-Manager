import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { Modal } from '@/components/modal';
import * as Icons from 'react-icons/ri';
import React, { ChangeEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { IconType } from 'react-icons';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useCreateProjectMutation } from '@/services/projects';
import styles from './styles.module.scss';
import { setCurrentProject } from '@/lib/features/projects-slice.ts';
import Input from '@/components/input';

export function CreateNewProject() {
  const dispatch = useAppDispatch();
  const [createProject] = useCreateProjectMutation();
  const { projects } = useAppSelector((state) => state.projects);
  const [showNewProjectModal, setNewProjectModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [ProjectIcon, setProjectIcon] = useState<React.JSX.Element>();
  const [inputValue, setInputValue] = useState('');
  const [iconPage, setIconPage] = useState(0);
  const iconsPerPage = 12;

  const icons = Object.values(Icons);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  const onOkModal = async () => {
    if (inputValue) {
      if (projects?.some((el) => el.name === inputValue)) {
        toast(`Project name "${inputValue}" is busy`);
      } else {
        const { data: project } = await createProject({ name: inputValue.trim(), icon: ProjectIcon?.type.name });
        if (project) {
          dispatch(setCurrentProject(project.id));
          setNewProjectModal(false);
          setInputValue('');
          setProjectIcon(undefined);
          toast(`"${inputValue}" project was created`);
        }
      }
    } else {
      toast('Field "ID" cannot be empty');
    }
  };

  const setIconOnClickHandler = (icon: React.JSX.Element) => {
    setProjectIcon(icon);
    setShowIconModal(false);
  };

  const IconModal = ({ page }: { page: number }) => (
    <div className={styles.iconsBox}>
      {icons.slice(page * iconsPerPage, iconsPerPage).map((Icon: IconType) => {
        return (
          <button
            key={Icon.name}
            className={styles.iconsBox__btn}
            onClick={() => {
              setIconOnClickHandler(<Icon />);
            }}
          >
            <Icon className={styles.iconsBox__icon} />
          </button>
        );
      })}
    </div>);

  return (
    <>
      <ButtonWithIcon
        className={styles.CreateNewProject}
        icon="RiAddLine"
        text="New Project"
        onClick={() => setNewProjectModal(true)}
      />
      <Modal
        isActive={showNewProjectModal}
        onClose={() => setNewProjectModal(false)}
        onOk={onOkModal}
        header="Add New Project"
      >
        <div className={styles.CreateNewProjectForm} id="CreateNewProjectForm">
          <div className={styles['input-wrapper']}>
            <Input
              label="Project Name:"
              name="My Project"
              type="text"
              id="CreateNewProjectForm__input"
              className={`${styles.CreateNewProjectForm__input} ${styles.input}`}
              value={inputValue}
              onChange={onChangeInputHandler}
              autoFocus
            />
          </div>
          <ButtonWithIcon
            className={styles.CreateNewProjectForm__selectIconBtn}
            icon={ProjectIcon?.type.name}
            text={!ProjectIcon ? 'Select Icon' : undefined}
            onClick={() => setShowIconModal(true)}
          />
        </div>
      </Modal>
      {showIconModal && createPortal(
        <Modal
          className={styles.IconModal}
          isActive={true}
          onClose={() => setShowIconModal(false)}
          onOk={onOkModal}
          header="Select Icon"
          showActionBtns={false}
        >
          <IconModal page={iconPage} />
          <div>
            <ButtonWithIcon
              className={styles.IconModal__prevBtn}
              icon="RiArrowLeftSLine"
              onClick={() => setIconPage((prev) => prev - 1)}
              showActions={iconPage > 0}
            />
            <ButtonWithIcon
              className={styles.IconModal__nextBtn}
              icon="RiArrowRightSLine"
              onClick={() => setIconPage((prev) => prev + 1)}
              showActions={icons.length > (iconPage + 1) * iconsPerPage}
            />
          </div>
        </Modal>,
        document.body,
      )}
    </>
  );
}
