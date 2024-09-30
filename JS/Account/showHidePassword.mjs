export function initPasswordToggle() {
  function setupToggle() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword"); 

    if (!togglePassword || !passwordField) {
      console.error("Password toggle elements not found");
      return;
    }

    // Add click event listener to toggle visibility for password fields
    togglePassword.addEventListener("click", function () {
      const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
      passwordField.setAttribute("type", type);

      // Toggle confirmPasswordField if it exists
      if (confirmPasswordField) {
        confirmPasswordField.setAttribute("type", type);
      }

      // Toggle the class for the icon to change the appearance
      togglePassword.classList.toggle("show-password");
      togglePassword.classList.toggle("hide-password");
    });
  }

  document.addEventListener("DOMContentLoaded", setupToggle);

  const observer = new MutationObserver(() => {
    setupToggle();
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

