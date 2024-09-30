let undoTimer;
let deletedPost;

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

 clearTimeout(undoTimer);

 undoTimer = setTimeout(async () => {
   await permanentlyDeletePost(postId);
 }, 10000); 
}

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

function handleErrorInDelete() {
  alert('Failed to delete the post. Please try again.');
  deletedPost.style.display = 'block';
  document.getElementById('undo-container').style.display = 'none';
}

export function handleUndoButton() {
  const undoButton = document.getElementById('undo-button');
  if (!undoButton) {
    console.warn('Undo button not found.');
    return;
  }

  undoButton.addEventListener('click', () => {
    clearTimeout(undoTimer);
    deletedPost.style.display = 'block'; 
    document.getElementById('undo-container').style.display = 'none'; 
    alert('Post restored.'); 
  });
}
