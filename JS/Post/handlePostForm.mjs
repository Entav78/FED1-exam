import { getPostsEndpoint } from "../endpoints.mjs"; // Use the dynamic function
import { fetchData } from "../fetchData.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const editPostForm = document.getElementById("editPostForm");

  // Determine if we are creating or editing a post based on the URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (postId) {
    loadPostData(postId); // If editing, load existing post data
  }

  editPostForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Create the post object based on the expected API structure
    const post = {
      title: document.getElementById("title").value,
      body: document.getElementById("content").innerHTML, // Adjusted to handle contenteditable div if used
      tags: [], // Add logic to handle tags if needed
      media: {
        url: document.getElementById("imageUrl").value || "", // Update this if handling file inputs differently
        alt: document.getElementById("title").value || "Post imageUrl",
      },
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
export async function loadPostData(postId) {
  const postsEndpoint = getPostsEndpoint();
  if (!postsEndpoint) {
    console.error("Posts endpoint could not be determined.");
    return;
  }

  try {
    const response = await fetchData(`${postsEndpoint}/${postId}`, "GET");
    document.getElementById("title").value = response.title;
    document.getElementById("content").innerHTML = response.body; // Adjusted to handle contenteditable div
    document.getElementById("imageUrl").value = response.media.url; // Update if handling file inputs differently
  } catch (error) {
    console.error("Failed to load post data:", error);
  }
}

  export async function createPost(post) {
    const postsEndpoint = getPostsEndpoint();
    if (!postsEndpoint) {
      alert("Cannot create post: User not authenticated.");
      return;
    }

    console.log("Post object being sent:", post); // Debugging: Log the post object being sent
    try {
      // Make the POST request to create the post
      const response = await fetchData(postsEndpoint, "POST", post);
      console.log("Create Post Response:", response); // Log the response to inspect its contents

      // Check if the response status is 201, indicating successful creation
      if (response && response.data && response.data.id) {
        alert("Post created successfully!");
        window.location.href = "/post/index.html"; // Redirect to posts list page after creation
      } else {
        // Handle case where the response does not indicate a successful creation
        const errorMessage = response.message || "Unknown error occurred while creating the post.";
        alert("Failed to create post: " + errorMessage);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      alert("Failed to create post: An unexpected error occurred.");
    }
  }

// Function to update an existing post
export async function updatePost(postId, post) {
  const postsEndpoint = getPostsEndpoint();
  if (!postsEndpoint) {
    alert("Cannot update post: User not authenticated.");
    return;
  }

  console.log("Post object being updated:", post); // Debugging: Log the post object being sent
  try {
    const response = await fetchData(`${postsEndpoint}/${postId}`, "PUT", post);
    console.log("Update Post Response:", response); // Log the response to inspect its contents
    if (response.success) {
      alert("Post updated successfully!");
      window.location.href = "/post/index.html"; // Redirect to posts list page after update
    } else {
      alert("Failed to update post: " + (response.message || "Unknown error")); // Handle potential error messages
    }
  } catch (error) {
    console.error("Failed to update post:", error);
  }
}



