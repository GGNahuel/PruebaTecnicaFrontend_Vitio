import { createContext, ReactNode, useEffect, useState } from "react";
import { TaskData } from "../types/TaskTypes";

interface ContextInterface {
  localStorageData: TaskData,
  setLocalStorageData: React.Dispatch<React.SetStateAction<TaskData>>
}

const startData : TaskData = {
  tasks: {
    inProcess: {
      listName: "Tareas pendientes",
      listOfTasks: []
    },
    completed: {
      listName: "Tareas completadas",
      listOfTasks: []
    }
  }
}

export const LocalStorageContext = createContext<ContextInterface | undefined>(undefined)

export function LocalStorageProvider({children} : {children:ReactNode}) {
  const [localStorageData, setLocalStorageData] = useState<TaskData>(startData)

  useEffect(() => {
    const data = localStorage.getItem("tasks")

    if (!data) {
      localStorage.setItem("tasks", JSON.stringify(startData))
    } else {
      setLocalStorageData(JSON.parse(data))
    }
  }, [])

  return (
    <LocalStorageContext.Provider value={{localStorageData, setLocalStorageData}}>
      {children}
    </LocalStorageContext.Provider>
  )
}