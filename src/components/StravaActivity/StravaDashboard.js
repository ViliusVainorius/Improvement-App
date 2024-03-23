import React, { useState, useEffect } from 'react';
import Navbar from '../bars/Navbar';

const StravaDashboard = () => {

    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Fetch activities using the stored access token
                const accessToken = localStorage.getItem('access_token');
                const response = await fetch('https://www.strava.com/api/v3/activities', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                const data = await response.json();
                setActivities(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching activities:', error);
                // Handle error
            }
        };

        fetchActivities();
    }, []);

    return (
        <>
            <Navbar />
            <div>
                <h2>Dashboard</h2>
                <ul>
                    {activities.map(activity => (
                        <li key={activity.id}>{activity.name}</li>
                    ))}
                </ul>
            </div>
        </>

    );
}

export default StravaDashboard;