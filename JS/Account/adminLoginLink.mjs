document.addEventListener("DOMContentLoaded", function () {
    const adminLoginLinks = document.querySelectorAll("#adminLoginLink");
    const editPostLinks = document.querySelectorAll("#editPostLink");
  
    // Initially hide the "Edit Posts" links
    editPostLinks.forEach((link) => (link.style.display = "none"));
  
    // Check if the user is logged in by checking for the access token
    if (localStorage.getItem("accessToken")) {
      adminLoginLinks.forEach((link) => {
        link.textContent = "Log out";
        link.href = "#"; // Prevents navigation when clicking "Log out"
        // Show all "Edit Posts" links only for logged-in users
        editPostLinks.forEach((link) => (link.style.display = "inline-block"));
  
        link.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent the default link behavior
          // Remove user data from localStorage to log out
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userName");
  
          // Check if the current page is the edit page
          if (window.location.pathname === "/post/edit.html") {
            // Redirect to the blog feed page after logging out
            window.location.href = "/index.html";
          } else {
            // Reload the page to reflect the logged-out state
            window.location.reload();
          }
        });
      });
    } else {
      // Set link text to "Admin Login" if the user is not logged in
      adminLoginLinks.forEach((link) => {
        link.textContent = "Admin Login";
        link.href = "/account/login.html"; // Set the login URL
      });
    }
  });
  


/*document.addEventListener("DOMContentLoaded", function () {
    const adminLoginLinks = document.querySelectorAll("#adminLoginLink");
    const editPostLinks = document.querySelectorAll("#editPostLink");
  
    if (editPostLinks.length > 0) {
      editPostLinks.forEach(link => link.style.display = "none");
    }
  
    if (localStorage.getItem("accessToken")) {
      
      if (adminLoginLinks.length > 0) {
        adminLoginLinks.forEach(link => {
          link.textContent = "Log out"; 
          link.href = "#"; 
  
          if (editPostLinks.length > 0) {
            editPostLinks.forEach(link => link.style.display = "inline-block");
          }
  
          link.addEventListener("click", function (event) {
            event.preventDefault(); 
            localStorage.removeItem("accessToken"); 
  
            if (window.location.pathname === "/post/edit.html") {
              window.location.href = "/index.html";
            } else {
              window.location.reload();
            }
          });
        });
      } else {
        console.warn("Admin login link not found on the page.");
      }
    } else {
      
      if (adminLoginLinks.length > 0) {
        adminLoginLinks.forEach(link => {
          link.textContent = "Admin Login";
          link.href = "/account/login.html"; 
        });
      }
  
      if (window.location.pathname === "/account/login.html") {
        const loginForm = document.getElementById("loginForm");
  
        if (loginForm) {
          loginForm.addEventListener("submit", async function (event) {
            event.preventDefault();
  
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
  
            try {
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
              const accessToken = data.data ? data.data.accessToken : data.accessToken;
  
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
        } else {
          console.warn("Login form not found on the page.");
        }
      }
    }
  });
  */