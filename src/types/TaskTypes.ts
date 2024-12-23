export type TaskData = {
  tasks: {
    "Tareas pendientes": TaskGroup,
    "Tareas completadas": TaskGroup,
  }
}

type TaskGroup = {
  listName: string,
  listOfTasks: TaskType[]
}

export type TaskType = {
  title: string,
  state: "process" | "completed",
  group: string,
}

export type GroupStateNames = "Tareas pendientes" | "Tareas completadas"