import Navbar from "./bars/Navbar"
import Sidebar from "./bars/Sidebar"
import TodoTasks from "../todo/TodoTasks"
import { useAuth } from '../contexts/authContext';
import React, { useState, useEffect } from 'react';
import NotFound from "./NotFound";

export default function Home() {
    const { userLoggedIn } = useAuth();
    const [userId, setUserId] = useState(null);

    return (
        <>
            {!userLoggedIn && <NotFound />}
            <Navbar />
            {/* <Sidebar /> */}
            <TodoTasks userId={userId} />
        </>
    );
}