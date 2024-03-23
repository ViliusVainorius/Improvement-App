const StravaAuthCode = () => {

    const handleLogin = () => {
        window.location.href = 'https://www.strava.com/oauth/authorize' +
            '?client_id=123547' + //client ID
            '&redirect_uri=http://localhost:3000/strava_callback' +
            '&response_type=code' +
            '&scope=activity:read_all'; // Adjust scope as needed
    };

    return (
        <div>
            <h2>Connect to Strava!</h2>
            <p>Connect to Strava, so you can connect your tasks with your Strava activities and see detailed information.</p>
            <button onClick={handleLogin}>Connect</button>
        </div>
    );
}

export default StravaAuthCode;