/*
 * JavaScript for NL Digital Assets Website
 * Author: Gemini AI Expert Senior Frontend Web Developer
 * Version: 1.0
 *
 * Description:
 * This script provides basic interactivity for the website, including:
 * 1. Mobile navigation menu (hamburger) functionality.
 * 2. Smooth scrolling for anchor links.
 * 3. A dynamic header that changes on scroll.
 * 4. Active link highlighting for navigation items based on scroll position.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            // Toggle 'nav-active' class on the navigation links container
            navLinks.classList.toggle('nav-active');
            
            // Animate the hamburger icon
            hamburger.classList.toggle('toggle');
        });

        // Close menu when a link is clicked (useful for single-page apps)
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                }
            });
        });
    }


    // --- 2. Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // --- 3. Dynamic Header on Scroll ---
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    
    // --- 4. Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const activateNavOnScroll = () => {
        let currentSectionId = '';
        const headerOffset = header.offsetHeight + 20;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navAnchors.forEach(anchor => {
            anchor.classList.remove('active');
            // Check if the anchor's href matches the current section's ID
            if (anchor.getAttribute('href') === `#${currentSectionId}`) {
                anchor.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', activateNavOnScroll);
    
});
