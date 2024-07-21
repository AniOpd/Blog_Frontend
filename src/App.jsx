import Footer from "./component/Footer"
import Header from "./component/Header"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <div className="min-h-screen">
      <Header />
     <main>
     <Outlet />
     </main>
      <Footer />
    </div >
  )
}

export default App
