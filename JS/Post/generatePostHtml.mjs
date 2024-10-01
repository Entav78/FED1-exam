export function generatePostHtml(post) {
  const postContainer = document.createElement("div");
  postContainer.classList.add("blog-post");

  postContainer.setAttribute("data-post-id", post.id); 

  const postTitle = document.createElement("h3");
  postTitle.textContent = post.title || "No title found";

  const postAuthor = document.createElement("p");
  postAuthor.textContent = `By: ${post.author.name || post.author}`;

  const rawDate = post.publicationDate || post.created || post.updated;
  const postDateObject = new Date(rawDate);
  const formattedDate = !isNaN(postDateObject)
    ? postDateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Unknown Date';

  const postDate = document.createElement("p");
  postDate.textContent = `Published on: ${formattedDate}`;

  // Create post image
  const postImage = document.createElement("img");
  if (post.media && post.media.url) {
    postImage.src = post.media.url;
    postImage.alt = post.media.alt || post.title;
    postImage.style.display = "block"; 
    postImage.style.width = "auto"; 
  } else {
    postImage.style.display = "none";
    console.warn("No image URL provided for this post.");
  }

  const postContent = document.createElement("p");
  postContent.textContent = post.body || "No content available."; 

  const manageButton = document.createElement("button");
  manageButton.className = "manage-button";
  manageButton.style.display = "none"; 
  manageButton.textContent = "Edit/Manage";

  postContainer.append(postTitle, postAuthor, postDate, postImage, postContent, manageButton);

  return postContainer;
}

