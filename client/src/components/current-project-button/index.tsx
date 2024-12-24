import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { RootState, useAppSelector } from '@/lib/store';
import { Modal } from '@/components/modal';
import { ProjectList } from '@/components/project-list';
import styles from './styles.module.scss';
import * as Icons from 'react-icons/ri';

export function CurrentProjectButton() {
  const currentProject = useAppSelector((state: RootState) => state.projects.currentProject);
  const user = useAppSelector((state: RootState) => state.auth.user);
  const [showIconModal, setShowIconModal] = useState(false);

  if (!currentProject || !user) {
    return;
  }

  const onClickCurrentProjectBtn = () => setShowIconModal(true);
  const onClickOnProjectBtn = () => setShowIconModal(false);

  return (
    <div className={styles.CurrentProjectBtnWrap}>
      <ButtonWithIcon
        className={styles.CurrentProjectBtn}
        icon={currentProject?.icon ? currentProject.icon as keyof typeof Icons : null}
        text={currentProject?.name}
        onClick={onClickCurrentProjectBtn}
      />
      {showIconModal && createPortal(
        <Modal
          className={styles.CreateNewProject}
          isActive={true}
          onClose={() => setShowIconModal(false)}
          header="Select Project"
          showActionBtns={false}
        >
          <ProjectList modalAction={onClickOnProjectBtn} />
        </Modal>,
        document.body,
      )}
    </div>
  );
}
