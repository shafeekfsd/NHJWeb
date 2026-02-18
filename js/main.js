
// Preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        document.body.classList.remove('loading');
    }, 500);
});

// Initialize GLightbox
if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });
}

// Initialize AOS Animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50
    });
});

// Navbar Scroll Effect
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');
    } else {
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.add('navbar-dark');
        navbar.classList.remove('navbar-light');
    }
});

// Back to Top Button
const backToTopBtn = document.getElementById("btn-back-to-top");

window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
});

backToTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        }
    });
});

// Theme Toggle (Light/Dark)
// Theme Toggle (Light/Dark) with Persistence
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const icon = themeToggle ? themeToggle.querySelector('i') : null;

// Function to set theme
const setTheme = (theme) => {
    htmlElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);

    if (icon) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
};

// Check for saved theme preference or system preference
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme(systemTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

//// Form Submission (Simulated)
//const contactForm = document.getElementById('contactForm');
//if (contactForm) {
//    contactForm.addEventListener('submit', (e) => {
//        e.preventDefault();
//        // Here you would typically handle the AJAX form submission
//        alert('Thank you for your message! We will get back to you soon.');
//        contactForm.reset();
// Project Filtering Logic
const filterButtons = document.querySelectorAll('.project-filter-btn');
const projectItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const parentCol = item.parentElement; // Get the col-lg-4 wrapper

                if (filterValue === 'all' || itemCategory === filterValue) {
                    parentCol.style.display = 'block';
                    // Re-trigger AOS animation
                    parentCol.classList.remove('aos-animate');
                    setTimeout(() => {
                        parentCol.classList.add('aos-animate');
                    }, 50);
                } else {
                    parentCol.style.display = 'none';
                }
            });
        });
    });
}
