import { TodoItem } from "./TodoItem"

export function TodoList({ todos, completeTodo, deleteTodo }) {
  return (
    <ul className="list">
      {todos.length === 0 && "No Todos"}
      {todos.map(todo => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            completeTodo={completeTodo}
            deleteTodo={deleteTodo}
          />
        )
      })}
    </ul>
  )
}