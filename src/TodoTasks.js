import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import { TodoList } from "./TodoList"

export default function TodoTasks() {
    const [todos, setTodos] = useState(() => {
      const localValue = localStorage.getItem("ITEMS")
      if(localValue == null) return []
  
      return JSON.parse(localValue)
    })
  
    useEffect(() => {
      localStorage.setItem("ITEMS", JSON.stringify(todos))
    }, [todos])
  
    function addTodo({title,  description, dueDateTime}) {
      setTodos(currentTodos => {
        return [
          ...currentTodos, 
          { 
            id: crypto.randomUUID(),
            title,
            description,
            dueDateTime,
            completed: false,
          },
        ]
      })
    }
  
    function toggleTodo(id, completed){
      setTodos(currentTodos => {
        return  currentTodos.map(todo => {
          if (todo.id === id){
            return { ...todo, completed }
          }
  
          return todo
        })
      })
    }
  
    function deleteTodo(id){
      setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id)
      })
    }
  
    return (
    <>
    <div className="todoTasks">
        <NewTodoForm onSubmit={addTodo} />
            <h1 className="header">Todo List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
    </div>
    </>
    )
  }