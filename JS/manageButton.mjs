// manageButton.mjs
export function initializeManageButton() {
  const isLoggedIn = !!localStorage.getItem('accessToken');

  document.querySelectorAll('.manage-button').forEach((button) => {
    if (isLoggedIn) {
      button.style.display = 'inline-block';
    } else {
      button.style.display = 'none';
    }

    button.addEventListener('click', function (event) {
      event.preventDefault();
      const parentPost = button.closest('.blog-post');
      const postId = parentPost ? parentPost.getAttribute('data-post-id') : null;
      console.log('Clicked button with post ID:', postId); 
      redirectToManage(postId); 
    });
  });

  console.log('Initializing Manage Buttons');
  document.querySelectorAll('.manage-button').forEach((button) => {
    console.log('Current button display:', button.style.display);
  });
}

function redirectToManage(postId) {
  if (postId) {
    window.location.href = `/post/edit.html?id=${postId}`;
  } else {
    console.error('Post ID not found. Cannot redirect to manage/edit page.');
  }
}


