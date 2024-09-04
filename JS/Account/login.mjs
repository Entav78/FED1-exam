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
        // Use fetchData to make the API request
        const response = await fetchData(LOGIN_ENDPOINT, 'POST', { email, password });

        console.log("API response received:", response);

        // Extract accessToken and user name from the response
        const accessToken = response.data ? response.data.accessToken : response.accessToken;
        const userName = response.data ? response.data.name : response.name; // Assuming 'name' field is present in the response

        if (accessToken) {
            localStorage.setItem("accessToken", accessToken);
            if (userName) {
                localStorage.setItem("userName", userName); // Store the user's name
            }
            window.location.href = "/post/edit.html";
        } else {
            document.getElementById("login-error-message").innerText = "Login failed. Please check your email and password.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("login-error-message").innerText = "An error occurred. Please try again.";
    }
});

