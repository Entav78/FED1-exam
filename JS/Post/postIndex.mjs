import '../header.mjs';
import { getPostEndpoint } from "../endpoints.mjs"; 
import { generatePostHtml } from "./generatePostHtml.mjs"; 
import { initializeManageButton } from '../manageButton.mjs';
import { getUrlParameter } from "./utils.mjs"; 
import { initializeCopyLinkButton } from './copyLink.mjs';

document.addEventListener("DOMContentLoaded", function () {
  const postId = getUrlParameter("id");
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const username = "Hilde_Vatne";

  console.log("Current URL:", window.location.href);
  console.log("Post ID retrieved from URL:", postId);
  console.log("Username used for request:", username);

  if (postId && username) {
    console.log("Fetching post data...");
    loadPost(username, postId);
  } else {
    console.warn("Post ID or Username not found in the URL or localStorage.");
  }
});

// Function to load a specific post using the correct username and post ID
async function loadPost(username, postId) {
  const token = localStorage.getItem("accessToken");
  const endpoint = getPostEndpoint(username, postId); 
  await fetchPost(endpoint, token);
}

// Fetch Post Function with Improved Error Handling
async function fetchPost(endpoint, token = null) {
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const postContainer = document.getElementById("postContainer");

  if (!postContainer) {
    console.warn('Post container not found. Please check if there is an element with id="postContainer" in the HTML.');
    return;
  }

  // Clear existing content before appending new post
  postContainer.innerHTML = '';

  if (loadingMessage) loadingMessage.style.display = 'block';
  if (errorMessage) errorMessage.style.display = 'none';

  try {
    console.log("Fetching from endpoint:", endpoint);
    const response = await fetch(endpoint, {
      headers: {
        "Authorization": token ? `Bearer ${token}` : undefined,
      },
    });

    if (!response.ok) {
      console.error(`Failed to load post: Status ${response.status} - ${response.statusText}`);
      throw new Error(`Failed to load post: ${response.statusText}`);
    }

    const post = await response.json();
    console.log("Fetched post data:", post);

    const postData = post.data || post;
    if (!postData || !postData.title || !postData.body) {
      console.error("Post data is missing expected properties.");
      postContainer.innerHTML = '<p>Failed to load post content.</p>';
      return;
    }

    // Generate and display the post HTML
    const postHtml = generatePostHtml(postData);
    postContainer.appendChild(postHtml);

    // Directly check for the button after appending the content
    const copyLinkButton = document.getElementById("copyLinkButton");
    console.log("Direct check for Copy Link Button after content load:", copyLinkButton);

    if (copyLinkButton) {
      initializeCopyLinkButton("copyLinkButton");
    } else {
      console.warn("Copy Link Button not found with ID: copyLinkButton after content is loaded.");
    }

    initializeManageButton();
  } catch (error) {
    console.error("Failed to load post:", error);
    if (errorMessage) {
      errorMessage.style.display = 'block';
      errorMessage.textContent = "Failed to load post. Please try again later.";
    }
  } finally {
    if (loadingMessage) loadingMessage.style.display = 'none';
  }
}
