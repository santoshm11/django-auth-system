document.addEventListener('DOMContentLoaded', function () {
    // ---- Form handling ----
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const googleBtn = document.querySelector('.google-btn');

    if (form) {
        form.addEventListener('submit', function () {
            if (!emailInput.value || !passwordInput.value) {
                console.warn('Some fields are empty.');
                // Do not prevent default; let Django handle validation
            }
        });
    }

    if (googleBtn) {
        googleBtn.addEventListener('click', function () {
            // Just allow normal navigation; no blocking
        });
    }

    // ---- Bootstrap Toasts ----
    const toastElList = [].slice.call(document.querySelectorAll('.toast'));
    toastElList.forEach(function (toastEl) {
        const toast = new bootstrap.Toast(toastEl, {
            delay: 5000,  // auto-hide after 5 seconds
            autohide: true
        });
        toast.show();
    });
});