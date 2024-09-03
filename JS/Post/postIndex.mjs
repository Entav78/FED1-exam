import '../header.mjs';
import { getPostEndpoint } from "../endpoints.mjs"; // Ensure correct path
import { generatePostHtml } from "./generatePostHtml.mjs"; // Import your function

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  console.log("Current URL:", window.location.href); // Log the full URL
  console.log("Post ID retrieved from URL:", postId); // Log the retrieved ID

  if (postId) {
    console.log("Post ID found:", postId);
    loadPost(postId); // Call the function with the retrieved postId
  } else {
    console.warn("Post ID not found in the URL.");
  }
});

// Function to load a specific post
async function loadPost(postId) {
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("userName"); // Fetch username from localStorage
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const postContainer = document.getElementById("postContainer");

  if (!postContainer) {
    console.warn('Post container not found. Please check if there is an element with id="postContainer" in the HTML.');
    return;
  }

  // Display loading message
  if (loadingMessage) loadingMessage.style.display = 'block';
  if (errorMessage) errorMessage.style.display = 'none';

  try {
    // Use getPostEndpoint with adjustments for missing username
    const endpoint = username ? getPostEndpoint(username, postId) : `${API_URL}/posts/${postId}`;
    console.log("Fetching from endpoint:", endpoint); // Log the endpoint to confirm it's correct

    const response = await fetch(endpoint, {
      headers: {
        "Authorization": token ? `Bearer ${token}` : undefined, // Include token if available
      },
    });

    if (!response.ok) {
      throw new Error("Failed to load post.");
    }

    const post = await response.json();
    console.log("Fetched post data:", post); // Log the fetched post data

    const postData = post.data;

    // Check if the fetched data contains the expected properties
    if (!postData || !postData.title || !postData.body) {
      console.error("Post data is missing expected properties.");
      console.log("Actual fetched post data:", post); // Log the actual data structure for inspection
      postContainer.innerHTML = '<p>Failed to load post content.</p>';
      return;
    }

    // Generate the HTML for the post and log the generated content
    const postHtml = generatePostHtml(postData);
    console.log("Generated post HTML:", postHtml); // Log the generated HTML element

    // Append the generated HTML to the postContainer
    postContainer.appendChild(postHtml);
    console.log("Post appended to container:", postContainer.innerHTML); // Check the final content of the container
  } catch (error) {
    console.error("Failed to load post:", error);
    if (errorMessage) errorMessage.style.display = 'block'; // Show error message
  } finally {
    if (loadingMessage) loadingMessage.style.display = 'none'; // Hide loading message
  }
}



