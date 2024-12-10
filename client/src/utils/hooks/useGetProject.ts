import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "src/utils/constants";
import { ProjectType } from "src/utils/types";
import { toast } from "react-toastify";

export type useGetTasksType = [projects?: ProjectType, isLoading?: boolean];

export default function useGetProject(projectName: string | undefined): useGetTasksType {
  const [project, setProject] = useState<ProjectType>()
  const [isLoading, setIsLoading] = useState(true);

  const getProject = useCallback(async () => {
    try {
      const { data }: {
        data: { project: ProjectType }
      } = await axios.get(`${BASE_URL}/api/projects/${projectName}`);

      setProject(data.project);
      setIsLoading(false);

    } catch (error) {
      toast(`Get Project Error: ${error}`);
    }
  }, [projectName]);

  useEffect(() => {
    return  () => {
      getProject();
    }
  }, [getProject]);

  return [project, isLoading];
}