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

// Redirect to dashboard on form submission
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'dashboard.html';
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    window.location.href = 'dashboard.html';
});
