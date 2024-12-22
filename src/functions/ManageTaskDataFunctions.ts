import { actualGroup } from "../constants/TaskDataConstants";
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
  let temporalData: TaskData = JSON.parse(JSON.stringify(taskData))

  if (!checkTaskAlreadyExists(temporalData, taskToUpdate.title)) {
    console.error("La tarea que se busca actualizar no se encuentra guardada")
  }

  const group = actualGroup(taskToUpdate)
  const taskIndex = temporalData.tasks[group].listOfTasks.findIndex(task => task.title == taskToUpdate.title)

  if (taskToUpdate.group == updatedTask.group) {
    temporalData.tasks[group].listOfTasks[taskIndex] = updatedTask
  }
  else {
    temporalData.tasks[group].listOfTasks.splice(taskIndex, 1)
    temporalData.tasks[updatedTask.group].listOfTasks.push(updatedTask)
  }

  temporalData = updateTaskGroupsByState(temporalData)

  return temporalData
}

export function updateTaskGroupsByState(taskData: TaskData) : TaskData {
  const temporalData : TaskData = taskData

  const inProcessTasks : TaskType[] = Object.values(temporalData.tasks).map(taskList => taskList.listOfTasks).flat(1).filter(task => task.state == "process")
  const completedTasks : TaskType[] = Object.values(temporalData.tasks).map(taskList => taskList.listOfTasks).flat(1).filter(task => task.state == "completed")

  temporalData.tasks["Tareas pendientes"].listOfTasks = inProcessTasks
  temporalData.tasks["Tareas completadas"].listOfTasks = completedTasks

  return temporalData
}

export function removeTaskFromData(taskData: TaskData, taskToDelete: TaskType) : TaskData {
  const temporalData: TaskData = JSON.parse(JSON.stringify(taskData))

  if (!checkTaskAlreadyExists(temporalData, taskToDelete.title)) {
    console.error("La tarea que se busca actualizar no se encuentra guardada")
  }

  const group = actualGroup(taskToDelete)
  const taskIndex = temporalData.tasks[group].listOfTasks.findIndex(task => task.title == taskToDelete.title)

  temporalData.tasks[group].listOfTasks.splice(taskIndex, 1)

  return temporalData
}