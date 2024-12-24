import { useEffect, useRef, useState } from "react";
import { TaskType } from "../types/TaskTypes";
import Dialog from "./Dialog";
import TaskForm from "./TaskForm";
import { TaskItem } from "./TaskItem";
import handleDialog from "../functions/handleDialog";
import { BackIcon } from "./Icons";

import "./../detailsAnimationClasses.css";

export function TaskGroup ({title, listOfTasks} : {title: string, listOfTasks: TaskType[]}) {
  const [opened, setOpened] = useState(true)
  const [selectedTaskToEdit, setTaskToEdit] = useState<TaskType>()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const detailsRef = useRef<HTMLDetailsElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleShowEditDialog = (task: TaskType) => {
    setTaskToEdit(task)
    handleDialog(dialogRef)
  }

  useEffect(() => {
    const detailsElement = detailsRef.current

    const handleToggle = () => {
      const content = contentRef.current
      if (!content) return;

      if (detailsElement?.open) {
        content.classList.add("visible")
        content.classList.remove("hidden")
        const fullHeight = content.scrollHeight

        requestAnimationFrame(() => {
          content.style.height = `${fullHeight}px`
        });

        setOpened(true)
      } else {
        content.style.height = `${content.scrollHeight}px`

        requestAnimationFrame(() => {
          content.style.height = "0"
          content.classList.add("hidden")
          content.classList.remove("visible")
        });

        setOpened(false);
      }
    }

    detailsElement?.addEventListener("toggle", handleToggle)

    return () => {
      detailsElement?.removeEventListener('toggle', handleToggle)
    }
  }, [])

  return (
    <details className="w-full border-2 rounded-xl" ref={detailsRef} open>
      <summary className="text-xl flex items-center justify-between cursor-pointer p-4 hover:bg-slate-100">
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
      <div 
        ref={contentRef}
        className={`p-4 details-content visible`}
      >
        <table className="w-full table-auto border-collapse">
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
      </div>
    </details>
  )
}
