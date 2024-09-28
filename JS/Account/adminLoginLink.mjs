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
          if (window.location.pathname === "https://entav78.github.io/FED1-exam/post/edit.html") {
            // Redirect to the blog feed page after logging out
            window.location.href = "https://entav78.github.io/FED1-exam/index.html";
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
        link.href = "https://entav78.github.io/FED1-exam/account/login.html"; // Set the login URL
      });
    }
  });
  