import { API_URL } from "../apiUrl.mjs";
import { fetchData } from "./fetchData.mjs";
import { generatePostHtml } from "./generatePostHtml.mjs";
import { checkAuthentication } from "./auth.mjs";

document.addEventListener('DOMContentLoaded', async function() {
  checkAuthentication();

  const postId = getIdFromURL();
  const token = localStorage.getItem("accessToken");

  try {
    const postData = await fetchData(`${API_URL}/posts/${postId}`, 'GET', null, token);
    const postHtml = generatePostHtml(postData);
    const displayContainer = document.querySelector("#display-container");
    displayContainer.append(postHtml);
  } catch (error) {
    console.error("Failed to load post data:", error);
  }
});

async function deletePost(postId) {
  const token = localStorage.getItem("accessToken");
  try {
    await fetchData(`${API_URL}/posts/${postId}`, 'DELETE', null, token);
    alert("Post deleted successfully");
    window.location.href = "/posts.html";
  } catch (error) {
    console.error("Failed to delete post:", error);
  }
}

function getIdFromURL() {
  const url = new URL(window.location);
  const params = new URLSearchParams(url.search);
  return params.get("id");
}