import { useEffect, useState } from "react"
import "./index.css"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import TodoTasks from "./TodoTasks"

export default function App() {

  return (
  <>
    <Navbar/>
    <Sidebar/>
    <TodoTasks/>
  </>
  )
}
