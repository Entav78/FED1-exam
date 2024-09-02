import './Account/adminLoginLink.mjs';

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = sidebar ? sidebar.querySelector('li') : null; // Ensure sidebar exists
  const menuBtn = document.querySelector('.hamburger-menu');
  const managePostLink1 = document.getElementById('managePostLink1'); // Reference to "Manage Posts" link for large screens
  const managePostLink2 = document.getElementById('managePostLink2'); // Reference to "Manage Posts" link for small screens (hamburger menu)

  // Check if the access token exists to determine if the user is logged in
  const isLoggedIn = !!localStorage.getItem('accessToken');
  console.log("Access token exists:", isLoggedIn);

  // Function to update the visibility of a link based on login status
  function updateLinkVisibility(link) {
    if (link) {
      link.style.display = isLoggedIn ? 'block' : 'none';
      console.log(`Manage Post link visibility set for ${link.id}:`, link.style.display);
    } else {
      console.warn(`Manage Posts link with ID ${link.id} not found in the DOM.`);
    }
  }

  // Update visibility for both links
  updateLinkVisibility(managePostLink1);
  updateLinkVisibility(managePostLink2);

  if (sidebar) {
    sidebar.classList.remove('active');

    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        sidebar.classList.remove('active'); // Hide the sidebar
      });
    }

    if (menuBtn) {
      menuBtn.addEventListener("click", function () {
        sidebar.classList.toggle('active'); // Toggle sidebar visibility
      });
    }
  }

  // Ensure sidebar closes on window resize above 800px width
  window.addEventListener("resize", function () {
    if (window.innerWidth > 800 && sidebar) {
      sidebar.classList.remove('active');
    }
  });

  // Listen for changes to the accessToken to update the navigation state
  window.addEventListener('storage', function () {
    const updatedIsLoggedIn = !!localStorage.getItem('accessToken');
    console.log("Access token updated, logged in:", updatedIsLoggedIn);
    updateLinkVisibility(managePostLink1);
    updateLinkVisibility(managePostLink2);
  });

  console.log(document.querySelectorAll('#managePostLink1, #managePostLink2').length);
});





/*import './Account/adminLoginLink.mjs';

document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = sidebar ? sidebar.querySelector('li') : null; // Ensure sidebar exists
  const menuBtn = document.querySelector('.hamburger-menu');
  const managePostLink = document.getElementById('managePostLink'); // Reference to "Manage Posts" link

  function updateManagePostLinkVisibility() {
    const isLoggedIn = !!localStorage.getItem('accessToken');
    if (managePostLink) {
      managePostLink.style.display = isLoggedIn ? 'block' : 'none';
    }
  }

  // Toggle "Manage Posts" visibility based on login state
  if (managePostLink) {
    managePostLink.style.display = isLoggedIn ? 'block' : 'none';
  }

  if (sidebar) {
    sidebar.classList.remove('active');

    if (closeBtn) {
      closeBtn.addEventListener("click", function() {
        sidebar.classList.remove('active'); // Hide the sidebar
      });
    }

    if (menuBtn) {
      menuBtn.addEventListener("click", function() {
        sidebar.classList.toggle('active'); // Toggle sidebar visibility
      });
    }
  }

  // Ensure sidebar closes on window resize above 800px width
  window.addEventListener("resize", function() {
    if (window.innerWidth > 800 && sidebar) {
      sidebar.classList.remove('active');
    }
  });

  // Listen for changes to the accessToken to update the navigation state
  window.addEventListener('storage', function() {
    const updatedIsLoggedIn = !!localStorage.getItem('accessToken');
    if (managePostLink) {
      managePostLink.style.display = updatedIsLoggedIn ? 'block' : 'none';
    }
  });
});
*/

/*import './Account/adminLoginLink.mjs';

document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector('.sidebar');
    const closeBtn = sidebar ? sidebar.querySelector('li') : null; // Ensure sidebar exists
    const menuBtn = document.querySelector('.hamburger-menu');
  
    if (sidebar) {
      sidebar.classList.remove('active');
  
      if (closeBtn) {
        closeBtn.addEventListener("click", function() {
          sidebar.classList.remove('active'); // Hide the sidebar
        });
      }
  
      if (menuBtn) {
        menuBtn.addEventListener("click", function() {
          sidebar.classList.toggle('active');
        });
      }
    }
  
    window.addEventListener("resize", function() {
      if (window.innerWidth > 800 && sidebar) {
        sidebar.classList.remove('active');
      }
    });
  });
  */