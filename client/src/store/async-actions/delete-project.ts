import axios from 'axios';
import {BASE_URL} from '@/utils/constants';
import {ThunkDispatchType} from '@/utils/types';

export const deleteProject = (projectName: string) => {
  return async (dispatch: ThunkDispatchType) => {
    try {
      dispatch(deleteProject(projectName));
      await axios.delete(`${BASE_URL}/api/projects/${projectName}`);

      // const projects: ProjectType[] = await axios.get(`${BASE_URL}/api/projects`);
      // dispatch(setProjects(projects));
    } catch (error) {
      console.log(`Delete Projects Error: ${error}`);
    }
  };
};
