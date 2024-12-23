import { useContext, useEffect, useState } from "react"
import { DefaultData } from "../constants/TaskDataConstants"
import { LocalStorageContext, ContextInterface } from "../contexts/LocalStorageContext"
import { getTaskListNames } from "../functions/ManageTaskDataFunctions"


export function useGetGroups() {
  const {localStorageData} = useContext(LocalStorageContext) as ContextInterface
  const [groupNames, setGroupNames] = useState(getTaskListNames(localStorageData))
    
  useEffect(() => {
    setGroupNames(getTaskListNames(localStorageData))
  }, [localStorageData])

  return {groupNames}
}


export function useResetData() {
  const {setLocalStorageData} = useContext(LocalStorageContext) as ContextInterface

  const handleReset = () => setLocalStorageData(DefaultData)

  return {handleReset}
}