import './header.mjs';
import { createPost, updatePost, loadPostData } from '../JS/Post/handlePostForm.mjs';

document.addEventListener("DOMContentLoaded", function () {
  const editPostForm = document.getElementById("editPostForm");
  const actionButton = document.getElementById("actionButton");
  const deletePostButton = document.getElementById("deletePostButton");
  const imageUrlInput = document.getElementById("imageUrl");
  const contentField = document.getElementById("content");

  // Warn if critical elements are missing
  if (!editPostForm) console.warn('Edit Post Form not found. Please check the HTML for id="editPostForm".');
  if (!actionButton) console.warn('Action Button not found. Please check the HTML for id="actionButton".');
  if (!deletePostButton) console.warn('Delete Post Button not found. Please check the HTML for id="deletePostButton".');
  if (!imageUrlInput) console.warn('Image URL Input not found. Please check the HTML for id="imageUrl".');
  if (!contentField) console.warn('Content Field not found. Please check the HTML for id="content".');

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  const userName = localStorage.getItem("userName");
  if (!userName) console.warn('User name not found in local storage.');

  // Set the author's name automatically if available
  const authorField = document.getElementById("author");
  if (authorField && userName) {
    authorField.value = userName;
    authorField.disabled = true;
  } else if (!authorField) {
    console.warn('Author field not found. Please check the HTML for id="author".');
  }

  // Set action button text based on whether editing or creating a new post
  if (postId) {
    if (actionButton) actionButton.textContent = "Update Post";
    loadPostData(postId);
  } else {
    if (actionButton) actionButton.textContent = "Publish Post";
  }

  // Add event listener to handle form submission
  if (editPostForm) {
    editPostForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      // Check if required fields are correctly populated
      const title = document.getElementById("title") ? document.getElementById("title").value : '';
      const content = contentField ? contentField.innerHTML : '';
      const imageUrl = imageUrlInput ? imageUrlInput.value : '';

      if (!title) console.warn('Title is empty or not found.');
      if (!content) console.warn('Content is empty or content field not found.');
      if (!imageUrl) console.warn('Image URL is empty or imageUrlInput not found.');

      // Create the post object to send to your API
      const post = {
        title: title,
        author: userName, // The author's name, typically the logged-in user
        publicationDate: postId ? undefined : new Date().toISOString(), // Set only during creation
        body: content,
        media: {
          url: imageUrl,
          alt: title || "Post image",
        },
      };

      console.log('Submitting Post Object:', post); // Log the post object being sent for further debugging

       // Call your function to create or update the post
      if (postId) {
        // Remove publicationDate if updating since it's not editable
        delete post.publicationDate;
        await updatePost(postId, post);
      } else {
        await createPost(post);
      }
    });
  } else {
    console.warn('Edit Post Form not found. Please check the HTML for id="editPostForm".');
  }

  // Add event listener for the delete button
  if (deletePostButton) {
    deletePostButton.addEventListener("click", async function () {
      if (!postId) {
        console.warn('Post ID not found; cannot delete post.');
        return;
      }

      if (confirm("Are you sure you want to delete this post?")) {
        await deletePost(postId);
      }
    });
  }
});

// Function to insert HTML at the cursor position in the contenteditable div
function insertAtCursor(editableDiv, html) {
  if (!editableDiv) {
    console.warn('Editable div not found or not provided.');
    return;
  }

  editableDiv.focus();
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  range.deleteContents();

  const fragment = range.createContextualFragment(html + '<p><br></p>');
  range.insertNode(fragment);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}


