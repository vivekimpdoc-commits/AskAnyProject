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

// Simulate login process and redirect to dashboard
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Logging in...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1200);
});

document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Creating Account...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1200);
});
