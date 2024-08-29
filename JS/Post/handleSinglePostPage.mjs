import { API_URL } from "../apiUrl.mjs";
import { fetchData } from "./fetchData.mjs";
import { generatePostHtml } from "./generatePostHtml.mjs";
import { checkAuthentication } from "./auth.mjs";

document.addEventListener("DOMContentLoaded", function() {
  const postId = new URLSearchParams(window.location.search).get("id"); // Get the post ID from the URL
  if (postId) {
    loadPost(postId);
  }
});

// Function to load a specific post
async function loadPost(postId) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to load post.");
    }

    const post = await response.json();
    const postContainer = document.getElementById("postContainer"); // Assuming there's a container for the post
    postContainer.appendChild(generatePostHtml(post)); // Generate and display post HTML
  } catch (error) {
    console.error("Failed to load post:", error);
  }
}
