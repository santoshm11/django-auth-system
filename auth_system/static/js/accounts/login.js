document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const googleBtn = document.querySelector('.google-btn');

    form.addEventListener('submit', function (e) {
        // Basic validation
        if (!emailInput.value || !passwordInput.value) {
            e.preventDefault(); // only block if validation fails
            alert('Please fill in all fields');
            return;
        }

        // Let the form submit normally to Django backend
        // Optionally, you could disable the submit button to prevent double submissions
        form.querySelector('button[type="submit"]').disabled = true;
    });

    // Google login button: just let the anchor redirect
    if (googleBtn) {
        googleBtn.addEventListener('click', function () {
            // no preventDefault here; the anchor will navigate
            // optionally, you could show a loading spinner
        });
    }
});
