export function generatePostHtml(post) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("blog-post");
  
    const postTitle = document.createElement("h2");
    postTitle.textContent = post.title;
  
    const postContent = document.createElement("p");
    postContent.textContent = post.content;
  
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
      window.location.href = `/edit.html?id=${post.id}`;
    });
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this post?")) {
        deletePost(post.id);
      }
    });

    postContainer.append(postTitle, postContent, editButton, deleteButton);

    return postContainer;
  }

  export async function deletePost(postId) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }
  
      alert("Post deleted successfully!");
      window.location.href = "/posts.html";
      
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  }