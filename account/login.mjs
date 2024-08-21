document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission
  
  // Get the input values
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Call the API to authenticate the user
  login(username, password);
});

function login(username, password) {
  fetch('https://docs.noroff.dev/docs/v2/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
  })
  .then(response => response.json())
  .then(data => {
      if (data.token) {
          // Store the token in local storage or cookies
          localStorage.setItem('authToken', data.token);
          // Redirect to the admin dashboard or show success message
          window.location.href = '/admin-dashboard.html';
      } else {
          // Show error message
          document.getElementById('error-message').innerText = 'Invalid credentials';
      }
  })
  .catch(error => console.error('Error:', error));
}
