export function initializeCopyLinkButton(buttonId) {
  const copyLinkButton = document.getElementById(buttonId);

  if (copyLinkButton) {
    console.log('Copy Link Button found:', copyLinkButton);
    copyLinkButton.addEventListener("click", function () {
      console.log('Copy Link Button clicked');
      const postUrl = window.location.href;

      navigator.clipboard.writeText(postUrl).then(
        function () {
          alert("Link copied to clipboard!");
          console.log('Link copied successfully:', postUrl);
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
