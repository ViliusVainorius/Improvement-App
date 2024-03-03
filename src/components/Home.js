import Navbar from "./bars/Navbar"
import Sidebar from "./bars/Sidebar"
import TodoTasks from "../todo/TodoTasks"
import { useAuth } from '../contexts/authContext';
import { useHistory } from 'react-router-dom';

export default function Home() {
    const { userLoggedIn } = useAuth()
    const history = useHistory();

    return (
        <>
            {!userLoggedIn && (history.push('/'))}
            <Navbar />
            <Sidebar />
            <TodoTasks />
        </>
    );
}