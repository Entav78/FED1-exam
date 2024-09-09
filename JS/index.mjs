import './header.mjs';
import { API_URL } from "./apiUrl.mjs";
import { initializeManageButton } from './manageButton.mjs'; // Adjust path as necessary
import './Post/carousel.mjs';

// Load all posts when the DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  loadPosts(); // Corrected to load all posts
});

// Function to load and display all posts for the user
async function loadPosts() { // Corrected function name to reflect its purpose
  const postContainer = document.getElementById("postContainer");

  // Check if the container exists
  if (!postContainer) {
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
      postContainer.innerHTML = '<p>No posts found for this user.</p>';
      return;
    }

    // Clear existing content in case of re-render
    postContainer.innerHTML = '';

    posts.forEach(post => {
      // Create post card
      const postCard = document.createElement("div");
      postCard.className = "post-card blog-post";
      postCard.setAttribute("data-post-id", post.id); // Add data attribute for post ID

      // Create post link
      const postLink = document.createElement("a");
      postLink.href = `/post/index.html?id=${post.id}`;
      postLink.textContent = post.title || "Untitled Post"; // Display post title or fallback

      // Create Edit/Manage button
      const manageButton = document.createElement("button");
      manageButton.className = "manage-button";
      manageButton.textContent = "Edit/Manage";
      manageButton.style.display = "none"; // Initially hidden, shown by initializeManageButton

      // Append link and manage button to the card
      postCard.appendChild(postLink);
      postCard.appendChild(manageButton);

      // Append card to the container
      postContainer.appendChild(postCard);
    });

    // Initialize manage buttons, if applicable
    initializeManageButton();

  } catch (error) {
    console.error("Error loading posts:", error);
    postContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
  }
}



