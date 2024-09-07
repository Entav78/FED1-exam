import './header.mjs';
import { createPost, updatePost, loadPostData, deletePost } from './Post/postActions.mjs'; // Ensure deletePost is imported
import { getUrlParameter } from './Post/utils.mjs'; // Utility function to get query parameters

document.addEventListener("DOMContentLoaded", function () {
  const editPostForm = document.getElementById("editPostForm");
  const actionButton = document.getElementById("actionButton");
  const deletePostButton = document.getElementById("deletePostButton");
  const imageUrlInput = document.getElementById("imageUrl");
  const contentField = document.getElementById("content");

  // Get the post ID from the URL
  const postId = getUrlParameter("id");

  // Load existing post data if postId is present
  if (postId) {
    if (actionButton) actionButton.textContent = "Update Post";
    loadPostData(postId); // Load post data into form fields
  } else {
    if (actionButton) actionButton.textContent = "Publish Post";
  }

  // Set up event listener for form submission (create or update post)
  if (editPostForm) {
    editPostForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      // Collect input data
      const title = document.getElementById("title")?.value || '';
      const content = contentField ? contentField.innerHTML : '';
      const imageUrl = imageUrlInput?.value || '';
      const userName = localStorage.getItem("userName");

      // Check if required fields are correctly populated
      if (!title) console.warn('Title is empty or not found.');
      if (!content) console.warn('Content is empty or content field not found.');
      if (!imageUrl) console.warn('Image URL is empty or imageUrlInput not found.');

      // Prepare the post object
      const post = {
        title: title,
        author: userName, // Use the logged-in user's name
        publicationDate: postId ? undefined : new Date().toISOString(), // Set only during creation
        body: content,
        media: {
          url: imageUrl,
          alt: title || "Post image",
        },
      };

      console.log('Submitting Post Object:', post); // Log the post object for debugging

      // Decide whether to update or create a post based on the presence of postId
      if (postId) {
        post.updatedDate = new Date().toISOString(); // Set updatedDate during editing
        delete post.publicationDate; // Remove publicationDate to avoid modifying it
        await updatePost(postId, post);
      } else {
        await createPost(post);
      }
    });
  } else {
    console.warn('Edit Post Form not found. Please check the HTML for id="editPostForm".');
  }

  // Event listener for delete button
  if (deletePostButton) {
    deletePostButton.addEventListener("click", function () {
      if (!postId) {
        console.warn('Post ID not found; cannot delete post.');
        return;
      }
      deleteModal.style.display = "block"; // Show the modal
    });
  }

  // Close modal actions
  closeModal.addEventListener("click", () => (deleteModal.style.display = "none"));
  cancelDelete.addEventListener("click", () => (deleteModal.style.display = "none"));

  // Confirm delete action
  confirmDelete.addEventListener("click", async function () {
    await deletePost(postId); // Call delete function on confirmation
  });
});

// Utility function to load post data when the page loads
async function handleEdit(postId) {
  console.log(`Editing post with ID: ${postId}`);
  // Add any additional edit-specific handling here if needed
}

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



