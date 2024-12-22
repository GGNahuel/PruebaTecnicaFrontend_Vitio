import { GroupNames, TaskData, TaskType } from "../types/TaskTypes";

export const DefaultData : TaskData = {
  tasks: {
    "Tareas pendientes": {
      listName: "Tareas pendientes",
      listOfTasks: []
    },
    "Tareas completadas": {
      listName: "Tareas completadas",
      listOfTasks: []
    }
  }
}

export const actualGroup = (task: TaskType) : GroupNames => {
  return task.group == "" ?
    task.state == "process" ? "Tareas pendientes" : "Tareas completadas" :
    task.group
}