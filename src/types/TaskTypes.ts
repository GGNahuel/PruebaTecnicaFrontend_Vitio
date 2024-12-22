export type TaskData = {
  tasks: {
    "Tareas pendientes": TaskGroup,
    "Tareas completadas": TaskGroup,
  } & Record<string, TaskGroup>
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