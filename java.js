// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    // Scroll event listener for header shadow
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile navigation menu toggle
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        
        // Animate nav items
        navItems.forEach((item, index) => {
            if (item.style.animation) {
                item.style.animation = '';
            } else {
                item.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Animate hamburger
        hamburger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    hamburger.classList.remove('active');
                    hamburger.classList.remove('toggle');
                    
                    navItems.forEach(item => {
                        item.style.animation = '';
                    });
                }
            }
        });
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Text typing animation
    function typeText() {
        const text = document.querySelector('.text-rotate');
        if (text) {
            const textContent = text.textContent;
            text.textContent = "";
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < textContent.length) {
                    text.textContent += textContent.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(eraseText, 2000);
                }
            }, 100);
        }
    }
    
    function eraseText() {
        const text = document.querySelector('.text-rotate');
        if (text) {
            const textContent = text.textContent;
            
            let i = textContent.length;
            const eraseInterval = setInterval(() => {
                if (i > 0) {
                    text.textContent = textContent.substring(0, i-1);
                    i--;
                } else {
                    clearInterval(eraseInterval);
                    setTimeout(typeText, 500);
                }
            }, 50);
        }
    }
    
    // Initialize typing animation
    typeText();
    
    // Skills progress animation
    const skillsSection = document.querySelector('#skills');
    
    function animateSkills() {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach((card, index) => {
            card.style.animation = `fadeInUp 0.5s ease forwards ${index / 10 + 0.2}s`;
        });
    }
    
    // Animate skills when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }
    
    // Projects filter and animation
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease forwards ${index / 5 + 0.5}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('#contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const subject = document.querySelector('#subject').value.trim();
            const message = document.querySelector('#message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || message === '') {
                showAlert('Please fill in all required fields', 'error');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showAlert('Please enter a valid email address', 'error');
                return false;
            }
            
            // If validation passes
            showAlert('Your message has been sent successfully!', 'success');
            contactForm.reset();
        });
    }
    
    function showAlert(message, type) {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert ${type}`;
        alert.textContent = message;
        
        // Add to DOM
        const formContainer = document.querySelector('.form-container');
        formContainer.prepend(alert);
        
        // Remove after 3 seconds
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
    
    // Animate numbers in achievements section
    const achievementStats = document.querySelectorAll('.achievement-stat');
    const achievementsSection = document.querySelector('#achievements');
    
    function animateNumbers() {
        achievementStats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let count = 0;
            const updateCount = () => {
                const increment = target / 50;
                
                if (count < target) {
                    count += increment;
                    stat.textContent = Math.ceil(count);
                    setTimeout(updateCount, 30);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
    }
    
    // Animate numbers when scrolled into view
    if (achievementsSection) {
        const achievementsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    achievementsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        achievementsObserver.observe(achievementsSection);
    }
    
    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        if (heroSection) {
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        }
    });
    
    // Add back to top button functionality
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 700) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Add preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        if (preloader) {
            preloader.classList.add('hide');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        }
    });
    
    // Add dark mode toggle functionality
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    
    if (darkModeToggle) {
        // Check for saved theme preference or respect user's system preference
        if (localStorage.getItem('darkMode') === 'enabled' || 
            (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && 
             localStorage.getItem('darkMode') !== 'disabled')) {
            document.body.classList.add('dark-mode');
            darkModeToggle.classList.add('active');
        }
        
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.classList.toggle('active');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
});

// Intersection Observer for fade in animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Project filter functionality
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filter projects
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        
        if (category === 'all' || projectCategory === category) {
            project.style.display = 'block';
            setTimeout(() => {
                project.classList.add('show');
            }, 100);
        } else {
            project.classList.remove('show');
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
}

// Initialize AOS (Animate on Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
}

// Lazy loading images
const lazyImages = document.querySelectorAll('.lazy-img');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
} else {
    // Fallback for browsers that don't support Intersection Observer
    lazyImages.forEach(img => {
        img.src = img.dataset.src;
    });
}