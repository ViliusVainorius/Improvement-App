const StravaAuthCode = () => {

    const handleLogin = () => {
        // Redirect users to the Strava authorization page
        window.location.href = 'https://www.strava.com/oauth/authorize' +
            '?client_id=123547' + //client ID
            '&redirect_uri=http://localhost:3000/strava_callback' +
            '&response_type=code' +
            '&scope=activity:read_all'; // Adjust scope as needed
    };

    return (
        <div>
            <h2>Login with Strava</h2>
            <button onClick={handleLogin}>Login with Strava</button>
        </div>
    );
}

export default StravaAuthCode;