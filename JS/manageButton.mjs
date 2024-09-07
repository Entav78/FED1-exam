// Function to initialize Manage Button visibility and setup redirection
export function initializeManageButton() {
  const isLoggedIn = !!localStorage.getItem('accessToken'); // Check if the user is logged in

  // Find all manage buttons within posts
  document.querySelectorAll('.manage-button').forEach(button => {
    const postId = button.closest('.blog-post').getAttribute('data-post-id'); // Get the post ID from the parent element

    // Show button only if the user is logged in
    if (isLoggedIn) {
      button.style.display = 'inline-block'; // Show the button

      // Set up the click event to redirect to the manage post page
      button.addEventListener('click', () => {
        window.location.href = `/post/edit.html?id=${postId}`; // Redirect to edit page with the post ID
      });
    }
  });
}

// Call initializeManageButton to activate buttons on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeManageButton();
});


function redirectToManage(postId) {
  if (postId) {
    // Redirect to the edit page with the post ID in the query string
    window.location.href = `/post/edit.html?id=${postId}`;
  } else {
    console.error('Post ID not found. Cannot redirect to manage/edit page.');
  }
}
