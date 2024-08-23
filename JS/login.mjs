document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get the input values
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
      console.log("Full response data:", JSON.stringify(data, null, 2)); // Inspect the full response structure

      // Assuming accessToken is within a nested object, adjust accordingly
      const accessToken = data.data ? data.data.accessToken : data.accessToken;

      if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          console.log("Redirecting to test page...");
          window.location.href = "/index";
      } else {
          console.log("No accessToken found.");
          document.getElementById("login-error-message").innerText = "Login failed. Please check your email and password.";
      }
  } catch (error) {
      console.error("Error:", error);
      document.getElementById("login-error-message").innerText = "An error occurred. Please try again.";
  }
});

