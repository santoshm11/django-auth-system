document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const googleBtn = document.querySelector('.google-btn');

    // Password confirmation validation
    const validatePasswordMatch = () => {
        confirmPasswordInput.style.borderColor = 
            passwordInput.value && confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value
            ? '#f56565' // red
            : '#48bb78'; // green
    };

    passwordInput.addEventListener('input', validatePasswordMatch);
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);

    // Form submission
    form.addEventListener('submit', (e) => {
        if (!usernameInput.value || !emailInput.value || !passwordInput.value || !confirmPasswordInput.value) {
            e.preventDefault();
            alert('Please fill in all fields');
            return;
        }

        if (passwordInput.value !== confirmPasswordInput.value) {
            e.preventDefault();
            alert('Passwords do not match');
            return;
        }

        if (!termsCheckbox.checked) {
            e.preventDefault();
            alert('Please agree to the Terms of Service and Privacy Policy');
            return;
        }

        // Disable submit button to prevent double submissions
        const submitButton = form.querySelector('.signup-button');
        if (submitButton) submitButton.disabled = true;
    });

    // Google sign-up button (redirect)
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            // Default action handles redirect
        });
    }

    // Initialize Bootstrap toasts
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach((toastEl) => {
        const toast = new bootstrap.Toast(toastEl, { delay: 5000, autohide: true });
        toast.show();
    });
});
