import axios from 'axios';
import {Dispatch} from 'redux';
import {createTaskAction, updateTaskAction} from '@/store/reducers/task-reducer';
import {BASE_URL} from '@/utils/constants';
import {ProjectType, TaskType} from '@/utils/types';
import {updateProjectAction, UpdateProjectsPayloadType} from '@/store/reducers/project-reducer';

export const createNewTask = (task: TaskType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(createTaskAction(task));
      const {data}: {
        data: {
          task: TaskType
        }
      } = await axios.post(`${BASE_URL}/api/tasks`, task);
      dispatch(updateTaskAction(data.task));

      const {data: project}:
        { data: ProjectType } = await axios.get(`${BASE_URL}/api/projects/${task.project}`);

      const {data: projectToUpdate}: { data: ProjectType } =
        await axios.patch(`${BASE_URL}/api/projects/${task.project}`, {
          tasks: project.tasks + 1
        });

      dispatch(updateProjectAction(projectToUpdate as UpdateProjectsPayloadType));

    } catch (error) {
      console.log(`Create Tasks Error: ${error}`);
    }
  };
};
