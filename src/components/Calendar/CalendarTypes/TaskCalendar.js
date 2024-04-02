import Paper from '@mui/material/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
    AppointmentTooltip,
    AppointmentForm,
    Toolbar,
    DateNavigator,
    TodayButton,
    ViewSwitcher,
} from '@devexpress/dx-react-scheduler-material-ui';
import { useEffect, useState } from 'react';
import { doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useAuth } from '../../../contexts/authContext';

const TaskCalendar = ({ tasks }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [appointments, setAppointments] = useState([]);
    const { userLoggedIn, currentUser } = useAuth();


    const schedulerData = [
        { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];

    useEffect(() => {
        if (tasks && tasks.length > 0) {
            // console.log(tasks)
            setAppointments(createCalendarData(tasks));
            // console.log("setApointments - ", appointments)
        }
    }, [tasks]);

    const createCalendarData = (tasks) => {
        const mappedTasks = tasks.map(task => ({
            id: task.id,
            title: task.title,
            note: task.description,
            startDate: convertFirestoreTimestampToDate(task.createdAt),
            endDate: convertFirestoreTimestampToDate(task.dueDateTime)
        }));

        console.log("Mapped tasks:", mappedTasks);

        return mappedTasks;
    };

    const convertFirestoreTimestampToDate = (timestamp) => {
        const { seconds, nanoseconds } = timestamp;
        return new Date(seconds * 1000 + nanoseconds / 1000000);
    };

    const handleCommitChanges = ({ added, changed, deleted }) => {
        if (added) {
        }
        if (changed) {
            for (let id in changed) {
                const updatedFields = changed[id];
                updateTasks(id, updatedFields);
            }
        }
        if (deleted !== undefined) {
        }
    };

    const updateTasks = async (id, updatedFields) => {
        const userId = currentUser.uid;
        const taskRef = doc(db, `users/${userId}/tasks`, id);

        const transformedFields = {};

        if (updatedFields.title !== null && updatedFields.title !== undefined) {
            transformedFields.title = updatedFields.title;
        }

        if (updatedFields.startDate) {
            transformedFields.createdAt = new Timestamp(updatedFields.startDate / 1000, 0);
        }

        if (updatedFields.endDate) {
            transformedFields.dueDateTime = new Timestamp(updatedFields.endDate / 1000, 0);
        }

        await updateDoc(taskRef, transformedFields);
        console.log("update - ", id, transformedFields)
    };

    // const calendarData = createCalendarData(tasks);
    // console.log("calendar data - ", calendarData);

    return (
        <>
            <div>
                <h1>Tasks calendar</h1>
                <h3>all created tasks that are not finished will be visible in the calendar</h3>
            </div>
            <Paper>
                <Scheduler
                    data={appointments}
                >
                    <ViewState
                        defaultCurrentDate={new Date()}
                    />
                    <MonthView
                        startDayHour={1}
                        endDayHour={24}
                    />
                    <WeekView
                        startDayHour={1}
                        endDayHour={24}
                    />
                    <WeekView
                        name="work-week"
                        displayName="Work Week"
                        excludedDays={[0, 6]}
                        startDayHour={9}
                        endDayHour={19}
                    />
                    <DayView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton />
                    <ViewSwitcher />
                    <Appointments />
                    <EditingState
                        onCommitChanges={handleCommitChanges}
                    />
                    <IntegratedEditing />
                    <AppointmentTooltip
                        showCloseButton
                        showOpenButton
                    />
                    <AppointmentForm
                    />
                </Scheduler>
            </Paper>
        </>
    );
}

export default TaskCalendar;