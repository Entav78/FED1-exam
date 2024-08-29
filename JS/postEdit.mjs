import './Account/adminLoginLink.mjs';

document.addEventListener("DOMContentLoaded", function() {
  const editPostForm = document.getElementById("editPostForm");
  const actionButton = document.getElementById("actionButton");
  const deletePostButton = document.getElementById("deletePostButton");

  // Get the post ID from the URL to determine if we are editing an existing post
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  // Retrieve the logged-in user's name from localStorage
  const userName = localStorage.getItem("userName");

  // Automatically set the author field if userName is available
  const authorField = document.getElementById("author");
  if (userName) {
    authorField.value = userName; // Set the author field to the user's name
    authorField.disabled = true; // Make the field readonly
  }

  if (postId) {
    actionButton.textContent = "Update Post";
    loadPostData(postId); // Load the post data to populate the form fields
  } else {
    actionButton.textContent = "Publish Post";
  }

  actionButton.addEventListener("click", async function(event) {
    event.preventDefault();

    const post = {
      title: document.getElementById("title").value,
      author: userName || document.getElementById("author").value, // Use the stored name or the entered value
      publicationDate: postId ? document.getElementById("publicationDate").value : new Date().toISOString(),
      image: document.getElementById("image").value,
      content: document.getElementById("content").value,
    };

    if (postId) {
      await updatePost(postId, post);
    } else {
      await createPost(post);
    }
  });

  deletePostButton.addEventListener("click", async function(event) {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
    }
  });
});

// Function to load existing post data
async function loadPostData(postId) {
  console.log("Loading post data for editing...");
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
    document.getElementById("author").value = post.author;
    document.getElementById("publicationDate").value = new Date(post.publicationDate).toLocaleDateString();
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
        "Authorization": `Bearer ${token}`,
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
        "Authorization": `Bearer ${token}`,
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

// Function to delete a post
async function deletePost(postId) {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error("Failed to delete post.");
    }

    alert("Post deleted successfully!");
    window.location.href = "/posts.html"; // Redirect to posts list page after deletion
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
}



