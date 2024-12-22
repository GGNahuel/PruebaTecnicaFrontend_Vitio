import { useContext } from "react";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { TaskData, TaskType } from "../types/TaskTypes";
import { checkTaskAlreadyExists, removeTaskFromData, updateTaskInData } from "../functions/ManageTaskDataFunctions";
import { actualGroup, DefaultData } from "../constants/TaskDataConstants";

export function useAddTask() {
  const {localStorageData, setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const addTask = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    
    const formData = new FormData(ev.currentTarget)
    const group = formData.get("group") as string
    const title = formData.get("title") as string
    const state = formData.get("state") as "process" | "completed"
    
    const newTask : TaskType = { title, group, state }
    
    if (!checkTaskAlreadyExists(localStorageData, title)) {
      const realGroup = actualGroup(newTask)
      setLocalStorageData(prev => ({
        tasks: {
          ...prev.tasks,
          [realGroup]: {
            ...prev.tasks[realGroup],
            listOfTasks: [...prev.tasks[realGroup].listOfTasks, newTask]
          }
        }
      }))
    } else {
      console.error("Ya existe una tarea con este título")
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
    } else {
      console.error("Ya existe una tarea con el nuevo título que quiere añadir")
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


export function useResetData() {
  const {setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleReset = () => setLocalStorageData(DefaultData)

  return {handleReset}
}