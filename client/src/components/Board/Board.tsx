import { useNavigate, useParams } from 'react-router-dom';
import { TaskType } from 'src/utils/types';
import { ButtonWithIcon } from 'src/components/ButtonWithIcon';
import useGetTasks from 'src/utils/hooks/useGetTasks';
import { Loading } from 'src/components/Loading';
import { upperCaseFirstLetter } from 'src/utils/helpers';
import { Task } from 'src/components/Task';
import './Board.scss';

export function Board() {
  const navigate = useNavigate();

  const { name } = useParams();
  const [tasks, isLoading] = useGetTasks(name);

  const columnsProps = [
    {
      title: 'queue',
      onClickNewBtn: () => { console.log('new queue task') },
      tasks: tasks?.queue
    },
    {
      title: 'development',
      onClickNewBtn: () => { console.log('new development task') },
      tasks: tasks?.development
    },
    {
      title: 'done',
      onClickNewBtn: () => { console.log('new done task') },
      tasks: tasks?.done
    }
  ];

  return (
    isLoading
      ? <Loading />
      : <div className={`Board`}>
        {columnsProps.map(({ title, onClickNewBtn, tasks }) => {
          return (
            <div className={`column column-${title}`} key={title}>
              <div className="column__header">
                <div className="column__title">{upperCaseFirstLetter(title)}</div>
                <ButtonWithIcon
                  className="column__newTaskBtn"
                  onClick={onClickNewBtn}
                  icon="RiAddLine"
                  text="New Task"
                />
              </div>
              <div className="column__body">
                {tasks && tasks.map((task: TaskType) => <Task {...task} key={task._id} />)}
              </div>
            </div>
          )
        })}
      </div>
  );
}
