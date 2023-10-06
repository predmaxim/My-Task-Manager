import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL, TASK_STATUSES } from "src/utils/constants";
import { ProjectType, TaskType, TasksFilteredByStatusType } from "src/utils/types";

export type useGetTasksType = [tasks?: TasksFilteredByStatusType, isLoading?: boolean];

export default function useGetTasks(projectName: string | undefined): useGetTasksType {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TasksFilteredByStatusType>();

  const getTasksData = useCallback(async () => {
    try {
      // const { data: projectData }: {
      //   data: { project: ProjectType | undefined }
      // } = await axios.get(`${BASE_URL}/api/projects/${projectName}`);

      const { data: tasksData }: {
        data: { tasks: TaskType[] }
      } = await axios.get(`${BASE_URL}/api/tasks/${projectName}`);

      const tasks = {
        queue: tasksData.tasks.filter((task) => task.status === TASK_STATUSES.queue),
        development: tasksData.tasks.filter((task) => task.status === TASK_STATUSES.development),
        done: tasksData.tasks.filter((task) => task.status === TASK_STATUSES.done)
      };

      setTasks(tasks);
      setIsLoading(false);
    } catch (error) {
      toast(`Get Tasks Error: ${error}`);
    }
  }, [projectName]);

  useEffect(() => {
    return () => {
      getTasksData();
    }
  }, [getTasksData]);

  return [tasks, isLoading];
}