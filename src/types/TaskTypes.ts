export type TaskData = {
  tasks: Record<string, TaskList>
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