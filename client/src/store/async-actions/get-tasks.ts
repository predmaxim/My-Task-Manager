import axios from 'axios';
import {Dispatch} from 'redux';
import {setLoadingTasksAction, setTasksAction} from '@/store/reducers/task-reducer';
import {BASE_URL} from '@/utils/constants';
import {TaskType} from '@/utils/types';

export const getTasks = (projectName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingTasksAction(true));

      const {data}: {
        data: TaskType[]
      } = await axios.get(`${BASE_URL}/api/tasks/${projectName}`);

      dispatch(setTasksAction(data));

      dispatch(setLoadingTasksAction(false));
    } catch (error) {
      console.log(`Get Tasks Error: ${error}`);
    }
  };
};
