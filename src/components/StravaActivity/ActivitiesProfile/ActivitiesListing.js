import ListActivities from "./ListActivities";

const ActivitiesListing = () => {



    return (
        <>
            <div className="task-view-select-container">
                <h2>Ongoing tasks</h2>
                <div className="activities-listing">
                    <div className="activities-header">
                        <div className="activity-header-item">
                            <strong>
                                Title
                            </strong>
                        </div>
                        <div className="activity-header-item">
                            <strong>
                                Description
                            </strong>
                        </div>
                        <div className="activity-header-item">
                            <strong>
                                Creation Date
                            </strong>
                        </div>
                        <div className="activity-header-item">
                            <strong>
                                Is synced with Strava?
                            </strong>
                        </div>
                        <div className="activity-header-item">
                            <strong>

                            </strong>
                        </div>
                    </div>

                    <ListActivities />

                </div>
            </div>
        </>
    );
}

export default ActivitiesListing;