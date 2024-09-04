// endpoints.mjs
import { API_URL } from './apiUrl.mjs';

// Static endpoints for registration and login
export const REGISTER_ENDPOINT = `${API_URL}/auth/register`;
export const LOGIN_ENDPOINT = `${API_URL}/auth/login`;

// Function to dynamically get the posts endpoint based on the username stored in localStorage
export function getPostsEndpoint() {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const userName = localStorage.getItem('userName');
  
  // Use public endpoint if not logged in, otherwise use the user's posts endpoint
  return isLoggedIn && userName
    ? `${API_URL}/blog/posts/${userName}`
    : `${API_URL}/public/posts`; // Assuming a public endpoint is available for non-logged-in users
}

// Function to get the specific post endpoint based on username and postId
export const getPostEndpoint = (username, postId) => {
  if (!username || !postId) {
    console.error("Invalid parameters: username or postId missing.");
    return null; // Return null to indicate an invalid endpoint
  }
  return `${API_URL}/blog/posts/${username}/${postId}`;
};

