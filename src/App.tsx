import { useState } from "react"
import NewTaskForm from "./components/NewTaskForm"
import { TaskListComponent } from "./components/TaskComponents"
import { LocalStorageProvider } from "./contexts/LocalStorageContext"
import { TaskType } from "./types/TaskTypes"

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
        <NewTaskForm lists={lists} />
        {lists.map(listName => <TaskListComponent key={listName} title={listName} listOfTasks={listOfTasks}/>)}
      </main>
    </LocalStorageProvider>
  )
}

export default App
