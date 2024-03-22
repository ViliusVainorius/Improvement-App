import Navbar from "../bars/Navbar"
import Sidebar from "../bars/Sidebar"
import { useAuth } from '../../contexts/authContext';
import React, { useState, useEffect } from 'react';
import NotFound from "../NotFound";
import axios from 'axios';

const Calendar = () => {
    const { userLoggedIn } = useAuth()

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Make a request to the Strava API to fetch activities
                const response = await axios.get('https://www.strava.com/api/v3/activities', {
                    headers: {
                        'Authorization': 'df95f1262861646cbbf4dd2133cd6ed5bedcac4b'
                    }
                });

                // Update state with the fetched activities
                console.log(response.data)
                setActivities(response.data);
            } catch (error) {
                console.error('Error fetching activities:', error);
                // Handle error, if any
            }
        };

        fetchActivities();
    }, []);

    return (
        <>
            {!userLoggedIn && <NotFound />}
            <Navbar />
            {/* <Sidebar /> */}
            <h1>hello world!</h1>
        </>
    );
}

export default Calendar;