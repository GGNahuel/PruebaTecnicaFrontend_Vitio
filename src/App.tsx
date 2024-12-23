import { LocalStorageProvider } from "./contexts/LocalStorageContext"
import MainPage from "./pages/MainPage"

function App() {
  return (
    <LocalStorageProvider>
      <header className="
        flex p-4 bg-sky-400
        flex-row gap-4 justify-between sm:h-auto sm:w-full
        lg:flex-col lg:gap-32 lg:h-screen lg:w-80 lg:justify-start
      ">
        <h1 className="text-5xl">To-do app</h1>
        <nav></nav>
      </header>
      <main className="max-h-screen flex flex-col gap-8 p-4 w-full">
        <MainPage />
      </main>
    </LocalStorageProvider>
  )
}

export default App
