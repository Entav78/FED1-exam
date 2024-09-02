import { REGISTER_ENDPOINT } from '../endpoints.mjs'; 
import { fetchData } from '../fetchData.mjs'; 
import '../header.mjs';
import { initPasswordToggle } from '../Account/showHidePassword.mjs'; 

initPasswordToggle();

document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("register-error-message").innerText = "Passwords do not match.";
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await fetchData(REGISTER_ENDPOINT, 'POST', userData);

        console.log("Full API response received:", response);

        if (response.data) {
            console.log("Registration successful, user data:", response.data);
            localStorage.setItem("userName", response.data.name); // Store the user's name
            localStorage.setItem("accessToken", response.data.accessToken);
            window.location.href = "/login.html";
        } else if (response.errors && response.errors.length > 0) {
            const errorMessage = response.errors[0].message;
            console.log("Error message from API:", errorMessage);
            document.getElementById("register-error-message").innerText = errorMessage;

            if (errorMessage.includes("Profile already exists")) {
                console.warn("User already registered with this email.");
            } 
        } else {
            document.getElementById("register-error-message").innerText = "An unknown error occurred. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("register-error-message").innerText = error.message || "An error occurred. Please try again.";
    }
});










/*
import './header.mjs';
import { initPasswordToggle } from './showHidePassword.mjs';

initPasswordToggle();
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
*/