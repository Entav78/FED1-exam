document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = sidebar ? sidebar.querySelector('li') : null;
  const menuBtn = document.querySelector('.hamburger-menu');
  const managePostLink1 = document.getElementById('managePostLink1');
  const managePostLink2 = document.getElementById('managePostLink2');
  const adminLoginLinks = document.querySelectorAll("#adminLoginLink"); // Select all admin login buttons

  // Function to update the visibility of "Manage Post" links and admin login button based on login status
  function updateLinkVisibility() {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const screenWidth = window.innerWidth;

    // Show or hide "Manage Posts" links based on screen size and login status
    if (isLoggedIn) {
      if (screenWidth > 800) {
        if (managePostLink1) {
          managePostLink1.style.display = 'block';
        }
        if (managePostLink2) {
          managePostLink2.style.display = 'none';
        }
      } else {
        if (managePostLink1) {
          managePostLink1.style.display = 'none';
        }
        if (managePostLink2) {
          managePostLink2.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
        }
      }

      // Update admin login links to "Log Out"
      adminLoginLinks.forEach((link) => {
        link.textContent = "Log Out";
        link.href = "#"; // Prevents navigation when clicking "Log Out"
        link.removeEventListener('click', handleLogout); // Ensure no duplicate listeners
        link.addEventListener('click', handleLogout); // Attach the logout handler
      });
    } else {
      // If not logged in, hide both "Manage Posts" links
      if (managePostLink1) {
        managePostLink1.style.display = 'none';
      }
      if (managePostLink2) {
        managePostLink2.style.display = 'none';
      }

      // Update admin login links to "Admin Login"
      adminLoginLinks.forEach((link) => {
        link.textContent = "Admin Login";
        link.href = "/account/login.html"; // Set the login URL
        link.removeEventListener('click', handleLogout); // Remove the logout handler when not logged in
      });
    }
  }

  // Handle user logout
  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");

    // Check if on the edit page and redirect appropriately
    if (window.location.pathname === "/post/edit.html") {
      window.location.href = "/index.html";
    } else {
      window.location.reload();
    }
  }

  // Initialize visibility updates on page load
  updateLinkVisibility();

  // Sidebar toggle behavior
  if (sidebar) {
    sidebar.classList.remove('active');

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        sidebar.classList.remove('active');
        updateLinkVisibility();
      });
    }

    if (menuBtn) {
      menuBtn.addEventListener("click", function (event) {
        event.preventDefault();
        sidebar.classList.toggle('active');
        updateLinkVisibility();
      });
    }
  }

  // Update visibility on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 800 && sidebar) {
      sidebar.classList.remove('active');
    }
    updateLinkVisibility();
  });

  // Listen for changes to the accessToken to update the navigation state
  window.addEventListener('storage', function () {
    updateLinkVisibility();
  });

  // Ensure visibility is correctly managed upon page load and interaction
  window.addEventListener('load', function () {
    updateLinkVisibility();
  });
});




















