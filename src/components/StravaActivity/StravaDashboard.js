import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { db } from '../../firebase/firebase';
import {
    getDocs,
    query,
    collection,
    where,
    doc,
    updateDoc
} from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import NotFound from '../NotFound';
import NoTasksComponent from './NoTasksComponent';
import TaskSelect from './TaskSelect/TaskSelect';
import StravaActivitySelect from './StravaActivitySelect/StravaActivitySelect';
import './TaskSelect/tasks.css';


const StravaDashboard = () => {

    const history = useHistory();

    const { userLoggedIn, currentUser } = useAuth()
    const [activities, setActivities] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [activityType, setActivityType] = useState(null);

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

                const selectedTaskObjects = dataArray.filter(task => task.isStravaActivitySynced === undefined || !task.isStravaActivitySynced);

                setTasks(selectedTaskObjects);
                console.log(selectedTaskObjects)
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Handle error
            }
        };

        fetchTasks();
    }, []);

    const handleTaskSelect = (selectedTaskId) => {

        console.log("Selected task id -", selectedTaskId);
        setSelectedTask(selectedTaskId)
        console.log("tasks - ", tasks)

        const selectedTaskObject = tasks.find(task => task.id === selectedTaskId);
        // console.log("selected taskk obbject - ", selectedTaskObject)

        setActivityType(selectedTaskObject.activityType);

        // console.log("activivty type - ", activityType);
    };

    const handleStravaTaskSync = async (selectedActivityId, selectedActivity) => {

        // console.log(selectedActivityId)
        // console.log(selectedActivity)

        try {
            const userId = currentUser.uid;
            const taskId = selectedTask;

            // console.log("user id - ", userId, " task id - ", taskId)

            await addActivity({ userId, taskId, stravaActivity: selectedActivity });

        } catch (error) {
            console.error("Error syncing Strava activity:", error);
        }

        window.location.reload();
    }

    async function addActivity({ userId, taskId, stravaActivity }) {
        try {
            const taskRef = doc(db, `users/${userId}/tasks`, taskId);
            await updateDoc(taskRef, {
                syncedStravaActivity: stravaActivity,
                isStravaActivitySynced: true
            });
            console.log("Data added to task successfully");
        } catch (error) {
            console.error("Error adding data to task:", error);
        }
    }

    return (
        <>
            {!userLoggedIn && <NotFound />}
            {tasks.length === 0 ? (
                <NoTasksComponent />
            ) : (
                <>
                    <TaskSelect tasks={tasks} onTaskSelect={handleTaskSelect} />
                    {selectedTask != null && <StravaActivitySelect activityType={activityType} selectedTaskId={selectedTask} onStravaActivitySelect={handleStravaTaskSync} />}
                </>
            )}
        </>

    );
}

export default StravaDashboard;