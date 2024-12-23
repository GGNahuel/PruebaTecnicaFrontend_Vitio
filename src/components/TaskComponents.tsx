import { useContext, useEffect, useRef, useState } from "react";
import { useRemoveTask, useSetCompletedTask } from "../hooks/useDataRequests";
import { TaskType } from "../types/TaskTypes";
import Button from "./Button";
import { ContextInterface, LocalStorageContext } from "../contexts/LocalStorageContext";
import Dialog from "./Dialog";
import TaskForm from "./TaskForm";
import { getTaskListNames } from "../functions/ManageTaskDataFunctions";

export function TaskListComponent ({title, listOfTasks} : {title: string, listOfTasks: TaskType[]}) {
  const [newList, setNewList] = useState<TaskType[] | undefined>()
  const {localStorageData} = useContext(LocalStorageContext) as ContextInterface

  const [selectedTaskToEdit, setTaskToEdit] = useState<TaskType>()
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleDialog = () => {
    if (!dialogRef.current) return
    if (dialogRef.current.open) dialogRef.current.close()
    else dialogRef.current.showModal()
  }
  const handleShowEditDialog = (task: TaskType) => {
    setTaskToEdit(task)
    handleDialog()
  }

  useEffect(() => {
    if (title == "Tareas pendientes" || title == "Tareas completadas") {
      const list = localStorageData.tasks[title].listOfTasks
    
      setNewList(list)
    }
  }, [localStorageData, title])

  return (
    <details className="w-full border-2 rounded-xl p-4">
      <summary className="text-lg">{title}</summary>
      <Dialog handleDialog={handleDialog} ref={dialogRef}
        headerChildren={
          <h2 className="text-2xl">Editar tarea</h2>
        } 
      >
        <TaskForm lists={getTaskListNames(localStorageData)} objective="update" selectedTask={selectedTaskToEdit} />
      </Dialog>
      <table className="w-full table-auto border-collapse mt-4">
        <thead className="bg-slate-200">
          <tr>
            <th className="border">Nombre de la tarea</th>
            <th className="border">Grupo</th>
            <th className="border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listOfTasks.length == 0 ?
            <tr>
              <td className="border" colSpan={3}>No hay tareas asignadas a esta lista</td>
            </tr> :
            newList?.map((task) => <Task key={task.title} task={task} setDialogProps={handleShowEditDialog}/>) ||
            listOfTasks.map((task) => <Task key={task.title} task={task} setDialogProps={handleShowEditDialog}/>)
          }
        </tbody>
      </table>
    </details>
  )
}

function Task({task, setDialogProps} : {task: TaskType, setDialogProps: (task: TaskType) => void}) {
  const {handleSetter} = useSetCompletedTask()
  const {handleRemove} = useRemoveTask()

  return (
    <tr className="even:bg-slate-100">
      <td className="border">{task.title}</td>
      <td className="border">{task.group != "" ? task.group : "Sin grupo asignado"}</td>
      <td className="border flex gap-4 justify-end flex-wrap">
        <Button onClick={() => setDialogProps(task)}>✍️</Button>
        <Button onClick={() => handleSetter(task)}>✅</Button>
        <Button onClick={() => handleRemove(task)}>🚮</Button>
      </td>
    </tr>
  )
}