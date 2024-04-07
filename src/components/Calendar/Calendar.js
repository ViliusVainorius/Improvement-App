import Navbar from "../bars/Navbar"
import { useAuth } from '../../contexts/authContext';
import NotFound from "../NotFound";
import UpcomingEvents from "./CalendarTypes/UpcomingEvents";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import TaskCalendar from "./CalendarTypes/TaskCalendar";
import "./calendar.css";
import CalendarNavbar from "./CalendarNavbar";
import AppointmentsCalendar from "./CalendarTypes/AppointmentsCalendar";

const Calendar = () => {
    const { userLoggedIn, currentUser } = useAuth()
    const [tasks, setTasks] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedView, setSelectedView] = useState('upcomingEvents');
    const [shouldFetchTasks, setShouldFetchTasks] = useState(false);

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    const handleDataAdded = () => {
        setShouldFetchTasks(true);
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

                if (selectedTaskObjects != null || selectedTaskObjects != undefined)
                    setTasks(selectedTaskObjects);
                console.log(selectedTaskObjects)
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Handle error
            }
        };

        const fetchEvents = async () => {
            try {
                const currentTimestamp = Timestamp.now();
                const userId = currentUser.uid;

                const querySnapshot = await getDocs(
                    query(collection(db, `users/${userId}/events`),
                        where("startDate", ">", currentTimestamp)));

                const dataArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                if (dataArray != null || dataArray != undefined)
                    setEvents(dataArray);
                console.log(dataArray)
            } catch (error) {
                console.error('Error fetching tasks:', error);
                // Handle error
            }

        }

        fetchTasks();
        fetchEvents();

    }, [shouldFetchTasks]);

    return (
        <>
            {!userLoggedIn && <NotFound />}
            <Navbar />
            <CalendarNavbar onViewChange={handleViewChange} />
            <div className="calendar-div">
                {selectedView === 'upcomingEvents' && <UpcomingEvents events={events} />}
                {selectedView === 'activeTasks' && <TaskCalendar tasks={tasks} onDataAdded={handleDataAdded} />}
                {selectedView === 'appointmentCalendar' && <AppointmentsCalendar events={events} />}
            </div>
        </>
    );
}

export default Calendar;