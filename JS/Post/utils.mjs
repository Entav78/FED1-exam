
export function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

export function isLoggedIn() {
  return !!localStorage.getItem('accessToken'); 
}