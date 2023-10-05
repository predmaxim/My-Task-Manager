import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BASE_URL, TASK_STATUSES } from "src/utils/constants";
import { TaskType, TasksFilteredByStatusType } from "src/utils/types";

export type useGetTasksType = [tasks?: TasksFilteredByStatusType, isLoading?: boolean];

export default function useGetTasks(): useGetTasksType {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<TasksFilteredByStatusType>();

  const getTasksData = useCallback(async () => {
    try {
      const { data }: {
        data: { tasks: TaskType[] }
      } = await axios.get(`${BASE_URL}/api/tasks`);

      const tasks = {
        queue: data.tasks.filter((task) => task.status === TASK_STATUSES.queue),
        development: data.tasks.filter((task) => task.status === TASK_STATUSES.development),
        done: data.tasks.filter((task) => task.status === TASK_STATUSES.done)
      }
      setTasks(tasks);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    return () => {
      getTasksData()
    }
  }, [getTasksData]);

  return [tasks, isLoading];
}