export function initPasswordToggle() {
  document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");

    togglePassword.addEventListener("click", function() {
      // Toggle the type attribute for both password fields
      const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
      passwordField.setAttribute("type", type);
      confirmPasswordField.setAttribute("type", type);

      // Toggle the class for the icon to change the appearance
      togglePassword.classList.toggle("show-password");
      togglePassword.classList.toggle("hide-password");
    });
  });
}
