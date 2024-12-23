import { useEffect, useRef, useState } from "react";
import { TaskType } from "../types/TaskTypes";
import Dialog from "./Dialog";
import TaskForm from "./TaskForm";
import { TaskItem } from "./TaskItem";
import handleDialog from "../functions/handleDialog";
import { BackIcon } from "./Icons";

export function TaskGroup ({title, listOfTasks} : {title: string, listOfTasks: TaskType[]}) {
  const [opened, setOpened] = useState(false)
  const [selectedTaskToEdit, setTaskToEdit] = useState<TaskType>()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)

  const handleShowEditDialog = (task: TaskType) => {
    setTaskToEdit(task)
    handleDialog(dialogRef)
  }

  useEffect(() => {
    const detailsElement = detailsRef.current

    detailsElement?.addEventListener("toggle", () => setOpened(detailsElement.open))

    return () => {
      detailsElement?.removeEventListener('toggle', () => setOpened(detailsElement.open))
    }
  }, [])

  return (
    <details className="w-full border-2 rounded-xl p-4" ref={detailsRef}>
      <summary className="text-lg flex items-center justify-between">
        {title}
        <div className="flex gap-2 items-center">
          <div className="p-2 aspect-square bg-slate-200 rounded-full box-border">{listOfTasks.length}</div>
          <BackIcon rotate={opened ? -90 : 90} />
        </div>
      </summary>
      <Dialog handleDialog={() => handleDialog(dialogRef)} ref={dialogRef}
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