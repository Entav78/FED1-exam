import './header.mjs';
import { createPost, updatePost, loadPostData } from '../JS/Post/handlePostForm.mjs';

document.addEventListener("DOMContentLoaded", function () {
  const editPostForm = document.getElementById("editPostForm");
  const actionButton = document.getElementById("actionButton");
  const deletePostButton = document.getElementById("deletePostButton");
  const imageFileInput = document.getElementById("imageFile");
  const contentField = document.getElementById("content"); // Now a contenteditable div

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const userName = localStorage.getItem("userName");

  // Set the author's name automatically if available
  const authorField = document.getElementById("author");
  if (authorField && userName) {
    authorField.value = userName;
    authorField.disabled = true;
  }

  // Set action button text based on whether editing or creating a new post
  if (postId) {
    if (actionButton) actionButton.textContent = "Update Post";
    loadPostData(postId);
  } else {
    if (actionButton) actionButton.textContent = "Publish Post";
  }

  // Add event listener to handle image upload and insertion
  if (imageFileInput) {
    imageFileInput.addEventListener("change", function () {
      const file = imageFileInput.files[0];

      // Check if a file is selected and it's an image
      if (file && /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const imgTag = `<img src="${event.target.result}" alt="Uploaded Image" style="max-width: 100%;">`;
          insertAtCursor(contentField, imgTag);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please select a valid image file (JPG, JPEG, PNG, GIF, BMP, WEBP).");
      }
    });
  } else {
    console.warn('Image file input not found. Check if the input exists in your HTML with id="imageFile".');
  }

// Add event listener for the action button (Publish/Update Post)
if (actionButton) {
  actionButton.addEventListener("click", async function (event) {
    event.preventDefault();

    // Handle the image upload first
    const file = imageFileInput.files[0];
    let imageUrl = ""; // Initialize image URL as empty string

    if (file && /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp)$/i.test(file.name)) {
      // Read the image as Data URL
      const reader = new FileReader();
      reader.onload = function (event) {
        imageUrl = event.target.result; // Use the data URL as the image
        createOrUpdatePost(imageUrl); // Call the function to create or update the post
      };
      reader.readAsDataURL(file);
    } else {
      // If no valid image is selected, proceed with empty or existing image URL
      createOrUpdatePost(imageUrl);
    }

    // Function to create or update the post
    async function createOrUpdatePost(imageUrl) {
      const post = {
        title: document.getElementById("title").value,
        author: userName || (authorField ? authorField.value : ""),
        publicationDate: postId ? document.getElementById("publicationDate").value : new Date().toISOString(),
        image: imageUrl, // Use the image URL obtained from the file reader
        content: contentField.innerHTML, // Get the HTML content of the editable div
      };

      if (postId) {
        await updatePost(postId, post);
      } else {
        await createPost(post);
      }
    }
  });
} else {
  console.warn('Action button not found. Please check the HTML for id="actionButton".');
}

// Add event listener for the delete button
if (deletePostButton) {
  deletePostButton.addEventListener("click", async function () {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost(postId);
    }
  });
} else {
  console.warn('Delete button not found. Please check the HTML for id="deletePostButton".');
}

});

// Function to insert HTML at the cursor position in the contenteditable div
function insertAtCursor(editableDiv, html) {
  editableDiv.focus();
  
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  range.deleteContents(); // Optionally remove the selected content before inserting

  // Create a document fragment to hold the HTML to be inserted
  const fragment = range.createContextualFragment(html + '<p><br></p>');

  // Insert the fragment at the cursor position
  range.insertNode(fragment);

  // Move the cursor after the inserted content
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}



  
      


/*document.addEventListener("DOMContentLoaded", function() {
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
*/


