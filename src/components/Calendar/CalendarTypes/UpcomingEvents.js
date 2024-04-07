import EventsListing from "./Events/EventsListing";

const UpcomingEvents = ({ events }) => {

    // console.log("events: ", events)

    return (
        <>
            <div className="events-titles-div">
                <h1>Upcoming events</h1>
                <h3>list of upcoming events listed and sorted by end date</h3>
                <EventsListing events={events} />
            </div>
        </>
    );
}

export default UpcomingEvents;