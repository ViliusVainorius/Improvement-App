const FoodNavbar = ({ onViewChange }) => {


    const handleYourIngredientsClick = () => {
        onViewChange('YourIngredients');
    };

    const handleRecepiesClick = () => {
        onViewChange('Recepies');
    };

    // const handleAppointmentCalendarClick = () => {
    //     onViewChange('appointmentCalendar');
    // };

    return (
        <>
            <div className="calendar-nav">
                <div className="calendar-item-div" onClick={handleYourIngredientsClick}>
                    Your Ingredients
                </div>
                <div className="calendar-item-div" onClick={handleRecepiesClick}>
                    Recepies
                </div>
                {/* <div className="calendar-item-div" onClick={handleAppointmentCalendarClick}>
                    Appointment calendar
                </div> */}
            </div>
        </>
    );
}

export default FoodNavbar;