import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import "./Navbar.css";
import { useState } from 'react';

export default function Navbar() {
    const { userLoggedIn } = useAuth()
    const history = useHistory();

    const [showDropdown, setShowDropdown] = useState(false);


    return (
        <nav className="navbar">
            <h1>Improvement App</h1>
            {
                userLoggedIn
                    ?
                    <nav className='links'>
                        <div className="menu-tabs">
                            <div className="home-div">
                                <Link to="/">Home</Link>
                            </div>
                            <div className="calendar-div">
                                <Link to="/calendar">Calendar</Link>
                            </div>
                            <div className="activities-sync-div">
                                <Link to="/activities-sync">Activities sync</Link>
                            </div>
                            <div className="activities-div">
                                <Link to="/activities">Activities</Link>
                            </div>
                        </div>
                        <div className="logout-tab">
                            <a
                                onClick={() => { doSignOut().then(() => { history.push('/login') }) }}
                                className='logout-btn' style={{ cursor: 'pointer' }}
                            >
                                Logout
                            </a>
                        </div>

                    </nav>
                    :
                    <></>
            }
        </nav>
    )
}