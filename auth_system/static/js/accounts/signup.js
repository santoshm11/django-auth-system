document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('signup-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const termsCheckbox = document.getElementById('terms');
    const googleBtn = document.querySelector('.google-btn');

    // Password confirmation validation
    function validatePasswordMatch() {
        if (passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.style.borderColor = '#f56565'; // red
        } else {
            confirmPasswordInput.style.borderColor = '#48bb78'; // green
        }
    }

    passwordInput.addEventListener('input', validatePasswordMatch);
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);

    // Form submission
    form.addEventListener('submit', function (e) {
        // Basic validation
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

        // Let the form submit naturally to Django backend
        // Optionally, you can disable the submit button to prevent double submissions
        form.querySelector('.signup-button').disabled = true;
    });

    // Google sign-up button (redirects via provider link)
    if (googleBtn) {
        googleBtn.addEventListener('click', function (e) {
            // Let the default anchor action happen (redirect to Google OAuth)
            // If you want, you could show a loading indicator here
        });
    }
});
