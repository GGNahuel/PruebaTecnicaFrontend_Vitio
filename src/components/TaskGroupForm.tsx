/* import { useAddGroup } from "../hooks/TaskHooks";
import Button from "./Button";
import { AddIcon } from "./Icons";

export function TaskGroupForm() {
  const {handleCreate} = useAddGroup()

  return (
    <form 
      className="p-4 border-2 max-w-lg min-w-80 flex flex-col justify-between gap-4 align-center rounded-xl"
      onSubmit={(ev) => handleCreate(ev)}
    >
      <div className="flex gap-8">
        <label className="grow flex align-center">
          <input type="text" name="listName" className="w-full p-2 bg-slate-100 rounded-md" placeholder="Agregar grupo" required />
        </label>
        <Button type="submit" additionalClasses="aspect-square" rounded><AddIcon /></Button>
      </div>
    </form>
  )
} */