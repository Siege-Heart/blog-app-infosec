// src/components/BlogPost.js
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Helper to get logged-in user
function getSessionUser() {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export default function BlogPost() {
    const user = getSessionUser();
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch post and comments concurrently
        Promise.all([
            fetch(`http://localhost:5001/api/blog/${id}`).then(res => res.json()), // PORT 5000 → 5001
            fetch(`http://localhost:5001/api/comments/${id}`).then(res => res.json()), // PORT 5000 → 5001
        ])
        .then(([postData, commentsData]) => {
            // Check if post fetch was successful
            if (postData.title) {
                setPost(postData);
            } else {
                setPost(null); // Explicitly set to null if not found
            }
            
            // Comments fetch might return an empty array or error object
            if (Array.isArray(commentsData)) {
                setComments(commentsData);
            }
        })
        .catch((err) => {
            console.error("Error fetching blog post or comments:", err);
            setPost(null);
        })
        .finally(() => {
            setLoading(false);
        });
    }, [id]);

    const addComment = async () => {
        if (!text.trim()) return;
        
        const token = sessionStorage.getItem('token'); // Get JWT token
        const commentAuthor = user ? user.username : "Anonymous";
        
        try {
            const res = await fetch("http://localhost:5001/api/comments", { // PORT 5000 → 5001
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Add JWT token
                },
                body: JSON.stringify({ 
                    postId: id, 
                    content: text.trim() // Changed from 'text' to 'content' to match backend
                })
            });

            if (res.ok) {
                const data = await res.json();
                // data.comment contains the newly saved comment object from the backend
                setComments(prev => [...prev, data.comment]);
                setText("");
            } else {
                const errorData = await res.json();
                console.error("Error posting comment:", errorData.message);
                alert("Failed to post comment: " + (errorData.message || "Please log in"));
            }
        } catch (err) {
            console.error("Server error posting comment:", err);
        }
    };

    if (loading) return <p className="container mt-4">Loading...</p>;
    if (!post) return <p className="container mt-4">Post not found.</p>;

    return (
        <div className="container mt-4">
            <h2>{post.title}</h2>
            <p>By: {post.author} | Posted: {new Date(post.createdAt).toLocaleDateString()}</p>
            
            <div style={{ whiteSpace: 'pre-wrap' }}>{post.content}</div>
            
            <hr />
            
            <h4>Comments</h4>
            <ul className="list-group mb-3">
                {/* Use the unique comment ID as the key */}
                {comments.map(c => (
                    <li key={c._id} className="list-group-item">
                        <strong>{c.author}</strong>: {c.content} {/* Changed from c.user, c.text */}
                        <small className="text-muted float-end">
                            {new Date(c.createdAt).toLocaleTimeString()}
                        </small>
                    </li>
                ))}
                {comments.length === 0 && (
                    <li className="list-group-item text-muted">No comments yet.</li>
                )}
            </ul>
            
            <textarea
                className="form-control"
                placeholder={`Write a comment as ${user ? user.username : 'Anonymous'}...`}
                value={text}
                onChange={e => setText(e.target.value)}
                rows="3"
            />
            
            <button 
                className="btn btn-primary mt-2" 
                onClick={addComment} 
                disabled={!text.trim()}
            >
                Post Comment
            </button>
        </div>
    );
}