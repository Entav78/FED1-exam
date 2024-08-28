export function initPasswordToggle() {
  document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const confirmPasswordField = document.getElementById("confirmPassword");

  togglePassword.addEventListener("click", function() {
    const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
    passwordField.setAttribute("type", type);
    togglePassword.classList.toggle("show-password");
    togglePassword.classList.toggle("hide-password");

    if (confirmPasswordField && toggleConfirmPassword) {
      confirmPasswordField.setAttribute("type", type);
      toggleConfirmPassword.classList.toggle("show-password");
      toggleConfirmPassword.classList.toggle("hide-password");
  }
    });

    if (toggleConfirmPassword && confirmPasswordField) {
      toggleConfirmPassword.addEventListener("click", function() {
          const type = confirmPasswordField.getAttribute("type") === "password" ? "text" : "password";
          confirmPasswordField.setAttribute("type", type);
          togglePassword.classList.toggle("show-password");
          togglePassword.classList.toggle("hide-password");
  });
}
});
}
