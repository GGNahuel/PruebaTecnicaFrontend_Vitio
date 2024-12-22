import { useContext } from "react";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { TaskData, TaskType } from "../types/TaskTypes";
import { checkTaskAlreadyExists, updateTaskInData } from "../functions/ManageTaskDataFunctions";

export function useAddTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const addTask = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)
    const group = formData.get("group") as string
    const title = formData.get("title") as string

    const newTask : TaskType = {
      title, group,
      state: "process"
    }

    if (!checkTaskAlreadyExists(localStorageData, title)) {   
      setLocalStorageData(prev => ({
        tasks: {
          ...prev.tasks,
          [group]: {
            ...prev.tasks[group],
            listOfTasks: [...prev.tasks[group].listOfTasks, newTask]
          }
        }
      }))
    } else {
      console.error("Ya existe una tarea con este nombre")
    }
  }

  return {addTask}
}

export function useSetCompletedTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleSetter = (task: TaskType) => {
    const updatedTask: TaskType = {
      ...task,
      state: "completed"
    }

    const updatedData: TaskData = updateTaskInData(localStorageData, task, updatedTask)

    setLocalStorageData(updatedData)
  }

  return {handleSetter}
}

export function useUpdateTask() {
  // const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleUpdate = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
  }

  return {handleUpdate}
}