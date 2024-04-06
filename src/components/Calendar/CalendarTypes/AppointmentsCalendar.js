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
import { TextField } from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';


const AppointmentsCalendar = ({ events }) => {
    const { userLoggedIn, currentUser } = useAuth();
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        if (events && events.length > 0) {
            console.log(events)
            setAppointments(createCalendarData(events));
            // console.log("setApointments - ", appointments)
        }
    }, [events]);

    const createCalendarData = (tasks) => {

        const mappedTasks = tasks.map(task => ({
            id: task.id,
            title: task.title,
            note: task.location,
            startDate: convertFirestoreTimestampToDate(task.startDate),
            endDate: convertFirestoreTimestampToDate(task.endDate)
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
            // for (let id in changed) {
            //     const updatedFields = changed[id];
            //     updateTasks(id, updatedFields);
            // }
            alert("editing is not allowed yet.")
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
            alert("Event title is required.");
            return 0;
        }

        if (added.startDate) {
            transformedFields.startDate = new Timestamp(added.startDate / 1000, 0);
        }

        if (added.endDate) {
            transformedFields.endDate = new Timestamp(added.endDate / 1000, 0);
        }

        if (added.notes !== null && added.notes !== undefined) {
            transformedFields.location = added.notes;
        }
        else {
            transformedFields.location = "no location provided"
        }

        const firestoreObject = {
            title: transformedFields.title,
            startDate: transformedFields.startDate,
            endDate: transformedFields.endDate,
            location: transformedFields.location,
        };

        //console.log(firestoreObject);
        const appointmentId = await pushDataToFirestore(firestoreObject);
    }

    const pushDataToFirestore = async (firestoreObject) => {
        const userId = currentUser.uid;

        try {
            const docRef = await addDoc(collection(db, `users/${userId}/events`), firestoreObject)
            console.log('Document written with ID:', docRef.id);
            return docRef.id;
        }
        catch (error) {
            alert("Event failed to create! ", error);
            console.error('Error adding document:', error);
            throw error;
        }
    };

    return (
        <>
            <div>
                <h1>Appointments calendar</h1>
                <h3>All appointments are listed and can be viewed in the calendar!</h3>
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
                    <AppointmentForm />
                </Scheduler>
            </Paper>
        </>
    );
}

export default AppointmentsCalendar;