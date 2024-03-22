import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateTimeString, setDueDateTimeString] = useState("");

  function handleSubmit(e) {
    e.preventDefault()

    if (newItem === "") return

    onSubmit({
      title: newItem,
      description: description,
      dueDateTimeString: dueDateTimeString,
    });

    setNewItem("");
    setDescription("");
    setDueDateTimeString("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <h2>Create a task!</h2>
      <div className="form-row">
        <label htmlFor="item">Title</label>
        <input
          required
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
        />
      </div>
      <div className="form-row">
        <label htmlFor="description" className="non-resizable-textarea">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          id="description"
        />
      </div>
      <div className="form-row">
        <label htmlFor="dueDateTime">Due Date and Time</label>
        <input
          required
          value={dueDateTimeString}
          onChange={(e) => setDueDateTimeString(e.target.value)}
          type="datetime-local"
          id="dueDateTime"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}