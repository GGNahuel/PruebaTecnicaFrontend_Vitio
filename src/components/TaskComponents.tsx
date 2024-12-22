import { useContext, useEffect, useState } from "react";
import { useSetCompletedTask } from "../hooks/useDataRequests";
import { TaskType } from "../types/TaskTypes";
import Button from "./Button";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";

export function TaskListComponent ({title, listOfTasks} : {title: string, listOfTasks: TaskType[]}) {
  const [newList, setNewList] = useState<TaskType[] | undefined>()
  const {localStorageData} = useContext(LocalStorageContext) as ContextInterface

  useEffect(() => {
    if (title == "Tareas pendientes" || title == "Tareas completadas") {
      const list = localStorageData.tasks[title].listOfTasks
    
      setNewList(list)
    }
  }, [localStorageData, title])

  return (
    <details className="w-full border-2 rounded-xl p-4">
      <summary className="text-lg">{title}</summary>
      <table className="w-full table-auto border-collapse mt-4">
        <thead className="bg-slate-200">
          <tr>
            <th className="border">Nombre de la tarea</th>
            <th className="border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listOfTasks.length == 0 ?
            <tr>
              <td className="border" colSpan={2}>No hay tareas asignadas a esta lista</td>
            </tr> :
            newList?.map((task) => <Task key={task.title} taskInfo={task}/>) ||
            listOfTasks.map((task) => <Task key={task.title} taskInfo={task}/>)
          }
        </tbody>
      </table>
    </details>
  )
}

function Task({taskInfo} : {taskInfo: TaskType}) {
  const {handleSetter} = useSetCompletedTask()

  return (
    <tr className="even:bg-slate-100">
      <td className="border">{taskInfo.title}</td>
      <td className="border flex gap-4 justify-end">
        <Button onClick={() => handleSetter(taskInfo)}>✅</Button>
        <Button>🚮</Button>
      </td>
    </tr>
  )
}