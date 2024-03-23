import { useState } from "react";
import ShowTask from "./ShowTask";

const TaskSelect = ({ tasks, onTaskSelect }) => {
    const [selectedTask, setSelectedTask] = useState(null);
    // console.log(tasks)

    const handleTaskSelect = (taskId) => {
        if (selectedTask === taskId) {
            // If the clicked task is already selected, deselect it
            setSelectedTask(null);
        } else {
            // If a different task is clicked, select it and deselect any previously selected task
            setSelectedTask(taskId);
        }
    };

    const isSelected = (taskId) => {
        return selectedTask === taskId;
    };

    const handleSubmit = () => {
        if (selectedTask) {
            onTaskSelect([selectedTask]);
        }
    };

    return (
        <div className="task-select-container">
            <h1>Sync activities with Strava!</h1>
            <h3>Choose a task to sync up with Strava activity</h3>
            <div className="task-select">
                <div className="tasks-container">
                    {tasks.map(task => (
                        <div className={`tasks-list ${isSelected(task.id) ? 'selected-task' : ''}`} key={task.id}>
                            <ShowTask key={task.id} task={task} />
                            <button
                                className="task-select-btn"
                                onClick={() => handleTaskSelect(task.id)}
                                disabled={isSelected(task.id)}
                            >
                                {isSelected(task.id) ? 'Selected' : 'Select'}
                            </button>
                        </div>
                    ))}
                </div>
                <button className="select-task-submit-btn" onClick={handleSubmit} disabled={!selectedTask}>Confirm</button>
                <p style={{ color: 'red', marginLeft: '50px', marginTop: '20px', fontSize: '18px' }}>
                    At least one task must be selected.
                </p>
            </div>
        </div>
    );
}

export default TaskSelect;