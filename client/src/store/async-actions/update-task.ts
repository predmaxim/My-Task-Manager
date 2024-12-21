import axios from 'axios';
import {Dispatch} from 'redux';
import {BASE_URL} from '@/utils/constants';
import {TaskType} from '@/utils/types';
import {updateTaskAction} from '@/store/reducers/task-reducer';

export const updateTask = (task: TaskType) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(updateTaskAction(task));
      await axios.patch(`${BASE_URL}/api/tasks/${task.id}`, task);
    } catch (error) {
      console.log(`Update Tasks Error: ${error}`);
    }
  };
};
