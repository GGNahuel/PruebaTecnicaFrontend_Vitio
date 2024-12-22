import Button from "./components/Button"

function App() {

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
        <details className="w-full border-2 rounded-xl p-4">
          <summary className="text-lg">Tareas pendientes</summary>
          <table className="w-full table-auto border-collapse mt-4">
            <thead className="bg-slate-200">
              <tr>
                <th className="border">Nombre de la tarea</th>
                <th className="border">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-slate-100">
                <td className="border">Alimentar al gato</td>
                <td className="border flex gap-4 justify-end">
                  <Button>✅</Button>
                  <Button>🚮</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </details>
      </main>
    </>
  )
}

export default App
