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
    
    // Enhanced Form Analytics
    function initAdvancedFormTracking() {
        const form = document.getElementById('export-form');
        if (!form) return;
        
        // Track form field interactions
        const formFields = form.querySelectorAll('input, select, textarea');
        const formAnalytics = {
            startTime: null,
            fieldInteractions: {},
            abandonedFields: [],
            completionTime: null
        };
        
        // Track form start
        form.addEventListener('focusin', function(e) {
            if (!formAnalytics.startTime) {
                formAnalytics.startTime = Date.now();
                trackEvent('form_started', { form_type: 'export_inquiry' });
            }
        });
        
        // Track field interactions
        formFields.forEach(field => {
            const fieldName = field.name || field.id;
            
            field.addEventListener('focus', function() {
                if (!formAnalytics.fieldInteractions[fieldName]) {
                    formAnalytics.fieldInteractions[fieldName] = {
                        focusTime: Date.now(),
                        interactions: 0
                    };
                }
                formAnalytics.fieldInteractions[fieldName].interactions++;
            });
            
            field.addEventListener('blur', function() {
                if (this.value.trim() === '' && formAnalytics.fieldInteractions[fieldName]) {
                    formAnalytics.abandonedFields.push(fieldName);
                }
            });
        });
        
        // Enhanced form submission with validation
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            formAnalytics.completionTime = Date.now() - formAnalytics.startTime;
            
            // Validate form data
            const formData = new FormData(form);
            const validation = validateFormData(formData);
            
            if (!validation.isValid) {
                showValidationErrors(validation.errors);
                return;
            }
            
            // Show loading state
            showFormLoading();
            
            // Track successful form submission
            trackEvent('form_submitted', {
                completion_time: formAnalytics.completionTime,
                field_interactions: Object.keys(formAnalytics.fieldInteractions).length,
                abandoned_fields: formAnalytics.abandonedFields.length
            });
            
            // Submit form data
            submitFormData(formData)
                .then(response => {
                    hideFormLoading();
                    showSuccessMessage();
                    form.reset();
                })
                .catch(error => {
                    hideFormLoading();
                    showErrorMessage(error.message);
                });
        });
    }
    
    // Form validation function
    function validateFormData(formData) {
        const errors = [];
        const requiredFields = ['company', 'contact-name', 'email', 'phone', 'country'];
        
        requiredFields.forEach(field => {
            if (!formData.get(field) || formData.get(field).trim() === '') {
                errors.push(`${field.replace('-', ' ')} is required`);
            }
        });
        
        // Email validation
        const email = formData.get('email');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Phone validation
        const phone = formData.get('phone');
        if (phone && !/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s+/g, ''))) {
            errors.push('Please enter a valid phone number');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
    
    // Enhanced analytics tracking
    function trackEvent(eventName, parameters = {}) {
        console.log('Analytics Event:', eventName, parameters);
        
        // Google Analytics 4 (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'engagement',
                ...parameters
            });
        }
    }
    
    // Scroll depth tracking
    function initScrollTracking() {
        let maxScroll = 0;
        const milestones = [25, 50, 75, 100];
        const tracked = new Set();
        
        window.addEventListener('scroll', throttle(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
            );
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                milestones.forEach(milestone => {
                    if (scrollPercent >= milestone && !tracked.has(milestone)) {
                        tracked.add(milestone);
                        trackEvent('scroll_depth', { percent: milestone });
                    }
                });
            }
        }, 250));
    }
    
    // Performance monitoring
    function initPerformanceMonitoring() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    
                    trackEvent('page_performance', {
                        load_time: Math.round(perfData.loadEventEnd - perfData.loadEventStart),
                        dom_ready: Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart),
                        total_time: Math.round(perfData.loadEventEnd - perfData.navigationStart)
                    });
                }, 0);
            });
        }
    }
    
    // Enhanced contact widget tracking
    function initEnhancedContactTracking() {
        const widgets = document.querySelectorAll('.contact-widget');
        
        widgets.forEach(widget => {
            widget.addEventListener('click', function(e) {
                const contactType = this.classList.contains('phone') ? 'phone' :
                                  this.classList.contains('whatsapp') ? 'whatsapp' : 'email';
                
                trackEvent('contact_widget_click', {
                    contact_method: contactType,
                    location: 'floating_widget'
                });
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
    }
    
    // Utility functions
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    function showFormLoading() {
        const submitBtn = document.querySelector('#export-form button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Inquiry...';
        }
    }
    
    function hideFormLoading() {
        const submitBtn = document.querySelector('#export-form button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Export Inquiry';
        }
    }
    
    function showSuccessMessage() {
        showNotification('Export inquiry sent successfully! We will contact you within 24 hours.', 'success');
    }
    
    function showErrorMessage(message) {
        showNotification(`Error: ${message}. Please try again or contact us directly.`, 'error');
    }
    
    function showValidationErrors(errors) {
        const errorMessage = 'Please fix the following errors:\n• ' + errors.join('\n• ');
        showNotification(errorMessage, 'error');
    }
    
    async function submitFormData(formData) {
        // Convert FormData to object
        const data = {};
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }
        
        // Simulate form submission for demo
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // In production, this would be a real API call
                resolve({ success: true });
            }, 2000);
        });
    }

    // Interactive Product Showcase
    function initInteractiveProducts() {
        // Product Filter Tabs
        const filterTabs = document.querySelectorAll('.filter-tab');
        const productCards = document.querySelectorAll('.modern-product-card');
        
        filterTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const category = this.dataset.category;
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Filter products
                productCards.forEach(card => {
                    const productCategory = card.dataset.category;
                    
                    if (category === 'all' || productCategory === category) {
                        card.style.display = 'block';
                        card.style.animation = 'productCardEnter 0.6s ease forwards';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Track filter usage
                trackEvent('product_filter_used', { category: category });
            });
        });

        // Product Action Buttons
        const viewDetailsButtons = document.querySelectorAll('.view-details');
        const viewSpecsButtons = document.querySelectorAll('.view-specs');
        
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const product = this.dataset.product;
                showProductDetails(product);
                trackEvent('product_details_viewed', { product: product });
            });
        });
        
        viewSpecsButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                showProductSpecs();
                trackEvent('product_specs_viewed');
            });
        });

        // Interactive Feature Items with Tooltips
        const featureItems = document.querySelectorAll('.product-features-interactive .feature-item');
        
        featureItems.forEach(item => {
            const tooltip = document.createElement('div');
            tooltip.className = 'feature-tooltip';
            tooltip.textContent = item.dataset.info;
            item.appendChild(tooltip);
            
            item.addEventListener('mouseenter', function() {
                trackEvent('product_feature_hovered', { 
                    feature: item.querySelector('span').textContent 
                });
            });
        });

        // Product Card Hover Analytics
        productCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const product = this.dataset.product;
                trackEvent('product_card_hovered', { product: product });
            });
        });

        // View Our Products Button Functionality
        const viewProductsBtn = document.querySelector('.btn-secondary');
        if (viewProductsBtn) {
            viewProductsBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Smooth scroll to products section
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add a highlight animation to the products section
                    productsSection.classList.add('highlight-section');
                    setTimeout(() => {
                        productsSection.classList.remove('highlight-section');
                    }, 2000);
                }
                
                trackEvent('view_products_clicked', { source: 'hero_button' });
            });
        }
    }

    // Show Product Details Modal/Popup
    function showProductDetails(product) {
        const productData = {
            turmeric: {
                name: 'Premium Turmeric',
                details: 'Our turmeric is grown using traditional organic methods in Ghana\'s rich soils. High curcumin content (3-5%) ensures maximum health benefits and vibrant color for your products.',
                specifications: [
                    'Curcumin Content: 3-5%',
                    'Moisture: ≤ 10%',
                    'Ash Content: ≤ 9%',
                    'Lead: ≤ 10 ppm',
                    'Packaging: 25kg PP bags'
                ]
            },
            ginger: {
                name: 'Fresh Ginger',
                details: 'Hand-selected fresh ginger with intense aromatic profile. High gingerol content provides the perfect balance of flavor and health benefits.',
                specifications: [
                    'Gingerol Content: 1.5-3%',
                    'Moisture: ≤ 12%',
                    'Fiber: 3-5%',
                    'Oil Content: 1.5-2.5%',
                    'Packaging: 25kg jute bags'
                ]
            },
            chili: {
                name: 'Chili Peppers',
                details: 'Sun-dried chili peppers with consistent heat levels. Perfect for both culinary and commercial food processing applications.',
                specifications: [
                    'Scoville Rating: 30,000-50,000 SHU',
                    'Moisture: ≤ 8%',
                    'Capsaicin: 0.8-1.2%',
                    'Color Value: 2500+ ASTA',
                    'Packaging: 20kg cartons'
                ]
            }
        };

        const data = productData[product];
        if (data) {
            showNotification(`${data.name} Details:\n\n${data.details}\n\nKey Specifications:\n• ${data.specifications.join('\n• ')}`, 'info');
        }
    }

    // Show Product Specifications
    function showProductSpecs() {
        const specsTable = document.querySelector('.product-comparison-chart');
        if (specsTable) {
            specsTable.scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight the comparison table
            specsTable.classList.add('highlight-section');
            setTimeout(() => {
                specsTable.classList.remove('highlight-section');
            }, 2000);
        }
    }

    // Modern Animations for Features
    function initModernAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe feature items
        const featureItems = document.querySelectorAll('.feature-item, .modern-product-card, .trust-item');
        featureItems.forEach(item => {
            observer.observe(item);
        });

        // Parallax effect for hero background
        window.addEventListener('scroll', throttle(() => {
            const scrolled = window.pageYOffset;
            const heroBackground = document.querySelector('.hero-background');
            
            if (heroBackground && scrolled < window.innerHeight) {
                const speed = scrolled * 0.5;
                heroBackground.style.transform = `translateY(${speed}px)`;
            }
        }, 16));
    }

    // Modern Floating Action Menu
    function initFloatingActionMenu() {
        const floatingMenuToggle = document.getElementById('floatingMenuToggle');
        const floatingActions = document.querySelector('.floating-actions');
        const quickQuoteBtn = document.getElementById('quickQuoteBtn');
        const quickQuotePopup = document.getElementById('quickQuotePopup');
        const closeQuotePopup = document.getElementById('closeQuotePopup');
        const quickQuoteForm = document.getElementById('quickQuoteForm');
        
        if (!floatingMenuToggle) return;
        
        let menuOpen = false;
        
        // Toggle floating menu
        floatingMenuToggle.addEventListener('click', function() {
            menuOpen = !menuOpen;
            this.classList.toggle('active', menuOpen);
            floatingActions.classList.toggle('active', menuOpen);
            
            trackEvent('floating_menu_toggled', { opened: menuOpen });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (menuOpen && !e.target.closest('.modern-floating-menu')) {
                menuOpen = false;
                floatingMenuToggle.classList.remove('active');
                floatingActions.classList.remove('active');
            }
        });
        
        // Quick quote popup
        if (quickQuoteBtn) {
            quickQuoteBtn.addEventListener('click', function(e) {
                e.preventDefault();
                quickQuotePopup.classList.add('active');
                document.body.style.overflow = 'hidden';
                trackEvent('quick_quote_opened');
            });
        }
        
        // Close quote popup
        if (closeQuotePopup) {
            closeQuotePopup.addEventListener('click', function() {
                quickQuotePopup.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close popup when clicking overlay
        if (quickQuotePopup) {
            quickQuotePopup.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Quick quote form submission
        if (quickQuoteForm) {
            quickQuoteForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalContent = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate submission
                setTimeout(() => {
                    quickQuotePopup.classList.remove('active');
                    document.body.style.overflow = '';
                    showNotification('Quick quote request sent successfully! We will respond within 2 hours.', 'success');
                    
                    // Reset form
                    this.reset();
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    
                    trackEvent('quick_quote_submitted', data);
                }, 2000);
            });
        }
        
        // Floating action buttons
        const floatingActionBtns = document.querySelectorAll('.floating-action-btn:not(.quote)');
        floatingActionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.classList.contains('phone') ? 'phone' :
                              this.classList.contains('whatsapp') ? 'whatsapp' : 'email';
                
                trackEvent('floating_action_clicked', { action: action });
                
                // Visual feedback
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        });
        
        // Auto-pulse menu button occasionally
        setInterval(() => {
            if (!menuOpen && floatingMenuToggle) {
                floatingMenuToggle.classList.add('pulse-once');
                setTimeout(() => {
                    floatingMenuToggle.classList.remove('pulse-once');
                }, 1000);
            }
        }, 30000); // Every 30 seconds
    }

    // Interactive Contact Widgets Enhancement (Legacy support)
    function initEnhancedContactWidgets() {
        const widgets = document.querySelectorAll('.contact-widget');
        
        widgets.forEach(widget => {
            widget.addEventListener('click', function(e) {
                const contactType = this.classList.contains('phone') ? 'phone' :
                                  this.classList.contains('whatsapp') ? 'whatsapp' : 'email';
                
                trackEvent('legacy_contact_widget_click', {
                    contact_method: contactType
                });
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
        initAdvancedFormTracking(); // Updated to use enhanced form tracking
        initScrollToTop();
        initScrollAnimations();
        initEnhancedContactTracking(); // Updated to use enhanced contact tracking
        initProductQuotes();
        initScrollTracking(); // New scroll tracking
        initPerformanceMonitoring(); // New performance monitoring
        initInteractiveProducts(); // New interactive product showcase
        initModernAnimations(); // New modern animations
        initFloatingActionMenu(); // Modern floating action menu
        initEnhancedContactWidgets(); // Enhanced contact widgets (legacy support)
        
        // Track page view
        trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
        
        // Add loaded class to body for CSS animations
        document.body.classList.add('loaded');
        
        console.log('🚀 Ultra-Modern Interactive Farm2Spice website initialized successfully! 🌶️');
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