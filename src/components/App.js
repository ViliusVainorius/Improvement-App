import "../index.css"
import Navbar from "./bars/Navbar"
import Sidebar from "./bars/Sidebar"
import TodoTasks from "../todo/TodoTasks"
import LoginForm from "./auth/LoginForm/LoginForm"

export default function App() {

  return (
    <>
      <LoginForm />
      {/* <Navbar />
      <Sidebar />
      <TodoTasks /> */}
    </>
  )
}
