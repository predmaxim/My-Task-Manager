import { ButtonWithIcon } from '@/components/ui/button-with-iIcon';
import { Modal } from '@/components/ui/modal';
import * as Icons from 'react-icons/ri';
import React, { ChangeEvent, useState } from 'react';
import { IconType } from 'react-icons';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { useCreateProjectMutation } from '@/services/projects-service.ts';
import styles from './styles.module.scss';
import { setCurrentProject } from '@/lib/features/projects-slice';
import Input from '@/components/ui/input';

export function CreateNewProject() {
  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();
  const [createProject] = useCreateProjectMutation();

  const [showNewProjectModal, setNewProjectModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);
  const [ProjectIcon, setProjectIcon] = useState<React.JSX.Element>();
  const [inputValue, setInputValue] = useState('');
  const [iconPage, setIconPage] = useState(0);
  const iconsPerPage = 55;


  const icons = Object.values(Icons);

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onOkModal = async () => {
    const projectName = inputValue.trim();

    if (!projectName) {
      toast('Field "Name" cannot be empty');
      return;
    }

    if (projects?.find((project) => project.name === projectName)) {
      toast(`Project name "${projectName}" is busy`);
    } else {
      const { data: project } = await createProject({ name: projectName, icon: ProjectIcon?.type.name });
      if (project) {
        dispatch(setCurrentProject(project.id));
        setNewProjectModal(false);
        setInputValue('');
        setProjectIcon(undefined);
        toast(`"${projectName}" project was created`);
      }
    }
  };

  const setIconOnClickHandler = (icon: React.JSX.Element) => {
    setProjectIcon(icon);
    setShowIconModal(false);
  };

  return (
    <>
      <div className={styles.CreateNewProject}>
        <ButtonWithIcon
          className={styles.CreateNewProject__btn}
          icon="RiAddLine"
          text="New Project"
          onClick={() => setNewProjectModal(true)}
        />
      </div>
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
      <Modal
        className={styles.IconModal}
        isActive={showIconModal}
        onClose={() => setShowIconModal(false)}
        onOk={onOkModal}
        header="Select Icon"
        showActionBtns={false}
      >
        <div className={styles.iconsBox}>
          {icons.slice(iconPage * iconsPerPage, (iconPage + 1) * iconsPerPage).map((Icon: IconType) => {
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
        </div>
        <div className={styles.iconModal__nav}>
          {iconPage > 0 && <ButtonWithIcon
            className={styles.iconModal__prevBtn}
            icon="RiArrowLeftSLine"
            onClick={() => setIconPage((prev) => {
              return prev - 1 < 0 ? 0 : prev - 1;
            })}
          />}
          {icons.length > (iconPage + 1) * iconsPerPage && <ButtonWithIcon
            className={styles.iconModal__nextBtn}
            icon="RiArrowRightSLine"
            onClick={() => setIconPage((prev) => {
              const lastPage = icons.length / iconsPerPage - 1;
              return prev + 1 > lastPage ? lastPage : prev + 1;
            })}
          />}
        </div>
      </Modal>
    </>
  );
}
