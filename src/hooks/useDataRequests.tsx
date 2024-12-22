import { useContext } from "react";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { TaskType } from "../types/TaskTypes";

export function useAddTask() {
  const {setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const addTask = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)
    const group = formData.get("group") as string
    const newTask : TaskType = {
      title: formData.get("title") as string,
      group,
      state: "process"
    }

    setLocalStorageData(prev => ({
      tasks: {
        ...prev.tasks,
        [group]: {
          ...prev.tasks[group],
          listOfTasks: [...prev.tasks[group].listOfTasks, newTask]
        }
        }
      }
    ))
  }

  return {addTask}
}