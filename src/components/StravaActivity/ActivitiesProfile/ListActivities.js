import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ListActivities = () => {
    const history = useHistory();
    const { currentUser } = useAuth()
    const [tasks, setTasks] = useState([]);

    const formatDateTime = (timestamp) => {
        const date = timestamp.toDate();
        const formattedDate = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return formattedDate;
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const userId = currentUser.uid;
                const querySnapshot = await getDocs(
                    query(collection(db, `users/${userId}/tasks`),
                        where("completed", "==", false),
                        where("activityType", "!=", "Non-Sport")));
                const dataArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const filteredActivities = dataArray.filter(task => task.activityType !== undefined && task.activityType !== "");

                setTasks(filteredActivities);

            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Handle error
            }
        };

        fetchTasks();
    }, []);

    const goToSyncPage = (/*activityId*/) => {
        history.push('/activities-sync')
    }

    return (
        <>
            <div>
                {tasks.map((task, index) => (
                    <div className="activity-items" key={index}>
                        <div className="activity-values">
                            {task.title}
                        </div>
                        <div className="activity-values">
                            {task.description}
                        </div>
                        <div className="activity-values">
                            {formatDateTime(task.createdAt)}
                        </div>
                        <div className="activity-values">
                            {task.isStravaActivitySynced ? 'Synced' : 'Not synced'}
                        </div>
                        <button
                            className="sync-button"
                            onClick={() => goToSyncPage(/*task.id*/)}
                            disabled={task.isStravaActivitySynced}
                        >
                            Sync
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ListActivities;