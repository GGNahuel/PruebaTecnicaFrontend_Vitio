import { TaskData, TaskType } from "../types/TaskTypes";

export function getTaskListNames(taskData: TaskData) : string[] {
  const listNames : string[] = Object.keys(taskData.tasks)

  return listNames
}

export function checkTaskAlreadyExists(taskData: TaskData, taskToCheck: string) : boolean {
  const allTasksNames = Object.values(taskData.tasks).map(taskList => taskList.listOfTasks).flat(1).map(task => task.title)

  return allTasksNames.includes(taskToCheck)
}

export function updateTaskInData(taskData: TaskData, taskToUpdate: TaskType, updatedTask: TaskType) : TaskData {
  const temporalData: TaskData = taskData

  if (!checkTaskAlreadyExists(temporalData, taskToUpdate.title)) {
    console.error("La tarea que se busca actualizar no se encuentra guardada")
  }

  const taskIndex = temporalData.tasks[taskToUpdate.group].listOfTasks.findIndex(task => task.title == taskToUpdate.title)

  if (taskToUpdate.group == updatedTask.group)
    temporalData.tasks[taskToUpdate.group].listOfTasks[taskIndex] = updatedTask
  else {
    const oldListOfTask = temporalData.tasks[taskToUpdate.group].listOfTasks

    temporalData.tasks[taskToUpdate.group].listOfTasks = oldListOfTask.slice(0, taskIndex).concat(oldListOfTask.slice(taskIndex +1))
    temporalData.tasks[updatedTask.group].listOfTasks.push(updatedTask)
  }

  return temporalData
}