import ListActivities from "./ListActivities";

const ActivitiesListing = () => {

    return (
        <>
            <div className="task-view-select-container">
                <h2>Ongoing sport tasks</h2>
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
                                Strava status
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