import { ButtonWithIcon } from '@/components/button-with-iIcon';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { RootState, useAppSelector } from '@/lib/store';
import { Modal } from '@/components/modal';
import { ProjectList } from '@/components/project-list';
import styles from './styles.module.scss';

export function CurrentProjectButton() {
  const { currentProject } = useAppSelector((state: RootState) => state.projects);
  const [showIconModal, setShowIconModal] = useState(false);

  const onClickCurrentProjectBtn = () => setShowIconModal(true);
  const onClickOnProjectBtn = () => setShowIconModal(false);

  return (
    <div className={styles.CurrentProjectBtnWrap}>
      <ButtonWithIcon
        className={styles.CurrentProjectBtn}
        icon={currentProject ? currentProject?.icon : 'Loading...'}
        text={currentProject ? `${currentProject?.name}` : 'Loading...'}
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
          <ProjectList isModalAction={onClickOnProjectBtn} />
        </Modal>,
        document.body,
      )}
    </div>
  );
}
