import { useContext } from "react";
// import Button from "../components/Button";
import TaskForm from "../components/TaskForm";
import { TaskGroup } from "../components/TaskGroup";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { useGetGroups/* , useResetData */ } from "../hooks/DataHooks";

export default function MainPage() {
  // const {handleReset} = useResetData()
  const {groupNames} = useGetGroups()
  const {localStorageData} = useContext(LocalStorageContext) as ContextInterface

  return (
    <>
      <TaskForm objective="create"/>
      {groupNames.map(listName => <TaskGroup key={listName} title={listName} listOfTasks={localStorageData.tasks[listName].listOfTasks}/>)}
      {/* <Button onClick={() => handleReset()} variant="error">Botón de pruebas: reiniciar datos</Button> */}
    </>
  )
}