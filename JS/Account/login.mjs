import { LOGIN_ENDPOINT } from '../endpoints.mjs'; 
import { fetchData } from '../fetchData.mjs'; 
import '../header.mjs';
import { initPasswordToggle } from '../Account/showHidePassword.mjs'; 

initPasswordToggle();

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetchData(LOGIN_ENDPOINT, 'POST', { email, password });

        console.log("API response received:", response);

        const accessToken = response.data?.accessToken || response.accessToken || response.data?.data?.accessToken;
        const userName = response.data?.name || response.name || response.data?.data?.name;

        const errors = response.data?.errors || response.errors || response.data?.data?.errors;
        
        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            if (userName) {
                localStorage.setItem("userName", userName); 
            }
            window.location.href = "https://entav78.github.io/FED1-exam/post/edit.html";
        } else if (errors && errors.length > 0) {
            const errorMessage = errors[0].message || "Login failed. Please check your email and password.";
            console.log("Error message from API:", errorMessage);
            document.getElementById("login-error-message").innerText = errorMessage;
        } else {
            document.getElementById("login-error-message").innerText = "Login failed. Please check your email and password.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("login-error-message").innerText = error.message || "An error occurred. Please try again.";
    }
});



