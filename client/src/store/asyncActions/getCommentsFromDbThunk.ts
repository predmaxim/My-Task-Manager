import axios from 'axios';
import { Dispatch } from 'redux';
import { setLoadingComments } from 'store/reducers/commentReducer';
import { setProjects } from 'store/reducers/projectReducer';
import { BASE_URL } from 'utils/constants';
import { ProjectType } from 'utils/types';

export const getCommentsFromDbThunk = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingComments(true));
      const { data }: {
        data: { projects: ProjectType[] }
      } = await axios.get(`${BASE_URL}/api/projects`);
      dispatch(setProjects(data.projects));
      dispatch(setLoadingComments(false));

    } catch (error) {
      console.log(`Get Projects Error: ${error}`);
    }
  };
};
