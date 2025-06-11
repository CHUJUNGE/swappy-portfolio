/**
 * Swappy Portfolio - Main JavaScript
 * Handles animations, navigation, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Navbar shrink function
    var navbarShrink = function() {
        const navbarCollapsible = document.getElementById('mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink');
        } else {
            navbarCollapsible.classList.add('navbar-shrink');
        }
    };

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.getElementById('mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is clicked
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarResponsive = document.querySelector('#navbarResponsive');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            navbarToggler.classList.toggle('active');
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.hash !== '') {
                e.preventDefault();
                const hash = this.hash;
                const targetElement = document.querySelector(hash);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 72,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    history.pushState(null, null, hash);
                    
                    // Close mobile menu if open
                    if (navbarResponsive && navbarResponsive.classList.contains('show')) {
                        navbarToggler.click();
                    }
                }
            }
        });
    });

    // Initialize Lightbox for screenshots
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'albumLabel': 'Image %1 of %2',
            'fadeDuration': 300
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .screenshot-item, .tech-icon');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('fade-in');
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    navbarShrink();
});
