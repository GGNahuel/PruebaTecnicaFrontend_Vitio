export type TaskData = {
  tasks: {
    inProcess: TaskList,
    completed: TaskList
  }
}

type TaskList = {
  listName: string,
  listOfTasks: TaskType[]
}

export type TaskType = {
  title: string,
  state: "process" | "completed",
  group: string,
}