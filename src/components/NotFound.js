import { useAuth } from '../contexts/authContext';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const { userLoggedIn } = useAuth()
    const history = useHistory();

    return (
        <>
            {userLoggedIn && (history.push('/home'))}
            {!userLoggedIn && (history.push('/'))}
        </>

    );
}

export default NotFound;