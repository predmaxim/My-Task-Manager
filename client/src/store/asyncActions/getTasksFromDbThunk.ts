import axios from 'axios';
import { Dispatch } from 'redux';
import { setLoadingTasks, setTasks } from 'store/reducers/taskReducer';
import { BASE_URL } from 'utils/constants';
import { TaskType } from '../../utils/types';

export const getTasksFromDbThunk = (projectName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingTasks(true));

      const { data }: {
        data: TaskType[]
      } = await axios.get(`${BASE_URL}/api/tasks/${projectName}`);

      dispatch(setTasks(data.sort((a, b) => new Date(a.created).getDate() - new Date(b.created).getDate())));

      dispatch(setLoadingTasks(false));
    } catch (error) {
      console.log(`Get Tasks Error: ${error}`);
    }
  };
};
