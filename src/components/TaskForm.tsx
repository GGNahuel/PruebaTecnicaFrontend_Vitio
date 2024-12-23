import { useEffect, useState } from "react";
import { useAddTask, useUpdateTask } from "../hooks/TaskHooks";
import { TaskType } from "../types/TaskTypes";
import Button from "./Button";
import { AddIcon } from "./Icons";

export default function TaskForm({objective, selectedTask} : { objective: "create" | "update", selectedTask?: TaskType}) {
  const [formValues, setFormValues] = useState<TaskType>({
    title: selectedTask?.title || "",
    group: selectedTask?.group || "",
    state: selectedTask?.state || "process"
  })

  useEffect(() => {
    setFormValues({
      title: selectedTask?.title || "",
      group: selectedTask?.group || "",
      state: selectedTask?.state || "process"
    })
  }, [selectedTask])

  const {handleCreate} = useAddTask()
  const {handleUpdate} = useUpdateTask()

  return (
    <form 
      className="p-4 border-2 max-w-lg min-w-80 flex flex-col justify-between gap-4 align-center rounded-xl" 
      onSubmit={(ev) => objective == "create" ? handleCreate(ev) : handleUpdate(ev, selectedTask)}
    >
      <div className="flex gap-8">
        <label className="grow flex align-center">
          <input type="text" name="title" className="w-full p-2 bg-slate-100 rounded-md" placeholder="Agregar tarea" required 
            value={formValues.title} onChange={(ev) => setFormValues(prev => ({...prev, title: ev.target.value}))}
          />
        </label>
        <Button type="submit" additionalClasses="aspect-square" rounded><AddIcon /></Button>
      </div>
      <input type="hidden" name="group" value={formValues.group} />
      <input type="hidden" name="state" value={formValues.state} />
    </form>
  )
}