document.addEventListener('DOMContentLoaded', function () {
            const toastElList = [].slice.call(document.querySelectorAll('.toast'));
            
            toastElList.forEach(function (toastEl) {
                // Initialize each toast with Bootstrap
                const toast = new bootstrap.Toast(toastEl, {
                    delay: 5000, // 5000ms = 5 seconds
                    autohide: true
                });
                toast.show(); // show the toast
            });
        });