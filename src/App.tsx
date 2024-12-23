import { Navbar } from "./components/Navbar"
import { LocalStorageProvider } from "./contexts/LocalStorageContext"
import MainPage from "./pages/MainPage"

function App() {
  return (
    <LocalStorageProvider>
      <Navbar />
      <main className="h-screen flex flex-col gap-8 p-4 w-full overflow-auto">
        <MainPage />
      </main>
    </LocalStorageProvider>
  )
}

export default App
