import { useContext } from "react";
import NewTaskForm from "../components/NewTaskForm";
import { TaskListComponent } from "../components/TaskComponents";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { getTaskListNames } from "../functions/ManageTaskDataFunctions";
import Button from "../components/Button";
import { useResetData } from "../hooks/useDataRequests";

export default function MainPage() {
  const {localStorageData} = useContext(LocalStorageContext) as ContextInterface
  const {handleReset} = useResetData()

  const lists = getTaskListNames(localStorageData)

  return (
    <>
      <NewTaskForm lists={lists} />
      <Button onClick={() => handleReset()} additionalClasses="bg-red-100">Boton de desarrollo: reiniciar datos</Button>
      {lists.map(listName => <TaskListComponent key={listName} title={listName} listOfTasks={localStorageData.tasks[listName].listOfTasks}/>)}
    </>
  )
}