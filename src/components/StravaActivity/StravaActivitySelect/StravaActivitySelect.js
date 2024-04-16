import { useEffect, useState } from "react";
import MapStravaActivities from "./MapStravaActivities";

const StravaActivitySelect = ({ activityType, selectedTaskId, onStravaActivitySelect }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                // Fetch activities using the stored access token
                const accessToken = localStorage.getItem('access_token');
                console.log(accessToken)
                const response = await fetch(`https://www.strava.com/api/v3/athlete/activities?&per_page=30`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                const data = await response.json();

                const filteredActivities = data.filter(activity => activity.sport_type === activityType);

                setActivities(filteredActivities);

                console.log(filteredActivities)
            } catch (error) {
                console.error('Error fetching activities:', error);
                // Handle error
            }
        };

        fetchActivities();
        console.log(activityType)

    }, [selectedTaskId, activityType]);

    const handleTaskSelect = (selectedTaskId, selectedTask) => {

        onStravaActivitySelect(selectedTaskId, selectedTask);
    };

    return (
        <>
            <div className="task-select-container">
                <h3>Select Strava activity you wish to sync up</h3>
                <p>Selected task sport type: <strong>{activityType}</strong></p>
                <MapStravaActivities activities={activities} onTaskSelect={handleTaskSelect} />
            </div>
        </>
    );
}

export default StravaActivitySelect;