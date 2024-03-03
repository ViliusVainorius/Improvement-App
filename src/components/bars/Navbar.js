import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';

export default function Navbar() {
    const { userLoggedIn } = useAuth()
    const history = useHistory();

    return (
        <nav className="navbar">
            <h1>Improvement App</h1>
            {
                userLoggedIn
                    ?
                    <div className='links'>
                        <Link to="/">Home</Link>
                        <a
                            onClick={() => { doSignOut().then(() => { history.push('/login') }) }}
                            className='logout-btn' style={{ cursor: 'pointer' }}
                        >
                            Logout
                        </a>
                    </div>
                    :
                    <>
                    </>
            }
        </nav>
    )
}