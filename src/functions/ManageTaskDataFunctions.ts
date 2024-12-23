import { actualGroup } from "../constants/TaskDataConstants";
import { GroupStateNames, TaskData, TaskType } from "../types/TaskTypes";

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


function updateTaskGroupsByState(taskData: TaskData) : TaskData {
  const temporalData : TaskData = taskData

  const inProcessTitles = new Set()
  const completedTitles = new Set()

  const inProcessTasks : TaskType[] = Object.values(temporalData.tasks).map(taskList => taskList.listOfTasks).flat(1).filter(task => {
    if (task.state != "process")
      return false
    if (inProcessTitles.has(task.title))
      return false
    
    inProcessTitles.add(task.title)
    return true
  })
  const completedTasks : TaskType[] = Object.values(temporalData.tasks).map(taskList => taskList.listOfTasks).flat(1).filter(task => {
    if (task.state != "completed")
      return false
    if (completedTitles.has(task.title))
      return false

    completedTitles.add(task.title)
    return true
  })

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

  if (taskToDelete.group != "") {
    const groupByState: GroupStateNames = taskToDelete.state == "process" ? "Tareas pendientes" : "Tareas completadas"
    const taskIndexInStateGroup = temporalData.tasks[groupByState].listOfTasks.findIndex(task => task.title == taskToDelete.title)

    temporalData.tasks[group].listOfTasks.splice(taskIndexInStateGroup, 1)
  }

  return temporalData
}