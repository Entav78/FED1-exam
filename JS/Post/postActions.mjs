import { getPostsEndpoint, getPostEndpoint } from "../endpoints.mjs";
import { fetchData } from "../fetchData.mjs"; 

export async function createPost(post) {
  const postsEndpoint = getPostsEndpoint();
  if (!postsEndpoint) {
    console.error("Cannot create post: User not authenticated.");
    return;
  }

  try {
    const responseData = await fetchData(postsEndpoint, "POST", post);

    const postId = responseData.data?.data?.id || responseData.data?.id;
    if (!postId) {
      throw new Error("Post ID not returned from server.");
    }

    alert("Post created successfully!");
    window.location.href = `https://entav78.github.io/FED1-exam/post/index.html?id=${postId}`;
  } catch (error) {
    console.error("Failed to create post:", error);
    alert(`Error creating post: ${error.message}`);
  }
}

export async function loadPostData(postId) {
  const userName = localStorage.getItem('userName');
  
  // Ensure both username and postId are present
  if (!userName || !postId) {
    console.error("Username or Post ID is missing.");
    document.getElementById("message").textContent = "Error: Missing username or post ID.";
    return;
  }

  const postEndpoint = getPostEndpoint(userName, postId); // Correct usage of getPostEndpoint

  if (!postEndpoint) {
    console.error("Post endpoint could not be determined.");
    document.getElementById("message").textContent = "Error: Cannot determine endpoint.";
    return;
  }

  try {
    const response = await fetchData(postEndpoint, "GET");

    const postData = response.data ? response.data : response;

    const post = postData.data ? postData.data : postData; 

    const titleField = document.getElementById("title");
    const authorField = document.getElementById("author");
    const publicationDateField = document.getElementById("publicationDate");
    const contentField = document.getElementById("content");
    const imageUrlField = document.getElementById("imageUrl");

    if (titleField) {
      titleField.value = post.title || "Untitled";
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

  } catch (error) {
    console.error("Failed to load post data:", error);
    document.getElementById("message").textContent = "Failed to load post. Please try again.";
  }
}

export async function updatePost(postId, post) {
  const userName = localStorage.getItem('userName');
  const postEndpoint = getPostEndpoint(userName, postId); 
  try {
    const { response, data } = await fetchData(postEndpoint, "PUT", post); 
    if (response.ok) {
      alert("Post updated successfully!");
      window.location.href = `https://entav78.github.io/FED1-exam/post/index.html?id=${postId}`;
    } else {
      console.error("Error response:", data);
      alert("Failed to update the post. Please try again.");
    }
  } catch (error) {
    console.error("Failed to update post:", error);
    alert("Failed to update the post due to a network error. Please try again.");
  }
}

export async function deletePost(postId) {
  const userName = localStorage.getItem('userName');
  const postEndpoint = getPostEndpoint(userName, postId); 

  if (!postEndpoint) {
    console.error("Post endpoint could not be determined.");
    alert("Error: Unable to determine endpoint.");
    return;
  }

  try {
    const { response, data } = await fetchData(postEndpoint, "DELETE"); 

    if (!response.ok) {
      console.error("Failed to delete post:", response.status, data);
      alert(`Failed to delete post: ${response.statusText}`);
      return;
    }

    alert("Post deleted successfully!");
    window.location.href = "https://entav78.github.io/FED1-exam/post/index.html";
  } catch (error) {
    console.error("Failed to delete post:", error);
    alert("An error occurred while trying to delete the post. Please try again.");
  }
}


