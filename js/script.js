/**
 * SharpCut Barbershop - Main JavaScript
 * Handles navbar interactions, smooth scrolling, service selection, and appointment form submission.
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Set Minimum Date to Today for the Appointment Datepicker
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        dateInput.value = today;
    }

    // 2. Navbar Background Change on Scroll
    const navbar = document.getElementById('mainNav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Auto-close on Link Click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link, .navbar-nav .btn');
    const navbarCollapse = document.getElementById('navbarResponsive');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // 4. Appointment Form Submission Handling
    const appointmentForm = document.getElementById('appointmentForm');
    const bookingAlert = document.getElementById('bookingAlert');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            // Form validation check
            if (!appointmentForm.checkValidity()) {
                appointmentForm.classList.add('was-validated');
                return;
            }

            // Display success message
            if (bookingAlert) {
                bookingAlert.classList.remove('d-none');
                bookingAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }

            // Reset form fields
            appointmentForm.reset();
            appointmentForm.classList.remove('was-validated');

            // Reset date field to today
            if (dateInput) {
                const today = new Date().toISOString().split('T')[0];
                dateInput.value = today;
            }

            // Auto-hide alert after 7 seconds
            setTimeout(function () {
                if (bookingAlert) {
                    bookingAlert.classList.add('d-none');
                }
            }, 7000);
        });
    }
});

/**
 * Pre-selects a service in the appointment form when clicking "Book Service" card link
 * @param {string} serviceName 
 */
function preselectService(serviceName) {
    const serviceSelect = document.getElementById('serviceSelect');
    if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
            if (serviceSelect.options[i].value === serviceName) {
                serviceSelect.selectedIndex = i;
                break;
            }
        }
    }
}
