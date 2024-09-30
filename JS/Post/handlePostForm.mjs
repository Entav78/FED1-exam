import { loadPostData, createPost, updatePost } from "./postActions.mjs";
import { handleDelete, handleUndoButton } from "./undoHandler.mjs";
import { getUrlParameter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", function () {
  const editPostForm = document.getElementById("editPostForm");
  const postId = getUrlParameter("id"); 

  if (postId) {
    loadPostData(postId);
  }

  editPostForm.addEventListener("submit", async function (event) {
    event.preventDefault();

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

  handleUndoButton();
});



