import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, provider, signInWithPopup } from './firebase';
import './authentication.css';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [userotp, setOtp] = useState('');
    const [isOtpRequested, setIsOtpRequested] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Login successful!');
                navigate('/main');
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Login failed.');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            toast.error('Login failed. Please check your credentials.');
        }
    };

    const handleSignup = async () => {
        try {
            const response = await fetch('http://localhost:8000/generate-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to generate OTP');
            }
    
            const data = await response.json();
            console.log('OTP generated successfully:', data);
            toast.info('OTP has been sent to your email. Please enter it to verify.');
            setIsOtpRequested(true);
        } catch (error) {
            console.error('Error generating OTP:', error);
            toast.error('Error generating OTP. Please try again.');
        }
    };

    const handleOtpVerification = async () => {
        try {
            const response = await fetch('http://localhost:8000/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userotp, username, password }),
            });
    
            if (response.ok) {
                toast.success('OTP verified successfully! Now, you can login.');
                setIsLogin(true);
                setIsOtpRequested(false);
                setOtp('');
                setUsername('');
                setPassword('');
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'OTP verification failed.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('OTP verification failed. Please try again.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Authenticate user on your backend
            const response = await fetch('http://localhost:8000/api/login-google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email }),
            });

            if (response.ok) {
                toast.success('Google Sign-In successful!');
                navigate('/main');
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Error during Google Sign-In.');
            }
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
            toast.error('Google Sign-In failed.');
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Send user details to your MongoDB server
            const response = await fetch('http://localhost:8000/api/register-google-user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email,
                    username: user.displayName || 'Anonymous',
                }),
            });

            if (response.ok) {
                toast.success('Google Sign-Up successful!');
                setIsLogin(true);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Error during Google Sign-Up.');
            }
        } catch (error) {
            console.error('Error during Google Sign-Up:', error);
            toast.error('Google Sign-Up failed.');
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer />
            {isLogin ? (
                <div className="auth-form">
                    <h2>Login</h2>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleGoogleSignIn}>Sign In with Google</button>
                    <p onClick={() => setIsLogin(false)}>Don't have an account? Sign up</p>
                </div>
            ) : (
                <div className="auth-form">
                    <h2>Sign Up</h2>
                    {isOtpRequested ? (
                        <div>
                            <input
                                type="text"
                                value={userotp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                required
                            />
                            <button onClick={handleOtpVerification}>Verify OTP</button>
                        </div>
                    ) : (
                        <div>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                required
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                required
                            />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                required
                            />
                            <button onClick={handleSignup}>Sign Up</button>
                            <button onClick={handleGoogleSignUp}>Sign Up with Google</button>
                            <p onClick={() => setIsLogin(true)}>Already have an account? Login</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AuthForm;
