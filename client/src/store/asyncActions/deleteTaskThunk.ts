import axios from 'axios';
import { BASE_URL } from 'utils/constants';
import { TaskType, ThunkDispatchType } from 'utils/types';
import { deleteTask } from '../reducers/taskReducer';

export const deleteTaskThunk = (taskId: TaskType['_id']) => {
  return async (dispatch: ThunkDispatchType) => {
    try {
      // dispatch(setLoadingTasks(true));

      dispatch(deleteTask(taskId));
      await axios.delete(`${BASE_URL}/api/tasks/${taskId}`);

      // dispatch(setLoadingTasks(false));

    } catch (error) {
      console.log(`Delete Task Error: ${error}`);
    }
  };
};
