import axios from 'axios';
import { Dispatch } from 'redux';
import { createTask } from 'store/reducers/taskReducer';
import { BASE_URL } from 'utils/constants';
import { TaskType } from 'utils/types';

export const createNewTaskThunk = (task: TaskType) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data }: {
        data: {
          task: TaskType
        }
      } = await axios.post(`${BASE_URL}/api/tasks`, task);
      dispatch(createTask(data.task));


      // dispatch(updateProject(data.task.project as UpdateProjectsPayloadType));

    } catch (error) {
      console.log(`Create Tasks Error: ${error}`);
    }
  };
};
