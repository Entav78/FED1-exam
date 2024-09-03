import './header.mjs';
import { API_URL } from "./apiUrl.mjs";

document.addEventListener("DOMContentLoaded", function() {
  loadPosts();
});

// Function to load and display all posts
async function loadPosts() {
  const postsContainer = document.getElementById("postsContainer");

  // Check if the container exists
  if (!postsContainer) {
    console.error("Posts container not found in the HTML.");
    return;
  }

  // Ensure the username is correctly specified in the URL
  const username = "Hilde_Vatne";

  try {
    // Fetch posts from the correct endpoint including the username
    const response = await fetch(`${API_URL}/blog/posts/${username}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const responseData = await response.json();
    
    // Log the response data to understand its structure
    console.log("API Response:", responseData);

    // Check if posts are inside a specific property, e.g., 'data'
    const posts = Array.isArray(responseData) ? responseData : responseData.data || [];

    // Check if posts are returned and are in array format
    if (!Array.isArray(posts) || posts.length === 0) {
      postsContainer.innerHTML = '<p>No posts found for this user.</p>';
      return;
    }

    // Clear existing content in case of re-render
    postsContainer.innerHTML = '';

    posts.forEach(post => {
      // Create post card
      const postCard = document.createElement("div");
      postCard.className = "post-card";

      // Create post link
      const postLink = document.createElement("a");
      postLink.href = `/post/index.html?id=${post.id}`;
      postLink.textContent = post.title || "Untitled Post"; // Display post title or fallback

      // Append link to card and card to container
      postCard.appendChild(postLink);
      postsContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error("Error loading posts:", error);
    postsContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
  }
}

