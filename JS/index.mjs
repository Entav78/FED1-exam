import './header.mjs';
import { API_URL } from "./apiUrl.mjs";
import { initializeManageButton } from './manageButton.mjs';
import './Post/carousel.mjs';

document.addEventListener("DOMContentLoaded", function() {
  loadPosts(); 
});

async function loadPosts() { 
  const postContainer = document.getElementById("postContainer");

  if (!postContainer) {
    console.error("Posts container not found in the HTML.");
    return;
  }

  const username = "Hilde_Vatne";

  try {
    const response = await fetch(`${API_URL}/blog/posts/${username}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const responseData = await response.json();

    const posts = Array.isArray(responseData) ? responseData : responseData.data || [];

    if (!Array.isArray(posts) || posts.length === 0) {
      postContainer.innerHTML = '<p>No posts found for this user.</p>';
      return;
    }

    postContainer.innerHTML = '';

    posts.forEach(post => {
      const postCard = document.createElement("div");
      postCard.className = "post-card blog-post";
      postCard.setAttribute("data-post-id", post.id); 

      const postLink = document.createElement("a");
      postLink.href = `https://entav78.github.io/FED1-exam/post/index.html?id=${post.id}`;
      postLink.className = "post-link";

      const postImage = document.createElement("img");
  if (post.media && post.media.url) {
    postImage.src = post.media.url; 
    postImage.alt = post.media.alt || post.title || 'Post Image'; 
    postImage.className = "post-image";
  } else {
    postImage.style.display = "none"; 
    console.warn("No image URL provided for this post.");
  }

      const postTitle = document.createElement("h3");
      postTitle.textContent = post.title || "Untitled Post";

      const postExcerpt = document.createElement("p");
      postExcerpt.textContent = post.body ? `${post.body.substring(0, 100)}...` : 'No content available...';

      const manageButton = document.createElement("button");
      manageButton.className = "manage-button";
      manageButton.textContent = "Edit/Manage";
      manageButton.style.display = "none"; 

      postLink.appendChild(postImage);
      postLink.appendChild(postTitle);
      postLink.appendChild(postExcerpt);

      postCard.appendChild(postLink);
      postCard.appendChild(manageButton);

      postContainer.appendChild(postCard);
    });

    initializeManageButton();

  } catch (error) {
    console.error("Error loading posts:", error);
    postContainer.innerHTML = '<p>Failed to load posts. Please try again later.</p>';
  }
}


