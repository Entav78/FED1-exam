import { API_URL } from './apiUrl.mjs';

export const REGISTER_ENDPOINT = `${API_URL}/auth/register`;
export const LOGIN_ENDPOINT = `${API_URL}/auth/login`;

export function getPostsEndpoint() {
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const userName = localStorage.getItem('userName');
  
  return isLoggedIn && userName
    ? `${API_URL}/blog/posts/${userName}`
    : `${API_URL}/public/posts`; 
}

export const getPostEndpoint = (username, postId) => {
  if (!username || !postId) {
    console.error("Invalid parameters: username or postId missing.");
    return null; 
  }
  return `${API_URL}/blog/posts/${username}/${postId}`;
};

