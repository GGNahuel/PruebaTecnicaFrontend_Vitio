import { LocalStorageProvider } from "./contexts/LocalStorageContext"
import MainPage from "./pages/MainPage"

function App() {
  return (
    <LocalStorageProvider>
      <header className="flex flex-col gap-32 h-screen w-80 p-4 bg-slate-300">
        <h1 className="text-4xl">asd</h1>
        <nav></nav>
      </header>
      <main className="max-h-screen flex flex-col gap-8 p-4 w-full">
        <MainPage />
      </main>
    </LocalStorageProvider>
  )
}

export default App
