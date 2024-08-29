export function generatePostHtml(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("blog-post");

  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title;

  const postAuthor = document.createElement("p");
  postAuthor.textContent = `By: ${post.author}`;

  const postDate = document.createElement("p");
  postDate.textContent = `Published on: ${new Date(post.publicationDate).toLocaleDateString()}`;

  const postImage = document.createElement("img");
  postImage.src = post.image;
  postImage.alt = post.title;

  const postContent = document.createElement("p");
  postContent.textContent = post.content;

  postContainer.append(postTitle, postAuthor, postDate, postImage, postContent);

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