document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector('.sidebar');
  const closeBtn = sidebar.querySelector('li'); // the first li
  const menuBtn = document.querySelector('.hamburger-menu');

  // Hide the sidebar on page load
  sidebar.style.display = 'none';

  closeBtn.addEventListener("click", function() {
      sidebar.style.display = 'none';
  });

  menuBtn.addEventListener("click", function() {
      sidebar.style.display = 'flex';
  });

   window.addEventListener("resize", function() {
    if (window.innerWidth > 800) {
        sidebar.style.display = 'none';
    }
});
});