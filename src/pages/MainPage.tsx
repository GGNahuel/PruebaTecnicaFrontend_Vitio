import { useContext, useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import { TaskGroup } from "../components/TaskGroup";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { getTaskListNames } from "../functions/ManageTaskDataFunctions";
import Button from "../components/Button";
import { useResetData } from "../hooks/useDataRequests";
import { TaskGroupForm } from "../components/TaskGroupForm";

export default function MainPage() {
  const {localStorageData} = useContext(LocalStorageContext) as ContextInterface
  const {handleReset} = useResetData()
  
  const [groupNames, setGroupNames] = useState(getTaskListNames(localStorageData))
  useEffect(() => {
    setGroupNames(getTaskListNames(localStorageData))
  }, [localStorageData])

  return (
    <>
      <TaskForm lists={groupNames} objective="create"/>
      <TaskGroupForm />
      {groupNames.map(listName => <TaskGroup key={listName} title={listName} listOfTasks={localStorageData.tasks[listName].listOfTasks}/>)}
      <Button onClick={() => handleReset()} variant="error">Botón de pruebas: reiniciar datos</Button>
    </>
  )
}