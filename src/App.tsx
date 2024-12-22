import { useState } from "react"
import Button from "./components/Button"
import { TaskListComponent } from "./components/TaskComponents"
import { TaskType } from "./types/TaskTypes"

function App() {
  const [listOfTasks] = useState<TaskType[]>([])
  const [lists] = useState<string[]>(["Tareas pendientes", "Tareas completadas"])

  return (
    <>
      <header className="flex flex-col gap-32 h-screen w-80 p-4 bg-slate-300">
        <h1 className="text-4xl">asd</h1>
        <nav></nav>
      </header>
      <main className="max-h-screen flex flex-col gap-8 p-4 w-full">
        <form className="p-4 border-2 max-w-96 flex justify-between gap-4 align-center rounded-xl">
          <label className="grow flex align-center"><input type="text" className="w-full p-2" placeholder="Agregar tarea" /></label>

          <Button type="submit" additionalClasses="aspect-square">+</Button>
        </form>
        {lists.map(listName => <TaskListComponent title={listName} listOfTasks={listOfTasks}/>)}
      </main>
    </>
  )
}

export default App
