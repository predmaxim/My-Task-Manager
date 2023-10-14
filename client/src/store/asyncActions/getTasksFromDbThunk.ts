import axios from 'axios';
import { Dispatch } from 'redux';
import { setLoadingTasks, setTasks, TaskWithTotalType } from 'store/reducers/taskReducer';
import { BASE_URL } from 'utils/constants';

export const getTasksFromDbThunk = (projectName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingTasks(true));

      const { data }: {
        data: TaskWithTotalType
      } = await axios.get(`${BASE_URL}/api/tasks/${projectName}`);

      dispatch(setTasks(data));

      dispatch(setLoadingTasks(false));
    } catch (error) {
      console.log(`Get Tasks Error: ${error}`);
    }
  };
};
