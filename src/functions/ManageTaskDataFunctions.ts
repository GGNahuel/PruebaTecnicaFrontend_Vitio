import { groupByState } from "../constants/TaskDataConstants";
import { GroupStateNames, TaskData, TaskType } from "../types/TaskTypes";


export function getTaskListNames(taskData: TaskData) : GroupStateNames[] {
  const listNames : GroupStateNames[] = Object.keys(taskData.tasks) as GroupStateNames[]

  return listNames
}


export function checkTaskAlreadyExists(taskData: TaskData, taskToCheck: string) : boolean {
  const allTasksNames = Object.values(taskData.tasks).map(taskGroup => taskGroup.listOfTasks).flat(1).map(task => task.title)

  return allTasksNames.includes(taskToCheck)
}


export function addTaskInData(taskData: TaskData, taskToAdd: TaskType) : TaskData {
  const temporalData: TaskData = JSON.parse(JSON.stringify(taskData))

  const group = groupByState(taskToAdd) as GroupStateNames
  temporalData.tasks[group].listOfTasks.push(taskToAdd)

  return temporalData
}


export function updateTaskInData(taskData: TaskData, taskToUpdate: TaskType, updatedTask: TaskType) : TaskData {
  const temporalData: TaskData = JSON.parse(JSON.stringify(taskData))

  if (!checkTaskAlreadyExists(temporalData, taskToUpdate.title)) {
    console.error("La tarea que se busca actualizar no se encuentra guardada")
    throw new Error("La tarea que se busca actualizar no se encuentra guardada")
  }

  const group = groupByState(taskToUpdate) as GroupStateNames
  const taskIndex = temporalData.tasks[group].listOfTasks.findIndex(task => task.title == taskToUpdate.title)
  
  if (taskToUpdate.state == updatedTask.state) {
    temporalData.tasks[group].listOfTasks[taskIndex] = updatedTask
  }
  else {
    const groupUpdated = groupByState(updatedTask) as GroupStateNames
    temporalData.tasks[group].listOfTasks.splice(taskIndex, 1)
    temporalData.tasks[groupUpdated].listOfTasks.push(updatedTask)
  }

  return temporalData
}


export function removeTaskFromData(taskData: TaskData, taskToDelete: TaskType) : TaskData {
  const temporalData: TaskData = JSON.parse(JSON.stringify(taskData))

  if (!checkTaskAlreadyExists(temporalData, taskToDelete.title)) {
    console.error("La tarea que se busca remover no se encuentra guardada")
    throw new Error("La tarea que se busca remover no se encuentra guardada")
  }

  const group = groupByState(taskToDelete) as GroupStateNames
  const taskIndex = temporalData.tasks[group].listOfTasks.findIndex(task => task.title == taskToDelete.title)

  temporalData.tasks[group].listOfTasks.splice(taskIndex, 1)

  return temporalData
}