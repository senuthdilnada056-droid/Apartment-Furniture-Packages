/* ============================================
   EVIN Interior Creation - JavaScript
   Interactive Features & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ========== DOM ELEMENTS ==========
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const testimonialsTrack = document.getElementById('testimonialsTrack');
    const prevTestimonial = document.getElementById('prevTestimonial');
    const nextTestimonial = document.getElementById('nextTestimonial');
    const testimonialDots = document.getElementById('testimonialDots');
    const faqItems = document.querySelectorAll('.faq-item');
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    // ========== HEADER SCROLL EFFECT ==========
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();

    // ========== MOBILE HAMBURGER MENU ==========
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // ========== SMOOTH SCROLLING ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ACTIVE NAVIGATION LINK ON SCROLL ==========
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + header.offsetHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ========== SCROLL REVEAL ANIMATIONS ==========
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add small delay based on element's animation-delay style
                const delay = parseFloat(entry.target.style.animationDelay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay * 1000);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== BACK TO TOP BUTTON ==========
    function toggleBackToTop() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop, { passive: true });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== GALLERY LIGHTBOX ==========
    const galleryImages = [
        { src: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&q=80', caption: 'Modern Living Room' },
        { src: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80', caption: 'Elegant Bedroom' },
        { src: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&q=80', caption: 'Dining Area' },
        { src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', caption: 'Modern Apartment' },
        { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', caption: 'Custom Furniture' },
        { src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', caption: 'Interior Design Project' }
    ];

    let currentLightboxIndex = 0;

    function openLightbox(index) {
        currentLightboxIndex = index;
        lightboxImage.src = galleryImages[index].src;
        lightboxCaption.textContent = galleryImages[index].caption;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
        currentLightboxIndex = (currentLightboxIndex + direction + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentLightboxIndex].src;
        lightboxCaption.textContent = galleryImages[currentLightboxIndex].caption;
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View ${galleryImages[index].caption} in full size`);
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close lightbox on background click
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // ========== TESTIMONIAL SLIDER ==========
    let currentSlide = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const totalSlides = testimonialCards.length;
    let autoSlideInterval;

    function getSlidesPerView() {
        return window.innerWidth <= 768 ? 1 : 2;
    }

    function updateSlider() {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;

        // Ensure currentSlide is within bounds
        if (currentSlide > maxSlide) currentSlide = maxSlide;
        if (currentSlide < 0) currentSlide = 0;

        const slideWidth = 100 / slidesPerView;
        const gapOffset = (24 / testimonialsTrack.parentElement.offsetWidth) * 100;
        const translateX = -(currentSlide * (slideWidth + gapOffset / slidesPerView));
        testimonialsTrack.style.transform = `translateX(${translateX}%)`;

        // Update dots
        const dots = document.querySelectorAll('.testimonial-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function createDots() {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;
        testimonialDots.innerHTML = '';

        for (let i = 0; i <= maxSlide; i++) {
            const dot = document.createElement('button');
            dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dot.addEventListener('click', () => {
                currentSlide = i;
                updateSlider();
                resetAutoSlide();
            });
            testimonialDots.appendChild(dot);
        }
    }

    function nextSlide() {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;
        currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
        updateSlider();
    }

    function prevSlide() {
        const slidesPerView = getSlidesPerView();
        const maxSlide = totalSlides - slidesPerView;
        currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
        updateSlider();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    prevTestimonial.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    nextTestimonial.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    // Touch/swipe support for testimonials
    let touchStartX = 0;
    let touchEndX = 0;

    testimonialsTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialsTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetAutoSlide();
        }
    }, { passive: true });

    // Initialize testimonials
    createDots();
    startAutoSlide();

    // Recalculate on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createDots();
            updateSlider();
        }, 250);
    }, { passive: true });

    // ========== FAQ ACCORDION ==========
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
        });
    });

    // ========== FORM VALIDATION ==========
    const formFields = {
        name: {
            element: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validate: (value) => value.trim().length >= 2
        },
        email: {
            element: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        },
        phone: {
            element: document.getElementById('phone'),
            error: document.getElementById('phoneError'),
            validate: (value) => /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(value.replace(/\s/g, ''))
        }
    };

    function validateField(fieldName) {
        const field = formFields[fieldName];
        const isValid = field.validate(field.element.value);
        const parent = field.element.closest('.form-group');

        if (!isValid && field.element.value.trim() !== '') {
            parent.classList.add('error');
        } else {
            parent.classList.remove('error');
        }

        return isValid;
    }

    // Real-time validation on blur
    Object.keys(formFields).forEach(fieldName => {
        formFields[fieldName].element.addEventListener('blur', () => {
            if (formFields[fieldName].element.value.trim() !== '') {
                validateField(fieldName);
            }
        });

        formFields[fieldName].element.addEventListener('input', () => {
            const parent = formFields[fieldName].element.closest('.form-group');
            parent.classList.remove('error');
        });
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        let isFormValid = true;

        Object.keys(formFields).forEach(fieldName => {
            const field = formFields[fieldName];
            const parent = field.element.closest('.form-group');

            if (!field.validate(field.element.value)) {
                parent.classList.add('error');
                isFormValid = false;
            } else {
                parent.classList.remove('error');
            }
        });

        if (isFormValid) {
            // Simulate form submission
            const submitBtn = document.getElementById('formSubmit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                document.getElementById('formSuccess').style.display = 'block';

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    document.getElementById('formSuccess').style.display = 'none';
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 5000);
            }, 1500);
        }
    });

    // ========== PARALLAX EFFECT FOR HERO ==========
    const heroBg = document.querySelector('.hero-bg img');

    if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.4;
            heroBg.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0002})`;
        }, { passive: true });
    }

    // ========== COUNTER ANIMATION FOR ABOUT SECTION ==========
    const aboutExpNumber = document.querySelector('.about-exp-number');

    if (aboutExpNumber) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(aboutExpNumber, 0, 15, 1500);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(aboutExpNumber);
    }

    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOut);

            element.textContent = current + '+';

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ========== LAZY LOADING IMAGES ==========
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========== SMOOTH REVEAL FOR HERO ELEMENTS ==========
    const heroElements = document.querySelectorAll('.hero .reveal-up');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('revealed');
        }, 300 + (index * 150));
    });

    console.log('EVIN Interior Creation - Website loaded successfully!');
});
