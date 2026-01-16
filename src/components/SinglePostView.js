// src/components/SinglePostView.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from './CommentSection.js';

const API_POST_DETAIL_URL = 'http://localhost:5001/api/blog'; // PORT 5000 → 5001

export default function SinglePostView({ currentUser }) {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            // Resetting state to clear old post content during navigation, prevents flicker
            setPost(null);
            setLoading(true);

            try {
                const token = sessionStorage.getItem('token');
                const headers = { 'Content-Type': 'application/json' };
                
                if (token) {
                    headers.Authorization = `Bearer ${token}`;
                }

                const response = await fetch(`${API_POST_DETAIL_URL}/${id}`, {
                    method: 'GET',
                    headers: headers,
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch post. Status: ${response.status}`);
                }

                const data = await response.json();
                setPost(data);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message || "Could not load the post.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary"></div>
                <p>Loading post...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger mt-5 container">
                Error: {error}
            </div>
        );
    }

    if (!post) {
        return (
            <div className="alert alert-warning mt-5 container">
                Post not found.
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <article>
                <header className="mb-4">
                    <h1 className="fw-bolder">{post.title}</h1>
                    <div className="text-muted fst-italic mb-2">
                        Posted on {new Date(post.createdAt).toLocaleDateString()} by {post.author}
                    </div>
                </header>
                
                <section className="mb-5">
                    <div className="fs-5 mb-4" style={{ whiteSpace: 'pre-wrap' }}>
                        {post.content}
                    </div>
                </section>

                {/* Comment Section */}
                <CommentSection postId={post._id} currentUser={currentUser} />
            </article>
        </div>
    );
}