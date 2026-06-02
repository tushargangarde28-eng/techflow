// ==================== INITIALIZE AOS ====================
AOS.init({
  duration: 800,
  once: true,
  offset: 100,
  easing: 'ease-in-out'
});

// ==================== GSAP ANIMATIONS ====================
gsap.registerPlugin(ScrollTrigger);

// Hero text animation
gsap.from('.hero-title', {
  duration: 1,
  y: 100,
  opacity: 0,
  ease: 'power3.out'
});

gsap.from('.hero-subtitle', {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.3,
  ease: 'power3.out'
});

gsap.from('.hero-buttons', {
  duration: 1,
  y: 30,
  opacity: 0,
  delay: 0.6,
  ease: 'power3.out'
});

// Parallax effect on scroll
gsap.to('.floating-icons', {
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  },
  y: 200,
  opacity: 0,
  ease: 'none'
});

// ==================== STICKY NAVBAR SCROLL EFFECT ====================
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('mainNav');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
    navbar.style.backdropFilter = 'blur(15px)';
    navbar.style.padding = '10px 0';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
    navbar.style.backdropFilter = 'blur(10px)';
    navbar.style.padding = '15px 0';
  }
});

// ==================== ACTIVE NAV LINK ON SCROLL ====================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
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
});

// ==================== ANIMATED COUNTERS ====================
const counters = document.querySelectorAll('.counter-number');

const startCounting = (counter) => {
  const target = parseInt(counter.getAttribute('data-target'));
  let current = 0;
  const increment = target / 50;
  const updateCounter = () => {
    current += increment;
    if (current < target) {
      counter.innerText = Math.ceil(current);
      setTimeout(updateCounter, 30);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
};

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounting(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => {
  counterObserver.observe(counter);
});

// ==================== BACK TO TOP BUTTON ====================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==================== SMOOTH SCROLLING FOR NAV LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
    }
  });
});

// ==================== BUTTON RIPPLE EFFECT ====================
const buttons = document.querySelectorAll('.btn-ripple, .btn-primary, .btn-outline-light');
buttons.forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 0.5s, opacity 0.5s';
    ripple.style.pointerEvents = 'none';
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
      ripple.remove();
    }, 500);
  });
});

// ==================== GSAP SERVICE CARD HOVER ====================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in'
    });
  });
});

// ==================== FLOATING ANIMATION FOR TECH ICONS ====================
const techItems = document.querySelectorAll('.tech-item');
techItems.forEach((item, index) => {
  gsap.to(item, {
    y: -5,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    delay: index * 0.1,
    ease: 'power1.inOut'
  });
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
  }
});

// ==================== FORM SUBMISSION HANDLER ====================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Show success message
    alert('Thank you for reaching out! Our team will get back to you within 24 hours.');
    this.reset();
  });
}

// ==================== NEWSLETTER FORM ====================
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    if (emailInput.value) {
      alert(`Thank you for subscribing! We'll send updates to ${emailInput.value}`);
      emailInput.value = '';
    }
  });
}

// ==================== PRELOADER / PAGE LOAD ANIMATION ====================
window.addEventListener('load', () => {
  // Add fade-in animation to all sections
  const allSections = document.querySelectorAll('section');
  allSections.forEach((section, index) => {
    section.style.animation = `fadeInUp 0.6s ease forwards ${index * 0.1}s`;
    section.style.opacity = '0';
    section.style.animationFillMode = 'forwards';
  });
  
  // Trigger AOS refresh
  AOS.refresh();
});

// ==================== HOVER ANIMATION FOR PRICING CARDS ====================
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.in'
    });
  });
});

// ==================== TESTIMONIAL AUTO-PLAY CONFIG ====================
const testimonialCarousel = document.querySelector('#testimonialCarousel');
if (testimonialCarousel) {
  const carousel = new bootstrap.Carousel(testimonialCarousel, {
    interval: 5000,
    wrap: true,
    pause: 'hover'
  });
}

// ==================== SCROLL REVEAL WITH GSAP ====================
// Animate elements when they come into view
gsap.utils.toArray('.service-card, .feature-card, .portfolio-card, .pricing-card').forEach((elem, i) => {
  ScrollTrigger.create({
    trigger: elem,
    start: 'top 85%',
    onEnter: () => {
      gsap.fromTo(elem, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1 }
      );
    },
    once: true
  });
});

// ==================== FLOATING WHATSAPP BUTTON SHOW/HIDE ====================
let lastScroll = 0;
const whatsappBtn = document.querySelector('.whatsapp-float');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 300) {
    // Scrolling down, hide button
    if (whatsappBtn) {
      whatsappBtn.style.opacity = '0';
      whatsappBtn.style.transform = 'scale(0.8)';
    }
  } else {
    // Scrolling up, show button
    if (whatsappBtn) {
      whatsappBtn.style.opacity = '1';
      whatsappBtn.style.transform = 'scale(1)';
    }
  }
  lastScroll = currentScroll;
});

// ==================== GLOW EFFECT ON ACTIVE ELEMENTS ====================
const allCards = document.querySelectorAll('.service-card, .feature-card, .portfolio-card, .pricing-card');
allCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

console.log('TechFlow website loaded successfully!');