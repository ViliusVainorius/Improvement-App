import CompletedActivitiesListing from "./CompletedActivitiesListing";

const CompletedActivities = () => {
    return (
        <>
            <div className="task-view-select-container">
                <h2>
                    Completed tasks
                </h2>
                <CompletedActivitiesListing />
            </div>
        </>
    );
}

export default CompletedActivities;