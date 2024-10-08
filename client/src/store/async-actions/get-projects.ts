import axios from 'axios';
import {Dispatch} from 'redux';
import {setLoadingProjectsAction, setProjectsAction} from '@/store/reducers/project-reducer';
import {BASE_URL} from '@/utils/constants';
import {ProjectType} from '@/utils/types';

export const getProjects = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(setLoadingProjectsAction(true));

      const {data}: {
        data: { projects: ProjectType[] }
      } = await axios.get(`${BASE_URL}/api/projects`);
      dispatch(setProjectsAction(data.projects));

      dispatch(setLoadingProjectsAction(false));

    } catch (error) {
      console.log(`Get Projects Error: ${error}`);
    }
  };
};
