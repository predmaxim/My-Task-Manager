import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useParams } from 'react-router-dom';
import { Search } from 'src/components/Search';
import { Loading } from 'src/components/Loading';
import logoHorizontal from 'src/assets/img/logoHorizontal.svg';
import useGetProject from 'src/utils/hooks/useGetProject';
import { ButtonWithIcon } from 'src/components/ButtonWithIcon';
import { Modal } from 'src/components/Modal';
import { onActionModal } from 'src/utils/helpers';
import './Header.scss';
import { ProjectsPage } from 'src/pages';

export function Header() {
  const { name } = useParams();
  const [project, isLoading] = useGetProject(name);
  const [showIconModal, setShowIconModal] = useState(false);

  const onSClickProjectBtn = () => {
    setShowIconModal(true)
  };

  // TODO: select current project name

  return (
    <header className="Header">
      <div className="container">

        <Link to="/" className="Header_logoLink">
          <img src={logoHorizontal} className="Header__logoImg" alt="logo" />
        </Link>

        <Search className="Header__search" />

        {
          isLoading
            ? <Loading />
            : <div className="Header__ProjectBtnWrap">
              <ButtonWithIcon
                className="Header__ProjectBtn"
                icon={project?.icon}
                text={`${project?.name}`}
                onClick={onSClickProjectBtn}
              />
            </div>
        }
        {showIconModal && createPortal(
          <Modal
            className="NewProject"
            isActive={true}
            onClose={() => onActionModal(setShowIconModal, false)}
            children={<ProjectsPage />}
            header="Select Project"
            showActionBtns={false}
          />,
          document.body
        )}

      </div>
    </header >
  );
}
