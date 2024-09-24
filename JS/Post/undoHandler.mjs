// Global variables for undo functionality
let undoTimer;
let deletedPost;

// Function to handle deleting the post with undo option
export async function handleDelete(postId) {
  const confirmation = confirm('Are you sure you want to delete this post? This action cannot be undone.');
  if (!confirmation) return;

  const postItem = document.querySelector(`.post-item[data-post-id="${postId}"]`);
  if (!postItem) return;

  deletedPost = postItem;
  postItem.style.display = 'none'; 
  document.getElementById('undo-container').style.display = 'block'; 

  undoTimer = setTimeout(async () => {
    await permanentlyDeletePost(postId);
  }, 10000); 

 // Clear any existing timers before starting a new one
 clearTimeout(undoTimer);

 undoTimer = setTimeout(async () => {
   await permanentlyDeletePost(postId);
 }, 10000); 
}

// Function to handle permanent deletion
async function permanentlyDeletePost(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      alert('Post deleted permanently.');
      document.getElementById('undo-container').style.display = 'none';
      deletedPost.remove();
    } else {
      handleErrorInDelete();
    }
  } catch (error) {
    handleErrorInDelete();
  }
}

// Handle delete errors and restore post
function handleErrorInDelete() {
  alert('Failed to delete the post. Please try again.');
  deletedPost.style.display = 'block';
  document.getElementById('undo-container').style.display = 'none';
}

// Function to handle undo button click
export function handleUndoButton() {
  const undoButton = document.getElementById('undo-button');
  if (!undoButton) {
    console.warn('Undo button not found.');
    return;
  }

  undoButton.addEventListener('click', () => {
    clearTimeout(undoTimer); // Stop the timer
    deletedPost.style.display = 'block'; // Show the deleted post
    document.getElementById('undo-container').style.display = 'none'; // Hide the undo container
    alert('Post restored.'); // Notify the user
  });
}
