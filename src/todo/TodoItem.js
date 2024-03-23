import { Timestamp } from "firebase/firestore";

export function TodoItem({ id, title, description, createdAt, activityType, dueDateTime, deleteTodo, completeTodo }) {

  let formattedDueDate = "";
  if (dueDateTime instanceof Timestamp) {
    formattedDueDate = new Date(dueDateTime.toDate()).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
  } else if (dueDateTime instanceof Date) {
    formattedDueDate = dueDateTime.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
  }

  let formattedCreatedAt = "";
  if (createdAt instanceof Timestamp) {
    formattedCreatedAt = new Date(createdAt.toDate()).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
  } else if (createdAt instanceof Date) {
    formattedCreatedAt = createdAt.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
  }

  return (
    <li className="tasks" key={id}>
      <label>
        <div className="task-details">
          <div className="task-column">
            <span><strong>Title:</strong> {title}</span>
          </div>
          <div className="task-column">
            <span><strong>Description:</strong> {description}</span>
          </div>
          <div className="task-column">
            <strong>Created date:</strong> {formattedCreatedAt}
          </div>
          <div className="task-column">
            <strong>Due date:</strong> {formattedDueDate}
          </div>
          <div className="task-column">
            <strong>Activity Type: </strong> {activityType}
          </div>
        </div>
      </label>

      <li>
        <button
          onClick={() => deleteTodo(id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </li>

      <li>
        <button
          onClick={() => completeTodo(id)}
          className="btn btn-danger"
        >
          Complete
        </button>
      </li>
    </li>
  )
}