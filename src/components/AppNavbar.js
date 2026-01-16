// src/components/AppNavbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutModal from './LogoutModal.js';

export default function AppNavbar({ currentUser, setCurrentUser }) {
    // State to control the visibility of the confirmation modal
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate(); // Hook for redirection

    // This function runs ONLY when the user clicks "Logout" inside the MODAL.
    const handleLogout = () => {
        // 1. Clear session data
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        
        // 2. Update global state (forces re-render of App.js and Navbar)
        setCurrentUser(null);
        
        // 3. Close modal and redirect to login page
        setShowLogout(false);
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">My Blog</Link>
                
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto">
                        {/* 1. GUEST Links */}
                        {!currentUser && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                            </>
                        )}

                        {/* 2. Logged-in User Links */}
                        {currentUser && (
                            <>
                                {/* Regular User Links (Visible after login/registration) */}
                                {currentUser.role !== "admin" && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/home">Home</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/about">About</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/services">Services</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">Contact</Link>
                                        </li>
                                    </>
                                )}

                                {/* Admin Links */}
                                {currentUser.role === "admin" && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin/posts/list">Manage Posts</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/admin/post/create">Create Post</Link>
                                        </li>
                                    </>
                                )}

                                {/* Logout Button (TRIGGERS MODAL) */}
                                <li className="nav-item">
                                    <button
                                        className="nav-link btn btn-link"
                                        onClick={() => setShowLogout(true)}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            {/* 3. RENDER LOGOUT MODAL HERE */}
            <LogoutModal
                show={showLogout}
                onClose={() => setShowLogout(false)}
                onConfirm={handleLogout}
            />
        </nav>
    );
}