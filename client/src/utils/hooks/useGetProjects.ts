import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "src/utils/constants";
import { ProjectType } from "src/utils/types";
import { toast } from "react-toastify";

export type useGetTasksType = [projects?: ProjectType[], isLoading?: boolean];

export default function useGetProjects(): useGetTasksType {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const [isLoading, setIsLoading] = useState(true);


  const getProjects = useCallback(async () => {
    try {
      const { data }: {
        data: { projects: ProjectType[] }
      } = await axios.get(`${BASE_URL}/api/projects`);

      setProjects(data.projects);
      setIsLoading(false);

    } catch (error) {
      toast(`Get Projects Error: ${error}`);
    }
  }, []);

  useEffect(() => {
    return () => {
      getProjects();
    }
  }, [getProjects]);

  return [projects, isLoading];
}