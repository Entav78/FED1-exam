// manageButton.mjs
export function initializeManageButton() {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  document.querySelectorAll('.manage-button').forEach((button) => {
    if (isLoggedIn) {
      button.style.display = 'inline-block'; // Show the button if logged in
    } else {
      button.style.display = 'none'; // Hide the button if not logged in
    }
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
