document.addEventListener('DOMContentLoaded', () => {

    // Sticky nav treatment stays lightweight and only toggles a class.
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });

    // Mobile nav uses the same active state for overlay and hamburger morph.
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const setMenuState = (isOpen) => {
        navMenu.classList.toggle('active', isOpen);
        navToggle.classList.toggle('active', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    };

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.addEventListener('click', () => {
        setMenuState(!navMenu.classList.contains('active'));
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            setMenuState(false);
        });
    });

    // Mobile lang toggle mirrors desktop behavior
    const langToggleMobile = document.getElementById('langToggleMobile');
    if (langToggleMobile) {
        langToggleMobile.addEventListener('click', () => {
            document.getElementById('langToggle')?.click();
            setMenuState(false);
        });
    }

    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            setMenuState(false);
        }
    });

    // Smooth scroll offset keeps the floating nav from covering anchors.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = nav.offsetHeight;
                const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    // Contact form → WhatsApp redirect.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service');
            const serviceText = service.options[service.selectedIndex].text;
            const message = document.getElementById('message').value;
            const waMessage = `Halo yukbuatweb,\n\nNama: ${name}\nEmail: ${email}\nLayanan: ${serviceText}\n\nDetail Proyek:\n${message}\n\nTerima kasih.`;
            window.open(`https://wa.me/6283101901153?text=${encodeURIComponent(waMessage)}`, '_blank');
            contactForm.reset();
        });
    }

    // Tech stack items → WhatsApp redirect.
    document.querySelectorAll('.tech-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const techName = item.querySelector('.tech-name').textContent;
            const techRange = item.querySelector('.tech-range').textContent;
            const waMessage = `Halo yukbuatweb, saya tertarik dengan teknologi *${techName}* (${techRange}).\n\nMohon info lebih lanjut. Terima kasih.`;
            window.open(`https://wa.me/6283101901153?text=${encodeURIComponent(waMessage)}`, '_blank');
        });
    });

    // Add-on services → WhatsApp redirect.
    document.querySelectorAll('.tech-addon-item').forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const serviceName = item.querySelector('span:first-child').textContent;
            const priceRange = item.querySelector('span:last-child').textContent;
            const waMessage = `Halo yukbuatweb, saya tertarik dengan layanan *${serviceName}* (${priceRange}).\n\nMohon info lebih lanjut. Terima kasih.`;
            window.open(`https://wa.me/6283101901153?text=${encodeURIComponent(waMessage)}`, '_blank');
        });
    });

    // Pricing cards → WhatsApp redirect.
    document.querySelectorAll('.plan-card').forEach(card => {
        const cardTitle = card.querySelector('h3')?.textContent;
        const cardPrice = card.querySelector('.plan-price')?.textContent;
        if (cardTitle && cardPrice) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const waMessage = `Halo yukbuatweb, saya tertarik dengan layanan *${cardTitle}* (${cardPrice}).\n\nMohon info lebih lanjut. Terima kasih.`;
                window.open(`https://wa.me/6283101901153?text=${encodeURIComponent(waMessage)}`, '_blank');
            });
        }
    });

    // Pricing breakdown items → WhatsApp redirect.
    document.querySelectorAll('.pricing-breakdown article').forEach(item => {
        const serviceName = item.querySelector('span:first-child').textContent;
        const priceRange = item.querySelector('strong').textContent;
        item.style.cursor = 'pointer';
        item.addEventListener('click', () => {
            const waMessage = `Halo yukbuatweb, saya tertarik dengan layanan *${serviceName}* (${priceRange}).\n\nMohon info lebih lanjut. Terima kasih.`;
            window.open(`https://wa.me/6283101901153?text=${encodeURIComponent(waMessage)}`, '_blank');
        });
    });

    // FAQ accordion.
    document.querySelectorAll('.faq-question').forEach(qBtn => {
        qBtn.addEventListener('click', () => {
            const item = qBtn.parentElement;
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    // Scroll reveal: transform/opacity only for mobile-friendly motion.
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -56px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.badge, .hero-title, .hero-desc, .hero-cta, .hero-panel, .hero-stat, .section-header, .service-card, .package, .why-item, .tech-item, .tech-addons, .pricing-table-wrapper, .faq-item, .contact-form, .contact-info-card, .cta-banner .container').forEach((el, index) => {
        el.classList.add('reveal-ready');
        el.style.transitionDelay = `${Math.min(index % 6, 5) * 70}ms`;
        observer.observe(el);
    });

});