import axios from 'axios';
import {createProjectAction} from '@/store/reducers/project-reducer';
import {BASE_URL} from '@/utils/constants';
import {ProjectType, ThunkDispatchType} from '@/utils/types';

export const createNewProject = (projectName: string, icon: string) => {
  return async (dispatch: ThunkDispatchType) => {
    try {
      // dispatch(setLoadingProjects(true));

      const project: ProjectType = {
        name: projectName,
        status: 'active',
        created: new Date(), 
        icon: icon,
        current: false,
        tasks: 0
      };

      const {data: newProject}:
        { data: ProjectType } = await axios.post(`${BASE_URL}/api/projects`, project);
      dispatch(createProjectAction(newProject));

      // dispatch(setLoadingProjects(false));

    } catch (error) {
      console.log(`Get Projects Error: ${error}`);
    }
  };
};
