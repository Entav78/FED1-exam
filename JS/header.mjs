document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector('.sidebar');
  const sidebarLinks = sidebar ? sidebar.querySelectorAll('a') : [];
  const closeBtn = document.querySelector('.close-icon'); 
  const hamburgerLink = document.querySelector('.hamburger-menu a');
  const managePostLink1 = document.getElementById('managePostLink1');
  const managePostLink2 = document.getElementById('managePostLink2');
  const adminLoginLinks = document.querySelectorAll(".admin-login-link");
  const ksaLink = document.querySelector('.ksa-link');

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
        link.href = "https://entav78.github.io/FED1-exam/account/login.html";
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
        event.preventDefault(); 
        sidebar.classList.toggle('active'); 
        updateLinkVisibility();
        console.log("Hamburger menu button clicked. Sidebar toggled:", sidebar.classList.contains('active'));
      });
    }

    document.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function (event) {
        console.log(`Clicked on link: ${link.href} with text: ${link.textContent}`);
    
        if (link.getAttribute('href') === '#') {
          event.preventDefault();
          console.log(`Preventing default action for href='#'. Link text: ${link.textContent}`);
        } else if (link.href === window.location.href + '#') {
          event.preventDefault();
          console.log(`Preventing default action specifically for href='#': ${link.href}`);
        } else {
          console.log("Navigating to:", link.href);
        }
      });
    });
    
    
  }

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

  window.addEventListener('storage', function () {
    updateLinkVisibility();
    console.log("Local storage updated. Checking link visibility.");
  });

  window.addEventListener('load', function () {
    updateLinkVisibility();
    console.log("Page loaded. Checking link visibility.");
  });

  if (ksaLink) {
    ksaLink.addEventListener('click', function (event) {
      console.log(`Clicked on ksa link: ${ksaLink.href}`);
      if (ksaLink.getAttribute('href') !== '#') {
        window.location.href = ksaLink.getAttribute('href');
      } else {
        event.preventDefault();
        console.log("Prevented default action on ksa link with href='#'");
      }
    });
  }
}); 