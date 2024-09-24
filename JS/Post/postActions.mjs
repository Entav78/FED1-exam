// postActions.mjs

import { getPostsEndpoint } from "../endpoints.mjs";
import { fetchData } from "../fetchData.mjs"; // Assuming fetchData is a utility function for API requests

// 1. Create a new post
export async function createPost(post) {
  const postsEndpoint = getPostsEndpoint();
  if (!postsEndpoint) {
    console.error("Cannot create post: User not authenticated.");
    return;
  }

  try {
    const responseData = await fetchData(postsEndpoint, "POST", post);
    const postId = responseData.data.id;
    if (!postId) {
      throw new Error("Post ID not returned from server.");
    }

    alert("Post created successfully!");
    window.location.href = `/post/index.html?id=${postId}`;
  } catch (error) {
    console.error("Failed to create post:", error);
    alert(`Error creating post: ${error.message}`);
  }
}

// Load existing post data for editing
export async function loadPostData(postId) {
  const postsEndpoint = getPostsEndpoint(); // Ensure this fetches the correct endpoint for posts
  if (!postsEndpoint) {
    console.error("Posts endpoint could not be determined.");
    document.getElementById("message").textContent = "Error: Cannot determine endpoint.";
    return;
  }

  try {
    // Fetch the post data using the postId
    const response = await fetchData(`${postsEndpoint}/${postId}`, "GET");
    
    // Access the correct structure of the response
    const postData = response.data || response; // Adjust to ensure correct data path
    console.log("Fetched post data:", postData);

    // Populate form fields with the fetched post data
    document.getElementById("title").value = postData.title || "Untitled";
    document.getElementById("author").value = postData.author?.name || postData.author || ""; // Handle potential structures
    document.getElementById("publicationDate").value = new Date(postData.publicationDate || postData.created).toLocaleDateString();
    document.getElementById("content").innerHTML = postData.body || "";
    document.getElementById("imageUrl").value = postData.media?.url || "";

  } catch (error) {
    console.error("Failed to load post data:", error);
    document.getElementById("message").textContent = "Failed to load post. Please try again.";
  }
}

/*
// 2. Load existing post data for editing
export async function loadPostData(postId) {
  const postsEndpoint = getPostsEndpoint();
  if (!postsEndpoint) {
    console.error("Posts endpoint could not be determined.");
    document.getElementById("message").textContent = "Error: Cannot determine endpoint.";
    return;
  }

  try {
    // Fetch the post data
    const response = await fetchData(`${postsEndpoint}/${postId}`, "GET");
    
    // Check and access the correct structure of the response
    const postData = response.data || response; // Ensure you get the data property or fallback to response itself
    console.log("Fetched post data:", postData);

    // Safely access properties, with fallback values if not available
    const title = postData.title || "Untitled";
    const authorName = postData.author?.name || ""; // Optional chaining used here
    const bodyContent = postData.body || "";
    const imageUrl = postData.media?.url || "";

    // Populate form fields with the fetched post data
    document.getElementById("title").value = title;
    document.getElementById("author").value = authorName;
    document.getElementById("publicationDate").value = new Date(postData.publicationDate || postData.created).toLocaleDateString();
    document.getElementById("content").innerText = bodyContent;
    document.getElementById("imageUrl").value = imageUrl;

  } catch (error) {
    console.error("Failed to load post data:", error);
    document.getElementById("message").textContent = "Failed to load post. Please try again.";
  }
}
*/
// Updated updatePost function in postActions.mjs
export async function updatePost(postId, post) {
  const postsEndpoint = getPostsEndpoint();

  try {
    const { response, data } = await fetchData(`${postsEndpoint}/${postId}`, "PUT", post);

    // Check if the response is successful
    if (response.ok) {
      alert("Post updated successfully!"); // Show success message
      window.location.href = `/post/index.html?id=${postId}`; // Redirect to view the updated post
    } else {
      // Handle unexpected status codes as errors
      console.error("Error response:", data);
      alert("Failed to update the post. Please try again.");
    }
  } catch (error) {
    console.error("Failed to update post:", error);
    alert("Failed to update the post due to a network error. Please try again.");
  }
}

/*
// Updated updatePost function in postActions.mjs
export async function updatePost(postId, post) {
  const postsEndpoint = getPostsEndpoint();

  try {
    const response = await fetchData(`${postsEndpoint}/${postId}`, "PUT", post);

    // Check if the response is successful
    if (response.ok || response.status === 200) {
      alert("Post updated successfully!"); // Show success message
      window.location.href = `/post/index.html?id=${postId}`; // Redirect to view the updated post
    } else {
      throw new Error("Failed to update post.");
    }
  } catch (error) {
    console.error("Failed to update post:", error);
    alert("Failed to update the post. Please try again.");
  }
}
*/

// 4. Delete a post
export async function deletePost(postId) {
  const API_URL = "https://your-api-url.com"; // Ensure your API URL is correctly defined
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete post.");
    }

    alert("Post deleted successfully!");
    window.location.href = "/post/index.html";
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
}




/* postActions.mjs
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
    // Call fetchData to make the POST request
    const responseData = await fetchData(postsEndpoint, "POST", post);

    // Access the ID correctly from the returned data
    const postId = responseData.data.id;
    if (!postId) {
      throw new Error("Post ID not returned from server.");
    }

    // Redirect to the specific post using the new post's ID
    alert("Post created successfully!");
    window.location.href = `/post/index.html?id=${postId}`; // Redirect with the new post ID
  } catch (error) {
    // Handle any errors that occur during the fetch
    console.error("Failed to create post:", error);
    alert(`Error creating post: ${error.message}`);
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
    document.getElementById("message").textContent = "Error: Cannot determine endpoint.";
    return;
  }

  try {
    // Fetch post data from the correct endpoint
    const data = await fetchData(`${postsEndpoint}/${postId}`, "GET");
    
    // Validate that the response contains the necessary fields
    if (!data || !data.title || !data.body) {
      throw new Error("Post data is missing required properties.");
    }

    // Populate the form fields with the fetched post data
    document.getElementById("title").value = data.title || "";
    document.getElementById("author").value = data.author.name || data.author || "";
    document.getElementById("publicationDate").value = new Date(data.publicationDate || data.created).toLocaleDateString();
    document.getElementById("content").innerText = data.body || "";
    document.getElementById("imageUrl").value = data.media?.url || "";

  } catch (error) {
    console.error("Failed to load post data:", error);
    document.getElementById("message").textContent = "Failed to load post. Please try again.";
  }
}
*/
