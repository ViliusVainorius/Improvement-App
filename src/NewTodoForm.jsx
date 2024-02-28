import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
    const [newItem, setNewItem] = useState("");
    const [description, setDescription] = useState("");
    const [dueDateTime, setDueDateTime] = useState("");

    function handleSubmit(e) {
        e.preventDefault()
    
        if (newItem === "") return

        onSubmit({
            title: newItem,
            description: description,
            dueDateTime: dueDateTime,
        });
    
        setNewItem("");
        setDescription("");
        setDueDateTime("");
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
        <label htmlFor="description">Description</label>
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
          value={dueDateTime}
          onChange={(e) => setDueDateTime(e.target.value)}
          type="datetime-local"
          id="dueDateTime"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}