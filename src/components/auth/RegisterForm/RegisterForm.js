import './RegisterForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const userLoggedIn = false;

    const history = useHistory();

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!isRegistering) {
            if (password == confirmPassword) {
                setIsRegistering(true)
                setErrorMessage('')
                try {
                    await doCreateUserWithEmailAndPassword(email, password)
                }
                catch (error) {
                    console.log(error)
                    setIsRegistering(false)
                }
            }
            else {
                setErrorMessage("Passwords are not identical");
            }
        }
    }

    return (
        <>
            {userLoggedIn && (history.push('/home'))}
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
                        <input type="password" id="confirmPassword" placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label> <input type="checkbox" required />I agree to terms and conditions</label>
                    </div>

                    {errorMessage && (
                        <span className='text-red-600 font-bold'>{errorMessage}</span>
                    )}

                    <button type="submit" disabled={isRegistering}>{isRegistering ? 'Signing Up...' : 'Sign Up'}</button>

                    <div className="register-link">
                        <p>Already have an account? <Link to="/">Login</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
};

export default RegisterForm;