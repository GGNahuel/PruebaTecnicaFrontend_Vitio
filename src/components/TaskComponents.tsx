import { TaskType } from "../types/TaskTypes";
import Button from "./Button";

export function TaskListComponent ({title, listOfTasks} : {title: string, listOfTasks: TaskType[]}) {
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
            listOfTasks.map((task) => <Task key={task.title} taskInfo={task}/>)
          }
        </tbody>
      </table>
    </details>
  )
}

function Task({taskInfo} : {taskInfo: TaskType}) {
  return (
    <tr className="even:bg-slate-100">
      <td className="border">{taskInfo.title}</td>
      <td className="border flex gap-4 justify-end">
        <Button>✅</Button>
        <Button>🚮</Button>
      </td>
    </tr>
  )
}