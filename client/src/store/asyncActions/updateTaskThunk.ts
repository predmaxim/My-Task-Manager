import axios from 'axios';
import { Dispatch } from 'redux';
import { BASE_URL } from 'utils/constants';
import { TaskType } from 'utils/types';
import { updateTask } from '../reducers/taskReducer';

export const updateTaskThunk = (task: TaskType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateTask(task));
      await axios.patch(`${BASE_URL}/api/tasks/${task._id}`, task);

    } catch (error) {
      console.log(`Update Tasks Error: ${error}`);
    }
  };
};
