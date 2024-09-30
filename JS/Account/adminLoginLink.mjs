document.addEventListener("DOMContentLoaded", function () {
    const adminLoginLinks = document.querySelectorAll("#adminLoginLink");
    const editPostLinks = document.querySelectorAll("#editPostLink");
  
    editPostLinks.forEach((link) => (link.style.display = "none"));
  
    if (localStorage.getItem("accessToken")) {
      adminLoginLinks.forEach((link) => {
        link.textContent = "Log out";
        link.href = "#";
        editPostLinks.forEach((link) => (link.style.display = "inline-block"));
  
        link.addEventListener("click", function (event) {
          event.preventDefault(); 
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userName");
  
          if (window.location.pathname === "https://entav78.github.io/FED1-exam/post/edit.html") {
            window.location.href = "https://entav78.github.io/FED1-exam/index.html";
          } else {
            window.location.reload();
          }
        });
      });
    } else {
      adminLoginLinks.forEach((link) => {
        link.textContent = "Admin Login";
        link.href = "https://entav78.github.io/FED1-exam/account/login.html"; 
      });
    }
  });
  