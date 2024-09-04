import { loadPostData, createPost, updatePost } from "./postActions.mjs";
import { handleDelete, handleUndoButton } from "./undoHandler.mjs";
import { getUrlParameter } from "./utils.mjs";

// Main control flow when the document is ready
document.addEventListener("DOMContentLoaded", function () {
  const editPostForm = document.getElementById("editPostForm");
  const postId = getUrlParameter("id"); // Get post ID from URL

  if (postId) {
    loadPostData(postId); // Load existing post data if editing
  }

  editPostForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    const post = {
      title: document.getElementById("title").value,
      body: document.getElementById("content").innerHTML,
      tags: [],
      media: {
        url: document.getElementById("imageUrl").value || "",
        alt: document.getElementById("title").value || "Post image",
      },
    };

    if (postId) {
      await updatePost(postId, post);
    } else {
      await createPost(post);
    }
  });

  handleUndoButton(); // Initialize undo button listener
});



