import { useContext } from "react";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { addTaskInData, checkTaskAlreadyExists, removeTaskFromData, updateTaskInData } from "../functions/ManageTaskDataFunctions";
import { TaskData, TaskType } from "../types/TaskTypes";

export function useAddTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleCreate = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    
    const formData = new FormData(ev.currentTarget)
    const group = formData.get("group") as string
    const title = formData.get("title") as string
    const state = formData.get("state") as "process" | "completed"
    
    const newTask : TaskType = { title, group, state }
    
    if (!checkTaskAlreadyExists(localStorageData, title)) {
      const dataWithChanges = addTaskInData(localStorageData, newTask)
      setLocalStorageData(dataWithChanges)

      alert("✅ Tarea agregada con éxito")
    } else {
      alert("❗Ya existe una tarea con este título")
    }
  }

  return {handleCreate}
}


export function useSetCompletedTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleSetter = (task: TaskType) => {
    const updatedTask: TaskType = {
      ...task,
      state: task.state == "completed" ? "process" : "completed"
    }

    try {
      const updatedData: TaskData = updateTaskInData(localStorageData, task, updatedTask)
  
      setLocalStorageData(updatedData)
    } catch (error) {
      console.warn(error)
    }
  }

  return {handleSetter}
}


export function useUpdateTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleUpdate = (ev: React.FormEvent<HTMLFormElement>, originalTask: TaskType) => {
    ev.preventDefault()

    const formData = new FormData(ev.currentTarget)
    const group = formData.get("group") as string
    const title = formData.get("title") as string
    const state = formData.get("state") as "process" | "completed"
    
    const updatedTask : TaskType = { title, group, state }
    
    if (!checkTaskAlreadyExists(localStorageData, title)) {
      try {
        const updatedData: TaskData = updateTaskInData(localStorageData, originalTask, updatedTask)
  
        setLocalStorageData(updatedData)
        alert("✅ Se han realizado los cambios exitosamente")
      } catch (error) {
        console.warn(error)
      }
    } else {
      alert("❗ Ya existe una tarea con el nuevo título que quiere añadir")
    }
  }

  return {handleUpdate}
}


export function useRemoveTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleRemove = (task: TaskType) => {
    try {
      const newData: TaskData = removeTaskFromData(localStorageData, task)

      setLocalStorageData(newData)
    } catch (error) {
      console.warn(error)
    }
  }

  return {handleRemove}
}
