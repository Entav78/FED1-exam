export function initPasswordToggle() {
  // Function to attempt to set up the toggle event
  function setupToggle() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword"); // Optional for registration

    // Check if togglePassword and passwordField are available
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

      console.log("Password visibility toggled");
    });

    console.log("Password toggle setup complete");
  }

  // Set up the event listener once the DOM is loaded
  document.addEventListener("DOMContentLoaded", setupToggle);

  // Observe DOM changes to re-run setup if elements are added dynamically
  const observer = new MutationObserver(() => {
    // Attempt to re-run the setup if elements are dynamically added
    setupToggle();
  });

  // Start observing the body for changes in the DOM structure
  observer.observe(document.body, { childList: true, subtree: true });
}


/*
export function initPasswordToggle() {
  document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");

    console.log("initPasswordToggle initialized"); // Debug log

    // Check if the elements exist before adding event listeners
    if (!togglePassword || !passwordField || !confirmPasswordField) {
      console.error("Password toggle elements not found");
      return;
    }

    togglePassword.addEventListener("click", function() {
      // Toggle the type attribute for both password fields
      const type = passwordField.getAttribute("type") === "password" ? "text" : "password";
      passwordField.setAttribute("type", type);
      confirmPasswordField.setAttribute("type", type);

      // Toggle the class for the icon to change the appearance
      togglePassword.classList.toggle("show-password");
      togglePassword.classList.toggle("hide-password");

      console.log("Password visibility toggled"); // Debug log
    });
  });
}
*/
/*
export function initPasswordToggle() {
  document.addEventListener("DOMContentLoaded", function () {
    const togglePassword = document.getElementById("togglePassword");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirmPassword");

    // Check if the toggle button and password fields exist
    if (togglePassword && passwordField && confirmPasswordField) {
      togglePassword.addEventListener("click", function () {
        // Toggle the type attribute for both password fields
        const type =
          passwordField.getAttribute("type") === "password" ? "text" : "password";
        passwordField.setAttribute("type", type);
        confirmPasswordField.setAttribute("type", type);

        // Toggle the class for the icon to change the appearance
        togglePassword.classList.toggle("show-password");
        togglePassword.classList.toggle("hide-password");
      });
    } else {
      console.warn(
        "Password toggle elements not found. Check if the IDs are correct and the elements are present in the DOM."
      );
    }
  });
}
*/
