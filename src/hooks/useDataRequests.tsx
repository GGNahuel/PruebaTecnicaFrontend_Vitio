import { useContext } from "react";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { TaskData, TaskType } from "../types/TaskTypes";
import { checkTaskAlreadyExists, removeTaskFromData, updateTaskInData } from "../functions/ManageTaskDataFunctions";
import DefaultData from "../constants/DefaultData";

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
      const actualGroup = group == "" ? "Tareas pendientes" : group
      setLocalStorageData(prev => ({
        tasks: {
          ...prev.tasks,
          [actualGroup]: {
            ...prev.tasks[actualGroup],
            listOfTasks: [...prev.tasks[actualGroup].listOfTasks, newTask]
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