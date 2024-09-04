export function initializeManageButton() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Example: Replace with actual authentication check
  const userId = localStorage.getItem('userId'); // Example: Fetch the user ID if needed

  // Show the "Edit/Manage" buttons only if the user has permissions
  if (isAdmin || userId) {
    document.querySelectorAll('.manage-button').forEach(button => {
      button.style.display = 'inline-block'; // Show the button
      button.addEventListener('click', function () {
        const postId = this.parentElement.getAttribute('data-post-id');
        redirectToManage(postId);
      });
    });
  }
}

function redirectToManage(postId) {
  if (postId) {
    // Redirect to the edit page with the post ID in the query string
    window.location.href = `/post/edit.html?id=${postId}`;
  } else {
    console.error('Post ID not found. Cannot redirect to manage/edit page.');
  }
}
