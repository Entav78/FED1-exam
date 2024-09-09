import './Account/adminLoginLink.mjs';

document.addEventListener("DOMContentLoaded", function () {
  console.log('DOMContentLoaded event triggered in header.mjs');
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = sidebar ? sidebar.querySelector('li') : null;
  const menuBtn = document.querySelector('.hamburger-menu');
  const managePostLink1 = document.getElementById('managePostLink1'); // "Manage Posts" link for large screens
  const managePostLink2 = document.getElementById('managePostLink2'); // "Manage Posts" link for small screens (hamburger menu)

  // Function to update the visibility of the "Manage Post" links based on login status and screen size
  function updateLinkVisibility() {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    const screenWidth = window.innerWidth;
    console.log('Updating link visibility: screenWidth =', screenWidth, ', isLoggedIn =', isLoggedIn);

    // Show or hide links based on screen size and login status
    if (isLoggedIn) {
      if (screenWidth > 800) {
        if (managePostLink1) {
          managePostLink1.style.display = 'block'; 
          console.log('Displaying managePostLink1 (large screen, logged in)');
        }
        if (managePostLink2) {
          managePostLink2.style.display = 'none'; // Ensure sidebar link is hidden on large screens
          console.log('Hiding managePostLink2 (small screen, logged in)');
        }
      } else {
        if (managePostLink1) {
          managePostLink1.style.display = 'none'; // Hide large screen link on small screens
          console.log('Hiding managePostLink1 (large screen, logged in)');
        }
        if (managePostLink2) {
          managePostLink2.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
          console.log(sidebar.classList.contains('active') 
            ? 'Displaying managePostLink2 inside the sidebar (small screen, logged in)'
            : 'Hiding managePostLink2 (small screen, sidebar inactive)');
        }
      }
    } else {
      if (managePostLink1) {
        managePostLink1.style.display = 'none';
        console.log('Hiding managePostLink1 (not logged in)');
      }
      if (managePostLink2) {
        managePostLink2.style.display = 'none';
        console.log('Hiding managePostLink2 (not logged in)');
      }
    }
  }

  console.log("Initializing header visibility updates.");
  updateLinkVisibility();

  // Handle sidebar toggle
  if (sidebar) {
    sidebar.classList.remove('active');

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        sidebar.classList.remove('active'); // Hide the sidebar
        updateLinkVisibility();
        console.log('Sidebar closed via close button.');
      });
    }

    if (menuBtn) {
      menuBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        sidebar.classList.toggle('active'); // Toggle sidebar visibility
        console.log('Hamburger menu clicked, sidebar state:', sidebar.classList.contains('active'));
        updateLinkVisibility(); // Update link visibility when sidebar is toggled
      });
    } else {
      console.error('Hamburger menu not found or event listener not attached correctly.');
    }
  } else {
    console.error('Sidebar not found in the DOM.');
  }

  // Update visibility on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 800 && sidebar) {
      console.log('Resize event triggered in header.mjs');
      sidebar.classList.remove('active'); // Hide sidebar when resizing to a large screen
    }
    updateLinkVisibility(); // Ensure link visibility is updated on resize
  });

  // Listen for changes to the accessToken to update the navigation state
  window.addEventListener('storage', function () {
    console.log("Access token updated, checking visibility...");
    updateLinkVisibility(); // Update visibility when login status changes
  });

  // Ensure visibility is correctly managed upon page load and interaction
  window.addEventListener('load', function () {
    updateLinkVisibility();
  });
});















