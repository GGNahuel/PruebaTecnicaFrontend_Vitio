import { useContext } from "react";
import { groupByState } from "../constants/TaskDataConstants";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { checkTaskAlreadyExists, removeTaskFromData, updateTaskInData } from "../functions/ManageTaskDataFunctions";
import { GroupStateNames, TaskData, TaskType } from "../types/TaskTypes";

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
      const realGroup = groupByState(newTask) as GroupStateNames
      setLocalStorageData(prev => ({
        tasks: {
          ...prev.tasks,
          [realGroup]: {
            ...prev.tasks[realGroup],
            listOfTasks: [...prev.tasks[realGroup].listOfTasks, newTask]
          }
        }
      }))
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

    const updatedData: TaskData = updateTaskInData(localStorageData, task, updatedTask)

    setLocalStorageData(updatedData)
  }

  return {handleSetter}
}


export function useUpdateTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleUpdate = (ev: React.FormEvent<HTMLFormElement>, originalTask?: TaskType) => {
    ev.preventDefault()

    if (!originalTask) {
      console.error("No se ha seleccionado una tarea para editar")
      return
    }

    const formData = new FormData(ev.currentTarget)
    const group = formData.get("group") as string
    const title = formData.get("title") as string
    const state = formData.get("state") as "process" | "completed"
    
    const updatedTask : TaskType = { title, group, state }
    
    if (!checkTaskAlreadyExists(localStorageData, title)) {
      const updatedData: TaskData = updateTaskInData(localStorageData, originalTask, updatedTask)

      setLocalStorageData(updatedData)
      alert("✅ Se han realizado los cambios exitosamente")
    } else {
      alert("❗ Ya existe una tarea con el nuevo título que quiere añadir")
    }
  }

  return {handleUpdate}
}


export function useRemoveTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleRemove = (task: TaskType) => {
    const newData: TaskData = removeTaskFromData(localStorageData, task)

    setLocalStorageData(newData)
  }

  return {handleRemove}
}
