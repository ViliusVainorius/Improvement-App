import Navbar from "../bars/Navbar"
import { useAuth } from '../../contexts/authContext';
import NotFound from "../NotFound";
import UpcomingEvents from "./CalendarTypes/UpcomingEvents";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import TaskCalendar from "./CalendarTypes/TaskCalendar";
import "./calendar.css";
import CalendarNavbar from "./CalendarNavbar";

const Calendar = () => {
    const { userLoggedIn, currentUser } = useAuth()
    const [tasks, setTasks] = useState([]);
    const [selectedView, setSelectedView] = useState('upcomingEvents');

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const userId = currentUser.uid;

                const querySnapshot = await getDocs(
                    query(collection(db, `users/${userId}/tasks`),
                        where("completed", "==", false)));

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

    return (
        <>
            {!userLoggedIn && <NotFound />}
            <Navbar />
            <CalendarNavbar onViewChange={handleViewChange} />
            <div className="calendar-div">
                {selectedView === 'upcomingEvents' && <UpcomingEvents />}
                {selectedView === 'activeTasks' && <TaskCalendar tasks={tasks} />}
                {/* Add more conditional rendering for other calendar views */}
            </div>
        </>
    );
}

export default Calendar;