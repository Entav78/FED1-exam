// postActions.mjs
import { getPostsEndpoint } from "../endpoints.mjs"; 
import { fetchData } from "../fetchData.mjs"; // Assuming fetchData is used for standard fetch requests

// Function to create a new post
export async function createPost(post) {
  const postsEndpoint = getPostsEndpoint();
  if (!postsEndpoint) {
    console.error("Cannot create post: User not authenticated.");
    return;
  }

  try {
    const response = await fetchData(postsEndpoint, "POST", post);
    if (!response.ok) {
      throw new Error("Failed to create post.");
    }
    alert("Post created successfully!");
    window.location.href = "/post/index.html";
  } catch (error) {
    console.error("Failed to create post:", error);
  }
}

// Function to update an existing post
export async function updatePost(postId, post) {
  const postsEndpoint = getPostsEndpoint();
  try {
    const response = await fetchData(`${postsEndpoint}/${postId}`, "PUT", post);
    if (!response.ok) {
      throw new Error("Failed to update post.");
    }
    alert("Post updated successfully!");
    window.location.href = "/post/index.html";
  } catch (error) {
    console.error("Failed to update post:", error);
  }
}

// Function to load existing post data for editing
export async function loadPostData(postId) {
  const postsEndpoint = getPostsEndpoint();
  if (!postsEndpoint) {
    console.error("Posts endpoint could not be determined.");
    return;
  }

  try {
    const response = await fetchData(`${postsEndpoint}/${postId}`, "GET");
    if (!response.ok) {
      throw new Error("Failed to load post data.");
    }
    const data = await response.json();
    document.getElementById("title").value = data.title;
    document.getElementById("content").innerHTML = data.body;
    document.getElementById("imageUrl").value = data.media.url;
  } catch (error) {
    console.error("Failed to load post data:", error);
  }
}

