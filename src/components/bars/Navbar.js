import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import "./Navbar.css";
import { useState } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

export default function Navbar() {
    const { userLoggedIn } = useAuth()
    const history = useHistory();
    const location = useLocation();

    const [showDropdown, setShowDropdown] = useState(false);


    return (
        <nav className="navbar">
            <h1>Improvement App</h1>
            {
                userLoggedIn
                    ?
                    <nav className='links'>
                        <div className="menu-tabs">
                            <div className={`home-div ${location.pathname === '/home' ? 'active' : ''}`}>
                                <Link to="/home">Home</Link>
                            </div>
                            <div className={`calendar-div ${location.pathname === '/calendar' ? 'active' : ''}`}>
                                <Link to="/calendar">Calendar</Link>
                            </div>
                            <div className={`activities-sync-div ${location.pathname === '/activities-sync' ? 'active' : ''}`}>
                                <Link to="/activities-sync">Activities sync</Link>
                            </div>
                            <div className={`activities-div ${location.pathname === '/activities' ? 'active' : ''}`}>
                                <Link to="/activities">Activities</Link>
                            </div>
                            <div className={`food-div ${location.pathname === '/food' ? 'active' : ''}`}>
                                <Link to="/food">Food</Link>
                            </div>
                            <div className={`profile-div ${location.pathname === '/profile' ? 'active' : ''}`}>
                                <Link to="/profile">Profile</Link>
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