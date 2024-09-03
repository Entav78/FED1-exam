import { API_URL } from './apiUrl.mjs';

export const REGISTER_ENDPOINT = `${API_URL}/auth/register`;
export const LOGIN_ENDPOINT = `${API_URL}/auth/login`;

// Function to get the POSTS_ENDPOINT dynamically
export function getPostsEndpoint() {
    const userName = localStorage.getItem("userName");
    if (!userName) {
        console.error("Username is not found in localStorage.");
        return null; // Handle this scenario appropriately in your application
    }
    return `${API_URL}/blog/posts/${userName}`;
}

export const getPostEndpoint = (username, postId) => `${API_URL}/blog/posts/${username}/${postId}`;
