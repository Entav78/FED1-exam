// postActions.mjs

import { getPostsEndpoint } from "../endpoints.mjs";
import { fetchData } from "../fetchData.mjs"; 

export async function createPost(post) {
  const postsEndpoint = getPostsEndpoint();
  if (!postsEndpoint) {
    console.error("Cannot create post: User not authenticated.");
    return;
  }

  try {
    const responseData = await fetchData(postsEndpoint, "POST", post);
    console.log("Full Response Data:", responseData);

    const postId = responseData.data?.data?.id || responseData.data?.id;
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

export async function loadPostData(postId) {
  const postsEndpoint = getPostsEndpoint();

  if (!postsEndpoint) {
    console.error("Posts endpoint could not be determined.");
    document.getElementById("message").textContent = "Error: Cannot determine endpoint.";
    return;
  }

  try {
    const response = await fetchData(`${postsEndpoint}/${postId}`, "GET");
    
    const postData = response.data ? response.data : response; 
    console.log("Loaded Post Data:", postData);

    const post = postData.data ? postData.data : postData; 

    console.log("Final post object for setting fields:", post);

    // Populate form fields with the fetched post data
    const titleField = document.getElementById("title");
    const authorField = document.getElementById("author");
    const publicationDateField = document.getElementById("publicationDate");
    const contentField = document.getElementById("content");
    const imageUrlField = document.getElementById("imageUrl");

    if (titleField) {
      titleField.value = post.title || "Untitled";
      console.log("Title set to:", titleField.value);
    } else {
      console.warn("Title field not found.");
    }

    if (authorField) {
      authorField.value = post.author?.name || "";
    } else {
      console.warn("Author field not found.");
    }

    if (publicationDateField) {
      const rawDate = post.publicationDate || post.created;
      console.log("Raw date value:", rawDate);

      if (rawDate) {
        const dateObject = new Date(rawDate);

        if (!isNaN(dateObject.getTime())) {
          publicationDateField.value = dateObject.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        } else {
          publicationDateField.value = "Date Not Available";
          console.warn("Invalid date format:", rawDate);
        }
      } else {
        publicationDateField.value = "Date Not Available";
        console.warn("Publication date not provided.");
      }
    } else {
      console.warn("Publication date field not found.");
    }

    if (contentField) {
      contentField.innerText = post.body || "";
    } else {
      console.warn("Content field not found.");
    }

    if (imageUrlField) {
      imageUrlField.value = post.media?.url || "";
    } else {
      console.warn("Image URL field not found.");
    }

    console.log("Post data loaded successfully.");
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
    const { response, data } = await fetchData(`${postsEndpoint}/${username}/${postId}`, "PUT", post);

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
