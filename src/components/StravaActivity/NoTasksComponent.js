const NoTasksComponent = () => {
    return (
        <>
            <div className="no_tasks_found">
                <h1>You dont have any to do tasks created with activity type - not "Non-Sport"</h1>
                <h3>Please create a to do task with the activity type you wish, then comeback here to sync them!</h3>
            </div>
        </>
    );
}

export default NoTasksComponent;