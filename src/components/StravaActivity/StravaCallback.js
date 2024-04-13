import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Navbar from '../bars/Navbar';

const StravaCallback = () => {

    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        // const code = null;
        if (code == undefined || code == null) {
            setError(true);
            setErrorMsg("Error getting authentication token from Strava, reload page and try again later.")
            return;
        }
        console.log("code - ", code);

        // Exchange code for access token
        const fetchAccessToken = async () => {
            try {
                const accessToken = localStorage.getItem('access_token');
                console.log("access tokken - ", accessToken)
                const tokenExpiration = localStorage.getItem('token_expiration');

                if (accessToken && tokenExpiration && Date.now() < Number(tokenExpiration)) {
                    // Redirect to dashboard
                    console.log("accessToken alreaady exists: ", accessToken, " and expiration date: ", tokenExpiration)

                    history.push('/activities');
                    return;
                }

                const response = await fetch('https://www.strava.com/oauth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        client_id: '123547', // client ID
                        client_secret: 'ac2e7562256bd5d759c34d3e5966c34dd84670de', // client secret
                        code,
                        grant_type: 'authorization_code'
                    })
                });

                const data = await response.json();

                console.log("Getting a new access token")
                // Store access token securely (e.g., in local storage)
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('token_expiration', Date.now() + (data.expires_in * 1000));

                // Redirect to dashboard
                history.push('/activities-sync');
            } catch (error) {
                console.error('Error fetching access token:', error);
                // Handle error
            }
        };

        if (code !== undefined || code !== null) {
            // code is not null or undefined
            fetchAccessToken();
        }

    }, [location.search, history]);

    return (
        <>
            {error ? (
                <div>
                    <Navbar />
                    <div style={{ color: 'red' }}>Error: {errorMsg}</div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>


    );
}

export default StravaCallback;