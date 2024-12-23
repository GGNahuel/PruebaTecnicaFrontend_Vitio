import { useSetCompletedTask, useRemoveTask } from "../hooks/TaskHooks"
import { TaskType } from "../types/TaskTypes"
import Button from "./Button"
import { PencilIcon, CheckIcon, TrashCanIcon, CrossIcon } from "./Icons"

export function TaskItem(
  {task, setDialogProps} : 
  {task: TaskType, setDialogProps: (task: TaskType) => void}
) {
  const {handleSetter} = useSetCompletedTask()
  const {handleRemove} = useRemoveTask()

  const classes = task.state == "completed" ? "bg-green-100 even:bg-green-200" : "even:bg-sky-100"

  return (
    <tr className={classes}>
      <td className="border">{task.title}</td>
      <td className="border flex gap-4 justify-center lg:justify-end flex-wrap">
        <Button onClick={() => setDialogProps(task)} variant="outlined" title="Editar tarea"><PencilIcon /></Button>
        <Button 
          onClick={() => handleSetter(task)} 
          variant={task.state == "process" ? "success" : "normal"} 
          title={task.state == "process" ? "Completar tarea" : "Dejar como pendiente"}
        >
          {task.state == "process" ? <CheckIcon /> : <CrossIcon />}
        </Button>
        <Button onClick={() => handleRemove(task)} variant="error" title="Eliminar tarea"><TrashCanIcon /></Button>
      </td>
    </tr>
  )
}