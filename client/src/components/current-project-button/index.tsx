import {ButtonWithIcon} from '@/components/button-with-iIcon';
import {useState} from 'react';
import {createPortal} from 'react-dom';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';
import {ProjectsReducerStateType} from '@/store/reducers/project-reducer';
import {onActionModal} from '@/utils/helpers';
import {Modal} from '@/components/modal';
import {ProjectList} from '@/components/project-list';
import './styles.scss';

export function CurrentProjectButton() {
  const {currentProject}: ProjectsReducerStateType = useSelector((state: RootState) => state.projects);
  const [showIconModal, setShowIconModal] = useState(false);

  const onClickCurrentProjectBtn = () => setShowIconModal(true);
  const onClickOnProjectBtn = () => setShowIconModal(false);

  return (
    <div className="CurrentProjectBtnWrap">
      <ButtonWithIcon
        className="CurrentProjectBtn"
        icon={currentProject ? currentProject?.icon : 'Loading...'}
        text={currentProject ? `${currentProject?.name}` : 'Loading...'}
        onClick={onClickCurrentProjectBtn}
      />
      {showIconModal && createPortal(
        <Modal
          className="CreateNewProject"
          isActive={true}
          onClose={() => onActionModal(setShowIconModal, false)}
          header="Select Project"
          showActionBtns={false}
        >
          <ProjectList isModalAction={onClickOnProjectBtn}/>
        </Modal>,
        document.body
      )}
    </div>
  );
}
