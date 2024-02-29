import "./index.css"
import Navbar from "./bars/Navbar"
import Sidebar from "./bars/Sidebar"
import TodoTasks from "./todo/TodoTasks"

export default function App() {

  return (
  <>
    <Navbar/>
    <Sidebar/>
    <TodoTasks/>
  </>
  )
}
