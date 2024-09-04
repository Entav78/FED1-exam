export function generatePostHtml(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("blog-post");

  // Create post title
  const postTitle = document.createElement("h2");
  postTitle.textContent = post.title || "No title found";

  // Create post author
  const postAuthor = document.createElement("p");
  postAuthor.textContent = `By: ${post.author.name || post.author}`;

  // Create post publication date
  const postDate = document.createElement("p");
  postDate.textContent = `Published on: ${new Date(post.publicationDate).toLocaleDateString()}`;

  // Create post image
  const postImage = document.createElement("img");
  if (post.media && post.media.url) {
    postImage.src = post.media.url;
    postImage.alt = post.media.alt || post.title;
    postImage.style.border = "2px solid red"; // Debug: Add a border to check visibility
    postImage.style.display = "block"; // Ensure the image is displayed
    postImage.style.width = "auto"; // Adjust width if needed
    console.log("Image created with URL:", post.media.url); // Log to ensure URL is correct
  } else {
    postImage.style.display = "none";
    console.warn("No image URL provided for this post.");
  }

  // Create post content
  const postContent = document.createElement("p");
  postContent.textContent = post.body || "No content available."; // Adjust as needed for actual body content

  // Create manage button (Edit/Manage)
  const manageButton = document.createElement("button");
  manageButton.className = "manage-button";
  manageButton.style.display = "none"; // Initially hidden; shown by initializeManageButton if user has permission
  manageButton.textContent = "Edit/Manage";

  // Append all elements to the post container
  postContainer.append(postTitle, postAuthor, postDate, postImage, postContent, manageButton);

  return postContainer;
}

// Function to delete a post
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
    window.location.href = "/post/index.html";
    
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
}
