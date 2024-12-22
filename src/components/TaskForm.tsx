import { useState } from "react";
import { useAddTask, useUpdateTask } from "../hooks/useDataRequests";
import { TaskType } from "../types/TaskTypes";
import Button from "./Button";

export default function TaskForm({lists, objective, selectedTask} : {lists: string[], objective: "create" | "update", selectedTask?: TaskType}) {
  const [formValues, setFormValues] = useState<TaskType>({
    title: selectedTask?.title || "",
    group: selectedTask?.group || "Tareas pendientes",
    state: selectedTask?.state || "process"
  })

  const {addTask} = useAddTask()
  const {handleUpdate} = useUpdateTask()

  return (
    <form 
      className="p-4 border-2 max-w-96 flex flex-col justify-between gap-4 align-center rounded-xl" 
      onSubmit={(ev) => objective == "create" ? addTask(ev) : handleUpdate(ev, selectedTask)}
    >
      <div className="flex gap-8">
        <label className="grow flex align-center">
          <input type="text" name="title" className="w-full p-2" placeholder="Agregar tarea" required 
            value={formValues.title} onChange={(ev) => setFormValues(prev => ({...prev, title: ev.target.value}))}
          />
        </label>
        <Button type="submit" additionalClasses="aspect-square">+</Button>
      </div>
      <select name="group" onChange={(ev) => setFormValues(prev => ({...prev, group: ev.target.value}))}>
        <option value="">Seleccione un grupo de la lista</option>
        {lists.map(listName => <option key={listName} value={listName}>{listName}</option>)}
      </select>
      <input type="hidden" name="state" value={formValues.state} />
    </form>
  )
}