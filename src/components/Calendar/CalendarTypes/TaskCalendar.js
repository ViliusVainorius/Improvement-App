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
import { addDoc, collection, doc, Timestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { useAuth } from '../../../contexts/authContext';

const TaskCalendar = ({ tasks, onDataAdded }) => {
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

        //console.log("Mapped tasks:", mappedTasks);

        return mappedTasks;
    };

    const convertFirestoreTimestampToDate = (timestamp) => {
        const { seconds, nanoseconds } = timestamp;
        return new Date(seconds * 1000 + nanoseconds / 1000000);
    };

    const handleCommitChanges = ({ added, changed, deleted }) => {
        if (added) {
            //console.log('New appointment added:', added);

            setupObjectForAdd(added);
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

    const setupObjectForAdd = async (added) => {

        const transformedFields = {};

        if (added.title !== null && added.title !== undefined) {
            transformedFields.title = added.title;
        }
        else {
            transformedFields.title = "Unnamed task"
        }

        if (added.startDate) {
            transformedFields.createdAt = new Timestamp(added.startDate / 1000, 0);
        }

        if (added.endDate) {
            transformedFields.dueDateTime = new Timestamp(added.endDate / 1000, 0);
        }

        if (added.notes !== null && added.notes !== undefined) {
            transformedFields.description = added.notes;
        }
        else {
            transformedFields.description = "no description"
        }

        const firestoreObject = {
            title: transformedFields.title,
            description: transformedFields.description,
            createdAt: transformedFields.createdAt,
            dueDateTime: transformedFields.dueDateTime,
            completed: false,
        };

        //console.log(firestoreObject);
        const appointmentId = await pushDataToFirestore(firestoreObject);
    }

    const pushDataToFirestore = async (firestoreObject) => {
        const userId = currentUser.uid;

        try {
            const docRef = await addDoc(collection(db, `users/${userId}/tasks`), firestoreObject);

            console.log('Document written with ID:', docRef.id);

            onDataAdded();

            return docRef.id;
        } catch (error) {
            console.error('Error adding document:', error);
            throw error;
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
            <div className='events-titles-div'>
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