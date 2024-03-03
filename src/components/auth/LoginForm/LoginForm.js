import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth';
import { useAuth } from '../../../contexts/authContext';


const LoginForm = () => {
    const history = useHistory();
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
            }
            catch (error) {
                console.log(error)
                setIsSigningIn(false)
            }
            // doSendEmailVerification()
            // console.log('Logged in?')
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()

        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().catch(err => {
                setIsSigningIn(false)
            })
        }
    }

    return (
        <>
            {userLoggedIn && (history.push('/home'))}
            <div className='wrapper'>
                <form onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <FaUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <FaLock className='icon' />
                    </div>

                    <div className="remember-forgot">
                        <label> <input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit" disabled={isSigningIn}>
                        {isSigningIn ? 'Logging In...' : 'Log In'}
                    </button>

                    <div className="register-link">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </form>
            </div>
        </>
    )
};

export default LoginForm;