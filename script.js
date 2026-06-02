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

// Handle OTP Flow for Login
const getOtpBtn = document.getElementById('get-otp-btn');
const loginEmailGroup = document.getElementById('login-email-group');
const loginOtpGroup = document.getElementById('login-otp-group');
const verifyOtpBtn = document.getElementById('verify-otp-btn');
const loginEmailInput = document.getElementById('login-email');
const loginOtpInput = document.getElementById('login-otp');

if (getOtpBtn) {
    getOtpBtn.addEventListener('click', () => {
        if (!loginEmailInput.value || !loginEmailInput.checkValidity()) {
            alert('Please enter a valid email address first.');
            return;
        }
        
        getOtpBtn.textContent = 'Sending...';
        getOtpBtn.disabled = true;
        
        // Simulate sending OTP
        setTimeout(() => {
            getOtpBtn.style.display = 'none';
            loginEmailInput.readOnly = true;
            loginEmailInput.style.opacity = '0.7';
            
            loginOtpGroup.style.display = 'block';
            loginOtpInput.required = true;
            
            verifyOtpBtn.style.display = 'block';
            
            // Show a mock alert for demo
            alert('A 6-digit OTP has been sent to your email (for demo, you can enter any 6 digits).');
        }, 800);
    });
}

// Simulate OTP Verification and redirect to dashboard
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (verifyOtpBtn) {
        verifyOtpBtn.textContent = 'Verifying...';
        verifyOtpBtn.style.opacity = '0.7';
        verifyOtpBtn.disabled = true;
    }
    
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
