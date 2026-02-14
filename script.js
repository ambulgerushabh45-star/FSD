const form = document.getElementById("signupForm");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let messages = [];

    if (name === "") {
        messages.push("Name is required");
    }

    if (email === "") {
        messages.push("Email is required");
    } else if (!validateEmail(email)) {
        messages.push("Email is not valid");
    }

    if (password === "") {
        messages.push("Password is required");
    } else if (password.length < 6) {
        messages.push("Password must be at least 6 characters");
    }

    if (messages.length > 0) {
        errorMsg.innerText = messages.join(", ");
    } else {
        alert("chi");   
        errorMsg.style.color = "green";
        errorMsg.innerText = "Form submitted successfully!";
        form.reset();
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(email);
}
