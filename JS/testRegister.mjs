document.getElementById("registerForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get the input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  // Basic validation: Check if passwords match
  if (password !== confirmPassword) {
      document.getElementById("register-error-message").innerText = "Passwords do not match.";
      return;
  }

  // Prepare the data to be sent to the API
  const userData = {
      name: name,
      email: email,
      password: password
  };

  try {
      // Call the API to register the user
      const response = await fetch("https://v2.api.noroff.dev/auth/register", {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
          window.location.href = "/login.html";
      } else if (data.errors && data.errors.length > 0) {
          document.getElementById("register-error-message").innerText = data.errors[0].message;
      } else {
          document.getElementById("register-error-message").innerText = "An unknown error occurred. Please try again.";
      }
  } catch (error) {
      console.error("Error:", error);
      document.getElementById("register-error-message").innerText = "An error occurred. Please try again.";
  }
});
