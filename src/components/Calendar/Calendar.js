import Navbar from "../bars/Navbar"
import Sidebar from "../bars/Sidebar"
import { useAuth } from '../../contexts/authContext';

import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import NotFound from "../NotFound";

const Calendar = () => {
    const { userLoggedIn } = useAuth()

    const currentDate = '2018-11-01';
    const schedulerData = [
        { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
        { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
    ];

    return (
        <>
            {!userLoggedIn && <NotFound />}
            <Navbar />
            {/* <Sidebar /> */}
            <Paper>
                <Scheduler
                    data={schedulerData}
                >
                    <ViewState
                        currentDate={currentDate}
                    />
                    {/* <DayView
                        startDayHour={9}
                        endDayHour={14}
                    /> */}
                    {/* <WeekView
                        startDayHour={9}
                        endDayHour={14}
                    /> */}
                    <MonthView
                        startDayHour={9}
                        endDayHour={14}
                    />
                    <Appointments />
                </Scheduler>
            </Paper>
        </>
    );
}

export default Calendar;