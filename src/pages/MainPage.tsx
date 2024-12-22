import { useContext } from "react";
import NewTaskForm from "../components/NewTaskForm";
import { TaskListComponent } from "../components/TaskComponents";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import { getTaskListNames } from "../functions/ManageTaskDataFunctions";

export default function MainPage() {
  const {localStorageData} = useContext(LocalStorageContext) as ContextInterface

  const lists = getTaskListNames(localStorageData)

  return (
    <>
      <NewTaskForm lists={lists} />
      {lists.map(listName => <TaskListComponent key={listName} title={listName} listOfTasks={localStorageData.tasks[listName].listOfTasks}/>)}
    </>
  )
}