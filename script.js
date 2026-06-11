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
