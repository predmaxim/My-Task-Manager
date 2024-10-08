import axios from 'axios';
import {BASE_URL} from '@/utils/constants';
import {TaskType, ThunkDispatchType} from '@/utils/types';
import {deleteTaskAction} from '@/store/reducers/task-reducer';

export const deleteTask = (taskId: TaskType['id']) => {
  return async (dispatch: ThunkDispatchType) => {
    try {
      // dispatch(setLoadingTasks(true));

      dispatch(deleteTaskAction(taskId));
      await axios.delete(`${BASE_URL}/api/tasks/${taskId}`);

      // dispatch(setLoadingTasks(false));

    } catch (error) {
      console.log(`Delete Task Error: ${error}`);
    }
  };
};
