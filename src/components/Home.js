import Navbar from "./bars/Navbar"
import Sidebar from "./bars/Sidebar"
import TodoTasks from "../todo/TodoTasks"
import { useAuth } from '../contexts/authContext';
import React, { useState, useEffect } from 'react';
import NotFound from "./NotFound";

export default function Home() {
    const { userLoggedIn, currentUser } = useAuth();

    // console.log(currentUser.uid)

    return (
        <>
            {!userLoggedIn && <NotFound />}
            <Navbar />
            {/* <Sidebar /> */}
            <TodoTasks userId={currentUser.uid} />
        </>
    );
}