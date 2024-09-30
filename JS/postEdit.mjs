
import './header.mjs';
import { createPost, updatePost, loadPostData, deletePost } from './Post/postActions.mjs';
import { getUrlParameter } from './Post/utils.mjs';

document.addEventListener("DOMContentLoaded", function () {
  const editPostForm = document.getElementById("editPostForm");
  const actionButton = document.getElementById("actionButton");
  const deletePostButton = document.getElementById("deletePostButton");

  
  const postId = getUrlParameter("id");
  console.log("Post ID retrieved:", postId); 
 
if (postId) {
  if (actionButton) actionButton.textContent = "Update Post";
  loadPostData(postId)
    .then(() => {
      console.log("Post data loaded successfully.");
    })
    .catch(error => {
      console.error("Failed to load post data:", error);
      alert("Failed to load post data. Please try again later.");
    });

  if (deletePostButton) deletePostButton.style.display = "block"; 
} else {
  if (actionButton) actionButton.textContent = "Publish Post";
}

  if (editPostForm) {
    editPostForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const imageUrlInput = document.getElementById("imageUrl");
      const contentField = document.getElementById("content");

      const title = document.getElementById("title")?.value || '';
      const content = contentField ? contentField.innerHTML : '';
      const imageUrl = imageUrlInput?.value || '';
      const userName = localStorage.getItem("userName");

      const post = {
        title: title,
        author: userName,
        publicationDate: postId ? undefined : new Date().toISOString(),
        body: content,
        media: {
          url: imageUrl,
          alt: title || "Post image",
        },
      };

      try {
        if (postId) {
          post.updatedDate = new Date().toISOString();
          delete post.publicationDate;
          await updatePost(postId, post);
        } else {
          await createPost(post);
        }
      } catch (error) {
        console.error("Failed to submit the post:", error);
        alert("Failed to submit the post. Please try again.");
      }
    });
  } else {
    console.warn('Edit Post Form not found. Please check the HTML for id="editPostForm".');
  }

  
  if (deletePostButton) {
    deletePostButton.addEventListener("click", function () {
      if (!postId) {
        console.warn('Post ID not found; cannot delete post.');
        alert('Post ID not found; cannot delete post.');
        return;
      }

      const deleteModal = document.getElementById('deleteModal');
      deleteModal.style.display = "block";
    });
  }
  
  const closeModal = document.getElementById('closeModal');
  const cancelDelete = document.getElementById('cancelDelete');

  if (closeModal && cancelDelete) {
    closeModal.addEventListener("click", () => {
      document.getElementById('deleteModal').style.display = "none";
    });
    cancelDelete.addEventListener("click", () => {
      document.getElementById('deleteModal').style.display = "none";
    });
  }

  const confirmDelete = document.getElementById('confirmDelete');
  if (confirmDelete) {
    confirmDelete.addEventListener("click", async function () {
      try {
        await deletePost(postId);
      } catch (error) {
        console.error("Failed to delete the post:", error);
        alert("Failed to delete the post. Please try again.");
      }
    });
  }
});

function insertAtCursor(editableDiv, html) {
  if (!editableDiv) {
    console.warn('Editable div not found or not provided.');
    alert('Editable div not found or not provided.');
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





