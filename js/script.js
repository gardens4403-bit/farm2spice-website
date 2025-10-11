// Farm2Spice - Interactive JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth Scrolling for Navigation Links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Active Navigation Link Highlighting
    function initActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        function updateActiveNav() {
            let current = '';
            const scrollY = window.scrollY;
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initial call
    }
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navigation = document.querySelector('.navigation');
        
        if (mobileMenuBtn && navigation) {
            mobileMenuBtn.addEventListener('click', function() {
                navigation.classList.toggle('mobile-active');
                this.classList.toggle('active');
                
                // Toggle icon
                const icon = this.querySelector('i');
                if (this.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });
            
            // Close mobile menu when clicking on nav links
            const navLinks = navigation.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navigation.classList.remove('mobile-active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                });
            });
        }
    }
    
    // Header Scroll Effect
    function initHeaderScrollEffect() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Animated Counter for Statistics
    function initAnimatedCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        function animateCounter(element) {
            const target = parseInt(element.textContent.replace(/\D/g, ''));
            const suffix = element.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(function() {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current) + suffix;
            }, 20);
        }
        
        // Intersection Observer for triggering animations
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    // Form Handling
    function initFormHandling() {
        const exportForm = document.getElementById('export-form');
        
        if (exportForm) {
            exportForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(exportForm);
                const formObject = {};
                formData.forEach((value, key) => {
                    formObject[key] = value;
                });
                
                // Show loading state
                const submitBtn = exportForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(function() {
                    // Success message
                    showNotification('Export inquiry sent successfully! We will contact you within 24 hours.', 'success');
                    
                    // Reset form
                    exportForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
                
                // In a real implementation, you would send the data to your server
                console.log('Export Form Data:', formObject);
            });
        }
    }
    
    // Notification System
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Scroll to Top Functionality
    function initScrollToTop() {
        // Create scroll to top button
        const scrollTopBtn = document.createElement('button');
        scrollTopBtn.className = 'scroll-to-top';
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
        document.body.appendChild(scrollTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Intersection Observer for Animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.reason-item, .product-card, .contact-detail');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Floating Contact Widgets Analytics
    function initContactTracking() {
        const contactWidgets = document.querySelectorAll('.contact-widget');
        
        contactWidgets.forEach(widget => {
            widget.addEventListener('click', function() {
                const contactType = this.classList.contains('phone') ? 'phone' :
                                  this.classList.contains('whatsapp') ? 'whatsapp' : 'email';
                
                // Track contact method usage (replace with actual analytics)
                console.log(`Contact method used: ${contactType}`);
                
                // You can integrate with Google Analytics or other tracking systems here
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'contact_click', {
                        contact_method: contactType,
                        event_category: 'engagement'
                    });
                }
            });
        });
    }
    
    // Product Quote Buttons
    function initProductQuotes() {
        const quoteButtons = document.querySelectorAll('.product-card .btn');
        
        quoteButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get product name from the card
                const productCard = this.closest('.product-card');
                const productName = productCard.querySelector('h3').textContent;
                
                // Scroll to contact form and pre-fill product selection
                const contactForm = document.getElementById('export-form');
                const productSelect = contactForm.querySelector('select[name="product"]');
                
                // Map product names to select values
                const productMapping = {
                    'Premium Turmeric': 'turmeric',
                    'Fresh Ginger': 'ginger',
                    'Chili Peppers': 'chili'
                };
                
                if (productSelect && productMapping[productName]) {
                    productSelect.value = productMapping[productName];
                }
                
                // Scroll to contact form
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
                
                // Show notification
                showNotification(`Quote request for ${productName}. Please fill out the form below.`, 'info');
            });
        });
    }
    
    // Initialize all functionality
    function init() {
        initSmoothScrolling();
        initActiveNavigation();
        initMobileMenu();
        initHeaderScrollEffect();
        initAnimatedCounters();
        initFormHandling();
        initScrollToTop();
        initScrollAnimations();
        initContactTracking();
        initProductQuotes();
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
        
        console.log('Farm2Spice website initialized successfully!');
    }
    
    // Initialize everything
    init();
});

// Additional CSS for JavaScript functionality
const additionalCSS = `
/* Mobile Navigation Styles */
@media (max-width: 768px) {
    .navigation {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 999;
    }
    
    .navigation.mobile-active {
        display: block;
    }
    
    .navigation .nav-menu {
        flex-direction: column;
        padding: 20px;
        gap: 0;
    }
    
    .navigation .nav-menu li {
        border-bottom: 1px solid #eee;
    }
    
    .navigation .nav-menu li:last-child {
        border-bottom: none;
    }
    
    .nav-link {
        display: block;
        padding: 15px 0;
        font-size: 16px;
    }
}

/* Header Scroll Effect */
.header.scrolled {
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
}

/* Notification Styles */
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 400px;
    padding: 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    background: linear-gradient(135deg, #4CAF50, #45a049);
}

.notification-info {
    background: linear-gradient(135deg, #2196F3, #1976D2);
}

.notification-error {
    background: linear-gradient(135deg, #f44336, #d32f2f);
}

.notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
}

.notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Scroll to Top Button */
.scroll-to-top {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2E7D32, #4CAF50);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.scroll-to-top.show {
    opacity: 1;
    visibility: visible;
}

.scroll-to-top:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

/* Animation Classes */
.animate-in {
    animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Loading Animation */
body:not(.loaded) * {
    animation-play-state: paused !important;
}

/* Form Loading State */
.btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .notification {
        right: 15px;
        left: 15px;
        max-width: none;
        transform: translateY(-100px);
    }
    
    .notification.show {
        transform: translateY(0);
    }
    
    .scroll-to-top {
        bottom: 80px;
        right: 20px;
        width: 45px;
        height: 45px;
        font-size: 16px;
    }
}
`;

// Inject additional CSS
const styleElement = document.createElement('style');
styleElement.textContent = additionalCSS;
document.head.appendChild(styleElement);