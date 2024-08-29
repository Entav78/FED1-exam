import './Account/adminLoginLink.mjs';

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
  