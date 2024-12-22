import { createContext, ReactNode, useEffect, useState } from "react";
import { TaskData } from "../types/TaskTypes";

export interface ContextInterface {
  localStorageData: TaskData,
  setLocalStorageData: React.Dispatch<React.SetStateAction<TaskData>>
}

const startData : TaskData = {
  tasks: {
    "Tareas pendientes": {
      listName: "Tareas pendientes",
      listOfTasks: []
    },
    "Tareas completadas": {
      listName: "Tareas completadas",
      listOfTasks: []
    }
  }
}

export const LocalStorageContext = createContext<ContextInterface | undefined>(undefined)

export function LocalStorageProvider({children} : {children:ReactNode}) {
  const [localStorageData, setLocalStorageData] = useState<TaskData>(() => {
    const storedData = localStorage.getItem("tasks")
    return storedData ? JSON.parse(storedData) : startData
  })

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(localStorageData))
  }, [localStorageData])

  return (
    <LocalStorageContext.Provider value={{localStorageData, setLocalStorageData}}>
      {children}
    </LocalStorageContext.Provider>
  )
}
