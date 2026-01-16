// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({ 
        username: "", 
        email: "", 
        password: "", 
        confirmPassword: "",
        role: "user" 
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const API_URL = "http://localhost:5001/api/auth/register"; // PORT 5000 → 5001

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);

        // Validation
        if (!form.username || !form.email || !form.password || !form.confirmPassword) {
            setMessage("All fields are required.");
            setLoading(false);
            return;
        }
        
        if (form.password !== form.confirmPassword) {
            setMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    username: form.username.trim(), 
                    email: form.email.trim(), 
                    password: form.password.trim(),
                    role: form.role 
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(data.message || "Registered successfully!");
                setTimeout(() => navigate("/login"), 1500);
            } else {
                setMessage(data.message || "Registration failed");
            }
        } catch (err) {
            console.error(err);
            setMessage("Server error. Cannot connect to backend.");
        } finally {
            setLoading(false);
        }
    };

    const alertClass = message && message.toLowerCase().includes("success") 
        ? "alert-success" 
        : "alert-danger";

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
                <h2 className="h3 text-center text-primary mb-4 fw-bold">Register</h2>
                
                {message && (
                    <div className={`alert ${alertClass} rounded`} role="alert">
                        {message}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Username</label>
                        <input 
                            name="username" 
                            type="text" 
                            className="form-control"
                            value={form.username} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Email</label>
                        <input 
                            name="email" 
                            type="email" 
                            className="form-control" 
                            value={form.email}
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Password</label>
                        <input 
                            name="password" 
                            type="password" 
                            className="form-control"
                            value={form.password} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Confirm Password</label>
                        <input 
                            name="confirmPassword" 
                            type="password" 
                            className="form-control"
                            value={form.confirmPassword} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label fw-bold">Role</label>
                        <select 
                            name="role" 
                            className="form-select" 
                            value={form.role} 
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="d-grid">
                        <button 
                            type="submit" 
                            className="btn btn-primary fw-bold" 
                            disabled={loading}
                        >
                            {loading ? 'Registering...' : 'Register'}
                        </button>
                    </div>
                </form>
                
                <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <span 
                        className="text-primary text-decoration-underline" 
                        style={{ cursor: "pointer" }} 
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}