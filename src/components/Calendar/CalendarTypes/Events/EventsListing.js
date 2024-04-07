import CountdownTimer from "./CountdownTimer";

const EventsListing = ({ events }) => {

    const formatDate = (date) => {
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        };
        return date.toLocaleString('en-US', options);
    };

    const sortedEvents = [...events].sort(
        (a, b) => a.startDate.seconds - b.startDate.seconds
    );

    return (
        <>
            <div className="event-naming-div">
                <div className="namings-div">
                    <div className="split-div">
                        <h3>Event info</h3>
                    </div>
                    <div className="split-div">
                        <h3>Countdown timer</h3>
                    </div>
                </div>
                <div className="event-list-div">
                    {(sortedEvents && sortedEvents.length > 0) ? (
                        sortedEvents.map((event, index) => (
                            <div key={index} className="event-div">
                                <div className="event-details-div">
                                    <h3>{event.title}</h3>
                                    <p>Location: {event.location}</p>
                                    <p>Start Date: {event.startDate ? formatDate(new Date(event.startDate.seconds * 1000)) : 'Unknown'}</p>
                                    <p>End Date: {event.endDate ? formatDate(new Date(event.endDate.seconds * 1000)) : 'Unknown'}</p>
                                </div>
                                {event.startDate && <CountdownTimer targetDate={event.startDate.seconds * 1000} />}
                            </div>
                        ))
                    ) : (
                        <div className="event-div">
                            There are no events
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default EventsListing;