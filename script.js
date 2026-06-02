const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Desktop overlay toggles
if (signUpButton && signInButton) {
    signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
    });
}

// Mobile toggle function
function toggleMobilePanel() {
    container.classList.toggle("right-panel-active");
}

// Prevent default form submission for demo
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Log in logic will go here!');
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Sign up logic will go here!');
});
