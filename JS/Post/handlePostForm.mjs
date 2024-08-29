import { API_URL } from "./constants.mjs";
import { fetchData } from "./fetchData.mjs";
import { checkAuthentication } from "./auth.mjs";

document.addEventListener("DOMContentLoaded", function() {
  const editPostForm = document.getElementById("editPostForm");
  const postIdField = document.getElementById("postId");

  // Determine if we are creating or editing a post based on the URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    loadPostData(postId); // If editing, load existing post data
  }

  editPostForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const post = {
      title: document.getElementById("title").value,
      content: document.getElementById("content").value,
      image: document.getElementById("image").value
    };

    if (postId) {
      // Update an existing post
      await updatePost(postId, post);
    } else {
      // Create a new post
      await createPost(post);
    }
  });
});

// Function to load existing post data for editing
async function loadPostData(postId) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error("Failed to load post data.");
    }

    const post = await response.json();
    document.getElementById("title").value = post.title;
    document.getElementById("content").value = post.content;
    document.getElementById("image").value = post.image;
  } catch (error) {
    console.error("Failed to load post data:", error);
  }
}

// Function to create a new post
async function createPost(post) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(post)
    });

    if (!response.ok) {
      throw new Error("Failed to create post.");
    }

    alert("Post created successfully!");
    window.location.href = "/posts.html"; // Redirect to posts list page after creation
  } catch (error) {
    console.error("Failed to create post:", error);
  }
}

// Function to update an existing post
async function updatePost(postId, post) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(post)
    });

    if (!response.ok) {
      throw new Error("Failed to update post.");
    }

    alert("Post updated successfully!");
    window.location.href = "/posts.html"; // Redirect to posts list page after update
  } catch (error) {
    console.error("Failed to update post:", error);
  }
}
