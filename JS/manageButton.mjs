// manageButton.mjs
export function initializeManageButton() {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  document.querySelectorAll('.manage-button').forEach((button) => {
    if (isLoggedIn) {
      button.style.display = 'inline-block'; // Show the button if logged in
    } else {
      button.style.display = 'none'; // Hide the button if not logged in
    }

    // Add click listener to handle button action
    button.addEventListener('click', function (event) {
      event.preventDefault();
      // Retrieve the post ID from the closest parent element with class 'blog-post'
      const parentPost = button.closest('.blog-post');
      const postId = parentPost ? parentPost.getAttribute('data-post-id') : null;
      console.log('Clicked button with post ID:', postId); // Log the post ID to check if it's retrieved
      redirectToManage(postId); // Call redirectToManage when clicked
    });
  });

  console.log('Initializing Manage Buttons');
  document.querySelectorAll('.manage-button').forEach((button) => {
    console.log('Current button display:', button.style.display);
  });
}

function redirectToManage(postId) {
  if (postId) {
    // Redirect to the edit page with the post ID in the query string
    window.location.href = `/post/edit.html?id=${postId}`;
  } else {
    console.error('Post ID not found. Cannot redirect to manage/edit page.');
  }
}


