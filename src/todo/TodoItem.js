export function TodoItem({ completed, id, title, description, dueDateTime, toggleTodo, deleteTodo }) {


  return (
    <li className="tasks" key={id}>
      <label>
        <input
          className="checkmark"
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        <div className="task-details">
          <div className="task-column">
            <span><strong>Title:</strong> {title}</span>
          </div>
          <div className="task-column">
            <span><strong>Description:</strong> {description}</span>
          </div>
          <div className="task-column">
            <strong>Due date:</strong> {new Date(dueDateTime).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
          </div>
        </div>
      </label>
      <button
        onClick={() => deleteTodo(id)}
        className="btn btn-danger"
      >
        Delete
      </button>
    </li>
  )
}