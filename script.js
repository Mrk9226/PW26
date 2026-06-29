const menuToggle = document.querySelector('.menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

function toggleMobileMenu() {
  const isOpen = mobileMenuOverlay.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeMobileMenu() {
  mobileMenuOverlay.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Apri menu');
  document.body.style.overflow = '';
}

menuToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  toggleMobileMenu();
});

mobileMenuOverlay.addEventListener('click', (event) => {
  if (event.target === mobileMenuOverlay) {
    closeMobileMenu();
  }
});

mobileNavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenuOverlay.classList.contains('open')) {
    closeMobileMenu();
  }
});

// Inizializza Flickity per il carousel delle certificazioni
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.logo-carousel');
  if (carousel && typeof Flickity !== 'undefined') {
    new Flickity(carousel, {
      pageDots: false,
      autoPlay: 2000,
      wrapAround: true,     
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll('.bento-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -20px 0px"
  });

  items.forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
  });
});
