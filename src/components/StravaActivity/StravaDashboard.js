import React, { useState, useEffect } from 'react';
import Navbar from '../bars/Navbar';
import { db } from '../../firebase/firebase';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { useAuth } from '../../contexts/authContext';
import NotFound from '../NotFound';
import TaskSelect from './TaskSelect/TaskSelect';
import StravaActivitySelect from './TaskSelect/StravaActivitySelect';
import './TaskSelect/tasks.css';

const StravaDashboard = () => {

    const { userLoggedIn, currentUser } = useAuth()
    const [activities, setActivities] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    // useEffect(() => {
    //     const fetchActivities = async () => {
    //         try {
    //             // Fetch activities using the stored access token
    //             const accessToken = localStorage.getItem('access_token');
    //             const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?type=${activityType}&per_page=20`, {
    //                 headers: {
    //                     'Authorization': `Bearer ${accessToken}`
    //                 }
    //             });

    //             const data = await response.json();
    //             setActivities(data);
    //             console.log(data)
    //         } catch (error) {
    //             console.error('Error fetching activities:', error);
    //             // Handle error
    //         }
    //     };

    //     fetchActivities();
    // }, []);

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
                setTasks(dataArray);
                console.log(dataArray)
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Handle error
            }
        };

        fetchTasks();
    }, []);

    const handleTaskSelect = (selectedTaskId) => {
        // Handle the selected tasks (e.g., save to state, perform some action)
        console.log("Selected tasks:", selectedTaskId);
        setSelectedTask(selectedTaskId)
    };

    return (
        <>
            {!userLoggedIn && <NotFound />}
            <div>
                <ul>
                    {activities.map(activity => (
                        <li key={activity.id}>{activity.name}</li>
                    ))}
                </ul>
            </div>
            <TaskSelect tasks={tasks} onTaskSelect={handleTaskSelect} />
            {selectedTask != null && <StravaActivitySelect />}
        </>

    );
}

export default StravaDashboard;