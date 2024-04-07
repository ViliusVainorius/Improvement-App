import CompletedActivitiesListing from "./CompletedActivitiesListing";

const CompletedActivities = () => {
    return (
        <>
            <div className="task-view-select-container">
                {/* <div className="completed-act-titles-div"> */}
                <h2>Completed tasks</h2>
                {/* <button className="act-listing-btn">Sort by date</button> */}
                <p>sort by: CREEATEA A CENTER FUNCTION</p>
                {/* </div> */}
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
                                Completed in time
                            </strong>
                        </div>
                    </div>

                    <CompletedActivitiesListing />

                </div>
            </div>
        </>
    );
}

export default CompletedActivities;