import { REGISTER_ENDPOINT } from '../endpoints.mjs'; 
import { fetchData } from '../fetchData.mjs'; 
import '../header.mjs';
import { initPasswordToggle } from '../Account/showHidePassword.mjs'; 

initPasswordToggle();

document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault(); 

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        document.getElementById("register-error-message").innerText = "Passwords do not match.";
        return;
    }

    const userData = {
        name: name,
        email: email,
        password: password
    };

    try {
        const response = await fetchData(REGISTER_ENDPOINT, 'POST', userData);

        const errors = response.data?.errors || response.errors || response.data?.data?.errors;
        const statusCode = response.statusCode || response.data?.statusCode;

        if (errors && errors.length > 0) {
            const errorMessage = errors[0].message || "An error occurred. Please try again.";
            document.getElementById("register-error-message").innerText = errorMessage;

            if (errorMessage.includes("Profile already exists")) {
                document.getElementById("register-error-message").innerHTML += 
                    '<br/>Already have an account? <a href="/account/login.html">Log in here</a>';
            } 
        } else if (response.data && statusCode === 201) {
            document.getElementById("register-error-message").innerText = "Registration successful! Please log in.";
        } else {
            document.getElementById("register-error-message").innerText = "An unknown error occurred. Please try again.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("register-error-message").innerText = error.message || "An error occurred. Please try again.";
    }
});



