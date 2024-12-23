import { useRef, useState } from "react";
import { TaskType } from "../types/TaskTypes";
import Dialog from "./Dialog";
import TaskForm from "./TaskForm";
import { TaskItem } from "./TaskItem";

export function TaskGroup ({title, listOfTasks} : {title: string, listOfTasks: TaskType[]}) {
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

  return (
    <details className="w-full border-2 rounded-xl p-4">
      <summary className="text-lg">{title}</summary>
      <Dialog handleDialog={handleDialog} ref={dialogRef}
        headerChildren={
          <h2 className="text-2xl">Editar tarea</h2>
        } 
      >
        <TaskForm objective="update" selectedTask={selectedTaskToEdit} />
      </Dialog>
      <table className="w-full table-auto border-collapse mt-4">
        <thead className="bg-sky-200">
          <tr>
            <th className="border">Nombre de la tarea</th>
            <th className="border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listOfTasks.length == 0 ?
            <tr>
              <td className="border" colSpan={3}>No hay tareas asignadas a esta lista</td>
            </tr> :
            listOfTasks.map((task) => <TaskItem key={task.title} task={task} setDialogProps={handleShowEditDialog} />)
          }
        </tbody>
      </table>
    </details>
  )
}
