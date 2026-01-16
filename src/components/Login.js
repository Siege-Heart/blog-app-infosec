// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_LOGIN_URL = 'http://localhost:5001/api/auth/login'; // PORT 5000 → 5001

export default function Login({ setCurrentUser }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(API_LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email.trim(), password: password.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle non-200 responses (e.g., 401 Unauthorized, 404 Not Found)
                throw new Error(data.message || 'Login failed. Check credentials.');
            }

            // --- CRITICAL SUCCESS LOGIC ---
            // 1. Extract Token and User Data
            const { token, user } = data; // Backend returns { token, user: { _id, email, role, ... } }
            
            // 2. Save to Session Storage
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            
            // 3. Update State & Redirect
            setCurrentUser(user); // Update the state in App.js which triggers re-render
            
            if (user.role === 'admin') {
                navigate('/dashboard'); // Admin lands on the dashboard
            } else {
                navigate('/home'); // Standard user lands on the home page
            }
        } catch (err) {
            setError(err.message || 'An unexpected error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="h3 text-center text-primary mb-4 fw-bold">Login</h2>
                
                {error && <div className="alert alert-danger rounded mb-3" role="alert">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="d-grid mt-4">
                        <button 
                            type="submit" 
                            className="btn btn-primary fw-bold" 
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}