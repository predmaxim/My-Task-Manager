import axios from 'axios';
import { Dispatch } from 'redux';
import { createTask, updateTask } from 'store/reducers/taskReducer';
import { BASE_URL } from 'utils/constants';
import { ProjectType, TaskType } from 'utils/types';
import { updateProject, UpdateProjectsPayloadType } from '../reducers/projectReducer';

export const createNewTaskThunk = (task: TaskType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(createTask(task));
      const { data }: {
        data: {
          task: TaskType
        }
      } = await axios.post(`${BASE_URL}/api/tasks`, task);
      dispatch(updateTask(data.task));

      const { data: project }:
        { data: ProjectType } = await axios.get(`${BASE_URL}/api/projects/${task.project}`);

      const { data: projectToUpdate }: { data: ProjectType } =
        await axios.patch(`${BASE_URL}/api/projects/${task.project}`, {
          tasks: project.tasks + 1
        });

      dispatch(updateProject(projectToUpdate as UpdateProjectsPayloadType));

    } catch (error) {
      console.log(`Create Tasks Error: ${error}`);
    }
  };
};
