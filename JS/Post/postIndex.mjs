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

  if (postId && username) {
    loadPost(username, postId);
  } else {
    console.warn("Post ID or Username not found in the URL or localStorage.");
  }
});

async function loadPost(username, postId) {
  const token = localStorage.getItem("accessToken");
  const endpoint = getPostEndpoint(username, postId); 
  await fetchPost(endpoint, token);
}

async function fetchPost(endpoint, token = null) {
  const loadingMessage = document.getElementById("loadingMessage");
  const errorMessage = document.getElementById("errorMessage");
  const postContainer = document.getElementById("postContainer");

  if (!postContainer) {
    console.warn('Post container not found. Please check if there is an element with id="postContainer" in the HTML.');
    return;
  }

  postContainer.innerHTML = '';

  if (loadingMessage) loadingMessage.style.display = 'block';
  if (errorMessage) errorMessage.style.display = 'none';

  try {
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

    const postData = post.data || post;
    if (!postData || !postData.title || !postData.body) {
      console.error("Post data is missing expected properties.");
      postContainer.innerHTML = '<p>Failed to load post content.</p>';
      return;
    }

    const postHtml = generatePostHtml(postData);
    postContainer.appendChild(postHtml);

    const copyLinkButton = document.getElementById("copyLinkButton");

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
