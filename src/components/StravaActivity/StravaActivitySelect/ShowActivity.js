const ShowActivity = ({ activity }) => {

    const { name, sport_type, start_date_local, elapsed_time, distance, total_elevation_gain } = activity;

    //start_date-local to readable string
    const startDate = new Date(start_date_local);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
    const formattedStartDate = startDate.toLocaleDateString('en-US', options);

    const formatTime = (elapsedTimeInSeconds) => {
        const hours = Math.floor(elapsedTimeInSeconds / 3600);
        const minutes = Math.floor((elapsedTimeInSeconds % 3600) / 60);
        const seconds = elapsedTimeInSeconds % 60;

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    const metersToKilometers = (distanceInMeters) => {
        return (distanceInMeters / 1000).toFixed(2);
    };

    const roundUpMeters = (elevation) => {
        return Math.ceil(elevation);
    }

    return (
        <>
            <div className="task-details">
                <div className="task-column">
                    <span><strong>Title:</strong> {name}</span>
                </div>
                <div className="task-column">
                    <span><strong>Sport type:</strong> {sport_type}</span>
                </div>
                <div className="task-column">
                    <strong>Activity date:</strong> {formattedStartDate}
                </div>
                <div className="task-column">
                    <strong>Time: </strong> {formatTime(elapsed_time)}
                </div>
                <div className="task-column">
                    <strong>Distance: </strong> {metersToKilometers(distance)} km
                </div>
                <div className="task-column">
                    <strong>Elevation: </strong> {roundUpMeters(total_elevation_gain)} m
                </div>
            </div>
        </>
    );
}

export default ShowActivity;