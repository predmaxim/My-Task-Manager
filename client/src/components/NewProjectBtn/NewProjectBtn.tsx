import { useState } from "react";
import { ButtonWithIcon } from "../ButtonWithIcon";
import { Modal } from "../Modal";
import './NewProjectBtn.scss';
import { createPortal } from "react-dom";

export function NewProjectBtn() {
  const [showModal, setShowModal] = useState(false);

  const createNewProject = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const modalContent = (
    <>
      <p>Text TextText TextText TextTextTextText Text TextText</p>
    </>
  );

  return (
    <>
      <ButtonWithIcon
        className="NewProjectBtn"
        icon="RiAddLine"
        text="New Project"
        onClick={createNewProject}
      />
      {showModal && createPortal(
        <Modal
          isActive={true}
          onClose={onCloseModal}
          children={modalContent}
        />, document.body
      )}
    </>
  );
}
