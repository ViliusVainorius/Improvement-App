const CalendarNavbar = ({ onViewChange }) => {


    const handleUpcomingEventsClick = () => {
        onViewChange('upcomingEvents');
    };

    const handleActiveTasksClick = () => {
        onViewChange('activeTasks');
    };

    const handleAppointmentCalendarClick = () => {
        onViewChange('appointmentCalendar');
    };

    return (
        <>
            <div className="calendar-nav">
                <div className="calendar-item-div" onClick={handleUpcomingEventsClick}>
                    Upcoming events
                </div>
                <div className="calendar-item-div" onClick={handleActiveTasksClick}>
                    Active tasks calendar
                </div>
                <div className="calendar-item-div" onClick={handleAppointmentCalendarClick}>
                    Appointment calendar
                </div>
            </div>
        </>
    );
}

export default CalendarNavbar;