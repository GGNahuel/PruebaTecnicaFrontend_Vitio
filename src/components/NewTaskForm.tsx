import Button from "./Button";

export default function NewTaskForm({lists} : {lists: string[]}) {
  return (
    <form className="p-4 border-2 max-w-96 flex flex-col justify-between gap-4 align-center rounded-xl">
      <div className="flex gap-8">
        <label className="grow flex align-center"><input type="text" name="title" className="w-full p-2" placeholder="Agregar tarea" required/></label>
        <Button type="submit" additionalClasses="aspect-square">+</Button>
      </div>
      <select name="group" required>
        <option value="">Seleccione la lista</option>
        {lists.map(listName => <option key={listName} value={listName}>{listName}</option>)}
      </select>
    </form>
  )
}