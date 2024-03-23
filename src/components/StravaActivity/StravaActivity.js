import Navbar from "../bars/Navbar"
import Sidebar from "../bars/Sidebar"
import { useAuth } from '../../contexts/authContext';
import React, { useState, useEffect } from 'react';
import NotFound from "../NotFound";
import axios from 'axios';
import StravaAuthCode from "./StravaAuthCode";

const Calendar = () => {
    const { userLoggedIn } = useAuth()

    const [activities, setActivities] = useState([]);


    return (
        <>
            {!userLoggedIn && <NotFound />}
            <Navbar />
            {/* <Sidebar /> */}
            <h1>hello world!</h1>
            <StravaAuthCode />
        </>
    );
}

export default Calendar;