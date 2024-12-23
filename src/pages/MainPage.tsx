import { useContext } from "react";
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

  const lists = getTaskListNames(localStorageData)

  return (
    <>
      <TaskForm lists={lists} objective="create"/>
      <TaskGroupForm />
      {lists.map(listName => <TaskGroup key={listName} title={listName} listOfTasks={localStorageData.tasks[listName].listOfTasks}/>)}
      <Button onClick={() => handleReset()} variant="error">Botón de pruebas: reiniciar datos</Button>
    </>
  )
}