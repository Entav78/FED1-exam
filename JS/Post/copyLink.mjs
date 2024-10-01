export function initializeCopyLinkButton(buttonId) {
  const copyLinkButton = document.getElementById(buttonId);

  if (copyLinkButton) {
    copyLinkButton.addEventListener("click", function () {
      const postUrl = window.location.href;

      navigator.clipboard.writeText(postUrl).then(
        function () {
          alert("Link copied to clipboard!");
        },
        function (err) {
          console.error("Failed to copy the link: ", err);
          alert("Failed to copy the link. Please try again.");
        }
      );
    });
  } else {
    console.warn('Copy Link Button not found with ID:', buttonId);
  }
}
