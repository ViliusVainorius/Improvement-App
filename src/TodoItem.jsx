export function TodoItem( { completed, id, title, description, dueDateTime, toggleTodo, deleteTodo }) {
    return (
        <li className="tasks" key={id}>
            <label>
              <input className="checkmark"
                type="checkbox"
                checked={completed}
                onChange={e => toggleTodo(id, e.target.checked)}
              />
              {title}
            </label>
            <div className="tasks">
                <span>{description}</span>
            </div>
            <div>
            <   strong>Due:</strong> {new Date(dueDateTime).toLocaleDateString()}
            </div>
            <button 
              onClick={() => deleteTodo(id)} 
              className="btn btn-danger"
              >
                Delete
            </button>
        </li>
    )
}