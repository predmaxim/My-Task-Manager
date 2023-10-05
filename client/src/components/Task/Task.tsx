import { useState } from 'react';
import { createPortal } from 'react-dom';
import { TaskType } from 'src/utils/types';
import { formatDate, onActionModal } from 'src/utils/helpers';
import { ButtonWithIcon } from 'src/components/ButtonWithIcon';
import { Modal } from 'src/components/Modal';
import { TaskContent } from 'src/components/TaskContent';
import './Task.scss';

export type TaskProps = {
  task: TaskType;
}

export function Task(task: TaskType) {
  const [showTaskModal, setShowTaskModal] = useState(false);
  const { done, name, due } = task;

  const onChangeTaskCheckBoxHandler = (task: TaskType) => {
    console.log('done');
    // task.status = task.status //!!!
  }

  const onClickEditBtn = () => {
    console.log(task.due);
  }

  const onOkModal = () => {

  };

  const onClickTaskHandler = () => {
    setShowTaskModal(true);
  };

  return (
    <>
      <div className="Task" onClick={onClickTaskHandler}>
        <div className="Task-header">
          <input
            className="Task__checkbox"
            type="checkbox"
            checked={!!done}
            onChange={() => onChangeTaskCheckBoxHandler(task)}
          />
          <div className="Task__name">{name}</div>
          <ButtonWithIcon
            className="Task__editBtn"
            onClick={onClickEditBtn}
            icon="RiPencilLine"
          />
        </div>
        {
          (!!due || !!done) &&
          <div className="Task-footer">
            {
              due &&
              <div className="Task__due">
                <div className="due">
                  <span className="due__title">due:</span>
                  <span className="due__date">
                    {formatDate(due, { year: 'numeric', month: 'numeric', day: 'numeric' })}
                  </span>
                </div>
              </div>
            }
            {
              done &&
              <div className="Task__done">
                <div className="done">
                  <span className="done__title">done:</span>
                  <span className="done__date">
                    {formatDate(done, { year: 'numeric', month: 'numeric', day: 'numeric' })}
                  </span>
                </div>
              </div>
            }
          </div>
        }
      </div>
      {
        showTaskModal &&
        createPortal(
          <Modal
            className="TaskContentModal"
            isActive={true}
            onClose={() => onActionModal(setShowTaskModal, false)}
            onOk={onOkModal}
            children={<TaskContent task={task} />}
            header="Add New Project"
          // formId="NewProjectForm"
          />,
          document.body
        )
      }

    </>
  );
}
