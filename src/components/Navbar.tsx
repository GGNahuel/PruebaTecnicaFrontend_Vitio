import { useState } from "react";
import Button from "./Button";
import { AddIcon, BackIcon, MenuIcon } from "./Icons";

export function Navbar() {
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  return (
    <header className="
      flex p-4 bg-sky-400 sticky top-0
      flex-row gap-4 justify-between sm:h-auto sm:w-full
      lg:flex-col lg:gap-24 lg:h-screen lg:w-80 lg:justify-start
    ">
      <h1 className="text-5xl">To-do app</h1>
      <div className={`
        absolute lg:static right-0 top-0
        pl-16 p-4 lg:p-0 h-screen lg:h-auto
        bg-slate-200 lg:bg-transparent
        flex-col gap-8 lg:flex
        ${isMenuOpened ? 
          "flex" : 
          "hidden"
        } 
      `}>
        <Button additionalClasses="lg:hidden w-min self-end aspect-square" onClick={() => setIsMenuOpened(prev => !prev)}><BackIcon /></Button>
        <label className="flex gap-4 cursor-pointer">
          <Button rounded><AddIcon /></Button>
          <h2 className="text-xl font-medium">Agregar tarea</h2>
        </label>
        <nav>
          <ul className="flex flex-col gap-2">
            <li><a href="/" className="text-lg font-medium">Inicio</a></li>
            <li><a href="" className="text-lg font-medium">Mis listas</a></li>
            <li><a href="" className="text-lg font-medium">Tareas importantes</a></li>
            <li><a href="" className="text-lg font-medium">Calendario de tareas</a></li>
          </ul>
        </nav>
      </div>
      <Button additionalClasses="lg:hidden aspect-square" onClick={() => setIsMenuOpened(prev => !prev)}><MenuIcon /></Button>
    </header>
  )
}