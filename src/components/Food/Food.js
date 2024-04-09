import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import NotFound from '../NotFound';
import Navbar from '../bars/Navbar';
import FoodSection from './FoodSection/FoodSection';
import "./food.css";
import FoodNavbar from './FoodNavbar';
import Recepies from './FoodSection/Recepies';


const Food = () => {
    const { userLoggedIn } = useAuth()
    const history = useHistory();
    const [selectedView, setSelectedView] = useState('YourIngredients');

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    return (
        <>
            {!userLoggedIn && <NotFound />}
            {userLoggedIn
                &&
                <>
                    <Navbar />
                    <FoodNavbar onViewChange={handleViewChange} />
                    <div className="calendar-div">
                        {selectedView === 'YourIngredients' && <FoodSection />}
                        {selectedView === 'Recepies' && <Recepies />}
                        {/* {selectedView === 'appointmentCalendar' && <AppointmentsCalendar events={events} />} */}
                    </div>

                </>
            }
        </>
    );
}

export default Food;