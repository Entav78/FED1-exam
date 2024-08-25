import './header.mjs';
//import './adminLoginLink.mjs';//
document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
      // Call the API to authenticate the user
      const response = await fetch("https://v2.api.noroff.dev/auth/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email, password: password })
      });

      if (!response.ok) {
          throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Assuming accessToken is within a nested object, adjust accordingly
      const accessToken = data.data ? data.data.accessToken : data.accessToken; //ChatGPT helped me figure out this since the token is within a nested object//

      if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          window.location.href = "/post/edit.html";
      } else {
          document.getElementById("login-error-message").innerText = "Login failed. Please check your email and password.";
      }
  } catch (error) {
      console.error("Error:", error);
      document.getElementById("login-error-message").innerText = "An error occurred. Please try again.";
  }
});

