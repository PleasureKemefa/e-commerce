import Catalog from "./pages/Catalog"
import Header from "./components/layout/Header"
import { store } from "./app/store"

const App = () => {
  return (
    <div className="space-y-8">
      <Header />
      <Catalog />
    </div>
  )
}

export default App
