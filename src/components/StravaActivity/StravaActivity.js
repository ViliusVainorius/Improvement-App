import Navbar from "../bars/Navbar"
import { useAuth } from '../../contexts/authContext';
import React, { useState, useEffect } from 'react';
import NotFound from "../NotFound";
import axios from 'axios';
import StravaAuthCode from "./StravaAuthCode";
import ActivitiesConnect from "./ActivitiesConnect";
import StravaDashboard from "./StravaDashboard";

const StravaActivity = () => {
    const { userLoggedIn } = useAuth()
    const [isTokenAccess, setIsTokenAccess] = useState(false);

    useEffect(() => {
        // Check if access token exists and is not expired
        const accessToken = localStorage.getItem('access_token');
        console.log("accessToken from local - ", accessToken)
        const tokenExpiration = localStorage.getItem('token_expiration');

        if (accessToken !== null && tokenExpiration && Date.now() < Number(tokenExpiration)) {
            setIsTokenAccess(true);
        } else {
            setIsTokenAccess(false);
            console.log(isTokenAccess)
        }
    }, []);

    return (
        <>
            {!userLoggedIn && <NotFound />}
            <Navbar />
            {!isTokenAccess && <StravaAuthCode />}
            {isTokenAccess && <StravaDashboard />}
        </>
    );
}

export default StravaActivity;