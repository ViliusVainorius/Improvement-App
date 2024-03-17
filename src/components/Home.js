import Navbar from "./bars/Navbar"
import Sidebar from "./bars/Sidebar"
import TodoTasks from "../todo/TodoTasks"
import { useAuth } from '../contexts/authContext';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

export default function Home() {
    const { userLoggedIn } = useAuth();
    const history = useHistory();
    const [userId, setUserId] = useState(null);

    return (
        <>
            <Navbar />
            {/* <Sidebar /> */}
            <TodoTasks userId={userId} />
        </>
    );
}