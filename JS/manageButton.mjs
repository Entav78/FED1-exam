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
      redirectToManage(postId); 
    });
  });
}

function redirectToManage(postId) {
  if (postId) {
    window.location.href = `https://entav78.github.io/FED1-exam/post/edit.html?id=${postId}`;
  } else {
    console.error('Post ID not found. Cannot redirect to manage/edit page.');
  }
}


