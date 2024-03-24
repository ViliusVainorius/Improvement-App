import { useState } from "react";
import ShowActivity from "./ShowActivity";

const MapStravaActivities = ({ activities, onTaskSelect }) => {

    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    // console.log(tasks)

    const handleTaskSelect = (activityId, activity) => {
        if (selectedTaskId === activityId) {
            setSelectedTaskId(null);
            setSelectedTask(null);
        } else {
            setSelectedTaskId(activityId);
            setSelectedTask(activity);
        }
    };

    const handleDeselect = () => {

        setSelectedTaskId(null);
        setSelectedTask(null);
    };

    const isSelected = (taskId) => {
        return selectedTaskId === taskId;
    };

    const handleSubmit = () => {
        if (selectedTaskId) {
            const confirmed = window.confirm('Are you sure you want to sync tasks?');
            if (confirmed) {
                onTaskSelect(selectedTaskId, selectedTask);
            }
        }
    };

    return (
        <>
            <div className="task-select">
                <div className="tasks-container">
                    {
                        activities != null &&
                        activities.map(activity => (
                            <div className={`tasks-list ${isSelected(activity.id) ? 'selected-task' : ''}`} key={activity.id}>
                                <ShowActivity key={activity.id} activity={activity} />
                                <button
                                    className="task-select-btn"
                                    onClick={() => handleTaskSelect(activity.id, activity)}
                                    disabled={isSelected(activity.id)}
                                >
                                    {isSelected(activity.id) ? 'Selected' : 'Select'}
                                </button>
                            </div>
                        ))
                    }
                </div>
                <p className="confirm-sync-p">
                    After selecting Strava activity press button "Sync activities" to finish task syncing with Strava
                </p>
                <div className="TaskSelect-btns">
                    <button className="select-task-submit-btn" onClick={handleSubmit} disabled={!selectedTaskId}>Sync activities</button>
                    <button className="select-task-submit-btn" onClick={handleDeselect}>Deselect any activity</button>
                </div>
                <p style={{ color: 'red', marginLeft: '50px', marginTop: '20px', fontSize: '18px' }}>
                    At least one task must be selected.
                </p>
            </div>
        </>
    );
}

export default MapStravaActivities;