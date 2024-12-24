import { useRef, useState } from "react";
import Button from "./Button";
import { AddIcon, BackIcon, MenuIcon } from "./Icons";
import Dialog from "./Dialog";
import TaskForm from "./TaskForm";
import handleDialog from "../functions/handleDialog";

export function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const dialogRef = useRef(null)

  return (
    <header className="
      flex p-4 bg-sky-400 sticky top-0 z-10
      flex-row gap-4 justify-between sm:h-auto sm:w-full
      lg:flex-col lg:gap-24 lg:h-screen lg:w-80 lg:justify-start
    ">
      <h1 className="text-5xl">To-do app</h1>
      <div className={`
        absolute lg:static right-0 top-0 z-20
        pl-16 p-4 lg:p-0 h-screen lg:h-auto
        bg-slate-200 lg:bg-transparent
        flex-col gap-8 flex
        lg:translate-x-0 lg:transition-none transition transition-duration-300
        ${isMenuOpened ? 
          "translate-x-0" : 
          "translate-x-full"
        } 
      `}>
        <Button additionalClasses="lg:hidden w-min self-end aspect-square" onClick={() => setIsMenuOpened(prev => !prev)}><BackIcon /></Button>
        <label className="flex gap-4 cursor-pointer items-center">
          <Button rounded onClick={() => handleDialog(dialogRef)}><AddIcon /></Button>
          <h2 className="text-xl font-medium">Agregar tarea</h2>
          <Dialog ref={dialogRef} handleDialog={() => handleDialog(dialogRef)} headerChildren={<h2 className="text-xl font-medium">Agregar tarea</h2>}>
            <TaskForm objective="create" />
          </Dialog>
        </label>
        <nav>
          <ul className="flex flex-col gap-2">
            <li><a href="/" className="text-lg font-medium hover:font-bold">Inicio</a></li>
            <li><a href="" className="text-lg font-medium hover:font-bold">Mis grupos de tareas</a></li>
            <li><a href="" className="text-lg font-medium hover:font-bold">Tareas importantes</a></li>
            <li><a href="" className="text-lg font-medium hover:font-bold">Calendario de tareas</a></li>
          </ul>
        </nav>
      </div>
      <Button additionalClasses="lg:hidden aspect-square" onClick={() => setIsMenuOpened(prev => !prev)}><MenuIcon /></Button>
    </header>
  )
}