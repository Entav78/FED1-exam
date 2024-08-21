document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get the input values
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  // Basic validation: Check if passwords match
  if (password !== confirmPassword) {
      document.getElementById('register-error-message').innerText = 'Passwords do not match.';
      return;
  }

  // Prepare the data to be sent to the API
  const userData = {
      username: username,
      email: email,
      password: password
  };

  // Call the API to register the user
  fetch('https://docs.noroff.dev/docs/v2/auth/register', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          // Handle successful registration (e.g., redirect to login page)
          window.location.href = '/login.html';
      } else {
          // Show error message from the API
          document.getElementById('register-error-message').innerText = data.message;
      }
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('register-error-message').innerText = 'An error occurred. Please try again.';
  });
});
