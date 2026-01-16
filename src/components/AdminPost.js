// src/components/AdminPost.js
import React, { useState } from "react";

export default function AdminPost() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token"); // Retrieve the token
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");

    // This is a client-side check, easily bypassed (INSECURE TEST MODE)
    if (!user || user.role !== "admin") {
        return (
            <div className="container mt-4">
                <h2>Access Denied</h2>
                <p>Administrators only. Client-side protection only.</p>
            </div>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        
        if (!title.trim() || !content.trim()) {
            setMessage("Title and content are required.");
            return;
        }

        try {
            const res = await fetch("http://localhost:5001/api/blog", { // PORT 5000 → 5001
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Send token in Authorization header
                },
                // Ensure author is sent from the current user session
                body: JSON.stringify({
                    title,
                    content,
                    author: user.username
                }),
            });

            const data = await res.json();

            if (res.ok) {
                // Displays the message from the backend
                setMessage(data.message || "Post created");
                setTitle("");
                setContent("");
            } else {
                // If the backend returns a 401/403
                setMessage(data.message || "Failed to create post");
            }
        } catch (err) {
            console.error(err);
            setMessage("Server error. Check console.");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Create Post (INSECURE TEST MODE)</h2>
            
            {message && (
                <div className={`alert ${message.includes("success") || message.includes("created") ? 'alert-success' : 'alert-info'}`}>
                    {message}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input 
                        className="form-control" 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}
                        required 
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label">Content</label>
                    <textarea 
                        className="form-control" 
                        rows="8" 
                        value={content}
                        onChange={e => setContent(e.target.value)} 
                        required 
                    />
                </div>
                
                <button type="submit" className="btn btn-primary">Publish</button>
            </form>
        </div>
    );
}