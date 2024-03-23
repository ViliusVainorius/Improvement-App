import { Timestamp } from "firebase/firestore";

const ShowTask = ({ task }) => {
    const { id, title, description, createdAt, activityType } = task;

    let formattedCreatedAt = "";
    if (createdAt instanceof Timestamp) {
        formattedCreatedAt = new Date(createdAt.toDate()).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    } else if (createdAt instanceof Date) {
        formattedCreatedAt = createdAt.toLocaleString([], { dateStyle: 'short', timeStyle: 'short' });
    }

    return (
        <>
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
                    <strong>Activity Type: </strong> {activityType}
                </div>
            </div>
        </>
    );
}

export default ShowTask;