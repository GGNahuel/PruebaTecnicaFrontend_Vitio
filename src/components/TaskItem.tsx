import { useSetCompletedTask, useRemoveTask } from "../hooks/useDataRequests"
import { TaskType } from "../types/TaskTypes"
import Button from "./Button"
import { PencilIcon, CheckIcon, TrashCanIcon } from "./Icons"

export function TaskItem(
  {task, setDialogProps, isInStateGroup} : 
  {task: TaskType, setDialogProps: (task: TaskType) => void, isInStateGroup: boolean}
) {
  const {handleSetter} = useSetCompletedTask()
  const {handleRemove} = useRemoveTask()

  const classes = task.state == "completed" ? "bg-green-100 even:bg-green-200" : "even:bg-sky-100"

  return (
    <tr className={classes}>
      <td className="border">{task.title}</td>
      <td className="border">{task.group != "" ? task.group : "Sin grupo asignado"}</td>
      {(task.group != "" && !isInStateGroup) && <td className="border">
        {task.state == "completed" ? "Completada" : "Pendiente"}
      </td>}
      <td className="border flex gap-4 justify-center lg:justify-end flex-wrap">
        <Button onClick={() => setDialogProps(task)} variant="outlined" title="Editar tarea"><PencilIcon /></Button>
        <Button onClick={() => handleSetter(task)} variant="success" title="Completar tarea"><CheckIcon /></Button>
        <Button onClick={() => handleRemove(task)} variant="error" title="Eliminar tarea"><TrashCanIcon /></Button>
      </td>
    </tr>
  )
}