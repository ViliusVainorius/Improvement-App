import { useState } from "react"

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");
  const [description, setDescription] = useState("");
  const [dueDateTimeString, setDueDateTimeString] = useState("");
  const [activityType, setActivityType] = useState('');

  function handleSubmit(e) {
    e.preventDefault()

    if (newItem === "") return

    onSubmit({
      title: newItem,
      description: description,
      dueDateTimeString: dueDateTimeString,
      activityType: activityType,
    });

    setNewItem("");
    setDescription("");
    setDueDateTimeString("");
    setActivityType("");
  }

  const handleActivityTypeChange = (event) => {
    const selectedActivityType = event.target.value;

    setActivityType(selectedActivityType);
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <h2>Create a task!</h2>
      <div className="form-row">
        <label htmlFor="activityType">Activity type</label>
        <select id="activityType" onChange={handleActivityTypeChange}>
          <option defaultValue value="Non-Sport">Non-Sport</option>
          <option value="Walk">Walk</option>
          <option value="Run">Run</option>
          <option value="Ride">Ride</option>
          <option value="Swim">Swim</option>
          <option value="Hike">Hike</option>
          <option value="Workout">Workout</option>
          <option value="Yoga">Yoga</option>
        </select>
      </div>
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