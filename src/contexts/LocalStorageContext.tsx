import { createContext, ReactNode, useEffect, useState } from "react";
import { TaskData } from "../types/TaskTypes";
import { DefaultData } from "../constants/TaskDataConstants";

export interface ContextInterface {
  localStorageData: TaskData,
  setLocalStorageData: React.Dispatch<React.SetStateAction<TaskData>>
}

export const LocalStorageContext = createContext<ContextInterface | undefined>(undefined)

export function LocalStorageProvider({children} : {children:ReactNode}) {
  const [localStorageData, setLocalStorageData] = useState<TaskData>(() => {
    const storedData = localStorage.getItem("tasks")
    return storedData ? JSON.parse(storedData) : DefaultData
  })

  useEffect(() => {
    console.log("CONTEXT",localStorageData.tasks)
    localStorage.setItem("tasks", JSON.stringify(localStorageData))
  }, [localStorageData])

  return (
    <LocalStorageContext.Provider value={{localStorageData, setLocalStorageData}}>
      {children}
    </LocalStorageContext.Provider>
  )
}
