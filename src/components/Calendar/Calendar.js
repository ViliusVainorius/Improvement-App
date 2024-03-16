import Navbar from "../bars/Navbar"
import Sidebar from "../bars/Sidebar"
import { useAuth } from '../../contexts/authContext';
import { useHistory } from 'react-router-dom';

const Calendar = () => {
    const { userLoggedIn } = useAuth()
    const history = useHistory();

    return (
        <>
            {/* {!userLoggedIn && (history.push('/calendar'))} */}
            <Navbar />
            <Sidebar />
            <h1>Hello world Calendar</h1>
        </>
    );
}

export default Calendar;