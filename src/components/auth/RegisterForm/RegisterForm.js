import './RegisterForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!isRegistering) {
            setIsRegistering(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password)
            }
            catch (error) {
                console.log(error)
                setIsRegistering(false)
            }

        }
    }

    return (
        // {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
        <div className='wrapper'>
            <form onSubmit={onSubmit}>
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" id="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <MdEmail className='icon' />
                </div>
                <div className="input-box">
                    <input type="text" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <FaUser className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <FaLock className='icon' />
                </div>
                <div className="input-box">
                    <input type="password" id="confirmPassword" placeholder='Confirm password' required />
                    <FaLock className='icon' />
                </div>

                <div className="remember-forgot">
                    <label> <input type="checkbox" required />I agree to terms and conditions</label>
                </div>

                <button type="submit">Sign Up</button>

                <div className="register-link">
                    <p>Already have an account? <Link to="/">Login</Link></p>
                </div>
            </form>
        </div>
    )
};

export default RegisterForm;