import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ListActivities = () => {
    const history = useHistory();
    const { userLoggedIn, currentUser } = useAuth()
    const [tasks, setTasks] = useState([]);

    const formatDateTime = (timestamp) => {
        const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
        const formattedDate = date.toISOString().replace(/T/, ' ').replace(/\..+/, ''); // Format the date
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

                //const selectedTaskObjects = dataArray.filter(task => task.isStravaActivitySynced === undefined || !task.isStravaActivitySynced);

                setTasks(dataArray);
                console.log(dataArray)
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