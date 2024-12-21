import axios from 'axios';
import {Dispatch} from 'redux';
import {setLoadingCommentsAction} from '@/store/reducers/comment-reducer';
import {setProjectsAction} from '@/store/reducers/project-reducer';
import {BASE_URL} from '@/utils/constants';
import {ProjectType} from '@/utils/types';

export const getComments = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingCommentsAction(true));
      const {data}: {
        data: { projects: ProjectType[] }
      } = await axios.get(`${BASE_URL}/api/projects`);
      dispatch(setProjectsAction(data.projects));
      dispatch(setLoadingCommentsAction(false));

    } catch (error) {
      console.log(`Get Projects Error: ${error}`);
    }
  };
};
