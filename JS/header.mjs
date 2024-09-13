document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector('.sidebar');
  const sidebarLinks = sidebar ? sidebar.querySelectorAll('a') : [];
  const closeBtn = document.querySelector('.close-icon'); 
  const hamburgerLink = document.querySelector('.hamburger-menu a');
  const managePostLink1 = document.getElementById('managePostLink1');
  const managePostLink2 = document.getElementById('managePostLink2');
  const adminLoginLinks = document.querySelectorAll("#adminLoginLink");
  const coding2goLink = document.querySelector('.coding2go-link');

  function updateLinkVisibility() {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const screenWidth = window.innerWidth;
    console.log('Updating link visibility:', { isLoggedIn, screenWidth });

    if (isLoggedIn) {
      if (screenWidth > 800) {
        managePostLink1.style.display = 'block';
        managePostLink2.style.display = 'none';
      } else {
        managePostLink1.style.display = 'none';
        managePostLink2.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
      }

      adminLoginLinks.forEach((link) => {
        link.textContent = "Log Out";
        link.href = "#";
        link.removeEventListener('click', handleLogout);
        link.addEventListener('click', handleLogout);
      });
    } else {
      managePostLink1.style.display = 'none';
      managePostLink2.style.display = 'none';
      adminLoginLinks.forEach((link) => {
        link.textContent = "Admin Login";
        link.href = "/account/login.html";
        link.removeEventListener('click', handleLogout);
      });
    }
  }

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");

    console.log("Logout clicked. Reloading or redirecting.");
    if (window.location.pathname === "/post/edit.html") {
      window.location.href = "/index.html";
    } else {
      window.location.reload();
    }
  }

  if (sidebar) {
    sidebar.classList.remove('active');

    if (closeBtn) {
      closeBtn.addEventListener("click", function (event) {
        if (event.target.closest('.close-sidebar')) {
          event.preventDefault();
          sidebar.classList.remove('active');
          updateLinkVisibility();
          hamburgerLink.style.display = 'block'; 
          console.log("Close button clicked. Sidebar closed.");
        }
      });
    }

    if (hamburgerLink) {
      hamburgerLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default navigation
        sidebar.classList.toggle('active'); // Toggle the sidebar
        updateLinkVisibility(); // Update link visibility as needed
        console.log("Hamburger menu button clicked. Sidebar toggled:", sidebar.classList.contains('active'));
      });
    }

    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function (event) {
        console.log(`Clicked on link: ${link.href} with text: ${link.textContent}`);
    
        // Prevent default only if the link's href is exactly '#'
        if (link.getAttribute('href') === '#') {
          event.preventDefault();
          console.log(`Preventing default action for href='#'. Link text: ${link.textContent}`);
        } else if (link.href === window.location.href + '#') {
          // Specific case handling if it still matches Blog Feed
          event.preventDefault();
          console.log(`Preventing default action specifically for href='#': ${link.href}`);
        } else {
          console.log("Navigating to:", link.href);
        }
      });
    });
    
    
  }

  // Update visibility on window resize
  window.addEventListener("resize", function () {
    updateLinkVisibility();
    console.log("Window resized. Checking link visibility.");

    if (window.innerWidth > 800) {
      hamburgerLink.style.display = 'none';
      sidebar.classList.remove('active');
    } else {
      hamburgerLink.style.display = 'block';
    }
  });

  // Listen for changes to the accessToken to update the navigation state
  window.addEventListener('storage', function () {
    updateLinkVisibility();
    console.log("Local storage updated. Checking link visibility.");
  });

  // Ensure visibility is correctly managed upon page load and interaction
  window.addEventListener('load', function () {
    updateLinkVisibility();
    console.log("Page loaded. Checking link visibility.");
  });

  // Add an event listener to the "Coding2go" link to ensure it redirects properly
  if (coding2goLink) {
    coding2goLink.addEventListener('click', function (event) {
      console.log(`Clicked on Coding2go link: ${coding2goLink.href}`);
      if (coding2goLink.getAttribute('href') !== '#') {
        window.location.href = coding2goLink.getAttribute('href');
      } else {
        event.preventDefault();
        console.log("Prevented default action on Coding2go link with href='#'");
      }
    });
  }
}); // Closing the DOMContentLoaded event listener
 // <-- Closing parenthesis for DOMContentLoaded






/*
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector('.sidebar');
  const sidebarLinks = sidebar ? sidebar.querySelectorAll('a') : [];
  const closeBtn = document.querySelector('.close-icon'); // Ensure this targets only the close button
  const menuBtn = document.querySelector('.hamburger-menu');
  const managePostLink1 = document.getElementById('managePostLink1');
  const managePostLink2 = document.getElementById('managePostLink2');
  const adminLoginLinks = document.querySelectorAll("#adminLoginLink");
  const coding2goLink = document.querySelector('.coding2go-link'); // Targeting the "Coding2go" link

  // Function to update the visibility of "Manage Post" links and admin login button based on login status
  function updateLinkVisibility() {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    const screenWidth = window.innerWidth;

    if (isLoggedIn) {
      if (screenWidth > 800) {
        managePostLink1.style.display = 'block';
        managePostLink2.style.display = 'none';
      } else {
        managePostLink1.style.display = 'none';
        managePostLink2.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
      }

      adminLoginLinks.forEach((link) => {
        link.textContent = "Log Out";
        link.href = "#";
        link.removeEventListener('click', handleLogout);
        link.addEventListener('click', handleLogout);
      });
    } else {
      managePostLink1.style.display = 'none';
      managePostLink2.style.display = 'none';
      adminLoginLinks.forEach((link) => {
        link.textContent = "Admin Login";
        link.href = "/account/login.html";
        link.removeEventListener('click', handleLogout);
      });
    }
  }

  // Handle user logout
  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");

    if (window.location.pathname === "/post/edit.html") {
      window.location.href = "/index.html";
    } else {
      window.location.reload();
    }
  }

  // Sidebar toggle behavior and close button functionality
  if (sidebar) {
    sidebar.classList.remove('active');

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        sidebar.classList.remove('active');
        updateLinkVisibility();
        menuBtn.style.display = 'block';
        console.log("Close button clicked, sidebar closed.");
      });
    }

    if (menuBtn) {
      menuBtn.addEventListener("click", function (event) {
        event.preventDefault();
        sidebar.classList.toggle('active');
        updateLinkVisibility();
        menuBtn.style.display = sidebar.classList.contains('active') ? 'none' : 'block';
      });
    }

    // Handle link clicks within the sidebar
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        console.log(`Clicked on link: ${link.href}`);

        // Prevent default only for the close button or empty links
        if (link.href === "#" || link === closeBtn.querySelector('a')) {
          event.preventDefault();
          console.log("Close button clicked, preventing default action.");
        } else {
          // Close the sidebar for other links and proceed with navigation
          sidebar.classList.remove('active');
          updateLinkVisibility();
        }
      });
    });
  }

  // Handle the "Coding2go" link click event to ensure proper navigation
  if (coding2goLink) {
    coding2goLink.addEventListener('click', function (event) {
      console.log(`Clicked on Coding2go link: ${coding2goLink.href}`);
      if (coding2goLink.getAttribute('href') !== '#') {
        window.location.href = coding2goLink.getAttribute('href');
      }
    });
  }

  // Update visibility on window resize
  window.addEventListener("resize", function () {
    updateLinkVisibility();

    if (window.innerWidth > 800) {
      menuBtn.style.display = 'none';
      sidebar.classList.remove('active');
    } else {
      menuBtn.style.display = 'block';
    }
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

*/








































