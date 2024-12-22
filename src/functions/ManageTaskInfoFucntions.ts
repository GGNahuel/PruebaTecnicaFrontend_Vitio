import { TaskData } from "../types/TaskTypes";

export function getTaskListNames(taskData: TaskData) : string[] {
  const listNames : string[] = Object.keys(taskData.tasks)

  return listNames
}

export function checkTaskAlreadyExists(taskData: TaskData, taskToCheck: string) : boolean {
  const allTasksNames = Object.values(taskData.tasks).map(taskList => taskList.listOfTasks).flat(1).map(task => task.title)

  return allTasksNames.includes(taskToCheck)
}