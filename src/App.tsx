import { useState } from "react"
import Button from "./components/Button"
import { TaskListComponent } from "./components/TaskComponents"
import { TaskType } from "./types/TaskTypes"
import { LocalStorageProvider } from "./contexts/LocalStorageContext"

function App() {
  const [listOfTasks, setListOfTasks] = useState<TaskType[]>([])
  const [lists] = useState<string[]>(["Tareas pendientes", "Tareas completadas"])

  const addTask = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const formData = new FormData(ev.currentTarget)
    const newTask : TaskType = {
      title: formData.get("title") as string,
      group: formData.get("group") as string,
      state: "process"
    }

    setListOfTasks(prev => [...prev, newTask])
  }

  return (
    <LocalStorageProvider>
      <header className="flex flex-col gap-32 h-screen w-80 p-4 bg-slate-300">
        <h1 className="text-4xl">asd</h1>
        <nav></nav>
      </header>
      <main className="max-h-screen flex flex-col gap-8 p-4 w-full">
        <form className="p-4 border-2 max-w-96 flex flex-col justify-between gap-4 align-center rounded-xl" onSubmit={(ev) => addTask(ev)}>
          <div className="flex gap-8">
            <label className="grow flex align-center"><input type="text" name="title" className="w-full p-2" placeholder="Agregar tarea" required/></label>
            <Button type="submit" additionalClasses="aspect-square">+</Button>
          </div>
          <select name="group" required>
            <option value="">Seleccione la lista</option>
            {lists.map(listName => <option key={listName} value={listName}>{listName}</option>)}
          </select>
        </form>
        {lists.map(listName => <TaskListComponent key={listName} title={listName} listOfTasks={listOfTasks}/>)}
      </main>
    </LocalStorageProvider>
  )
}

export default App
