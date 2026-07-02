// Recupero gli elementi essenziali per coordinare menu, focus e animazioni.
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenuOverlay = document.querySelector('.mobile-menu');
const mobileMenuPanel = document.querySelector('.mobile-menu-panel');
const mobileNavLinks = document.querySelectorAll('.mobile-nav a');
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

// Gestisco il menu mobile come overlay modale per migliorare l'usabilità sui dispositivi touch.
function handleMobileMenu(forceClose = false) {
  const isOpen = forceClose ? false : !mobileMenuOverlay.classList.contains('open');

  mobileMenuOverlay.classList.toggle('open', isOpen);
  mobileMenuOverlay.setAttribute('aria-hidden', String(!isOpen));
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Chiudi menu' : 'Apri menu');
  document.body.style.overflow = isOpen ? 'hidden' : '';

  if (isOpen) {
    requestAnimationFrame(() => {
      const firstLink = mobileNavLinks[0];
      if (firstLink) {
        firstLink.focus();
      }
    });
  } else {
    menuToggle.focus();
  }
}

// Mantengo il focus all'interno del pannello aperto per supportare la navigazione da tastiera.
function trapFocus(event) {
  if (!mobileMenuOverlay.classList.contains('open') || event.key !== 'Tab') return;

  const focusableElements = mobileMenuPanel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.shiftKey && document.activeElement === firstElement) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && document.activeElement === lastElement) {
    event.preventDefault();
    firstElement.focus();
  }
}

menuToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  handleMobileMenu();
});

mobileMenuOverlay.addEventListener('click', (event) => {
  if (event.target === mobileMenuOverlay) {
    handleMobileMenu(true);
  }
});

// Chiudo il menu dopo il click su un link per evitare di lasciare il contenuto sovrapposto.
mobileNavLinks.forEach((link) => {
  link.addEventListener('click', () => handleMobileMenu(true));
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileMenuOverlay.classList.contains('open')) {
    event.preventDefault();
    handleMobileMenu(true);
  }
});

document.addEventListener('keydown', trapFocus);

// Avvio le interazioni al caricamento del DOM per garantire che gli elementi siano disponibili.
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.logo-carousel');
  if (carousel && typeof Flickity !== 'undefined') {
    const carouselOptions = {
      pageDots: false,
      wrapAround: true,
      autoPlay: reducedMotionQuery.matches ? false : 2000,
      pauseAutoPlayOnHover: true,
      prevNextButtons: true,
      accessibility: true,
    };

    new Flickity(carousel, carouselOptions);
  }

  // Attivo l'animazione delle card solo quando entrano nel viewport per migliorare le prestazioni.
  const items = document.querySelectorAll('.bento-item');

  // Utilizzo Intersection Observer per evitare listener continui sullo scroll.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Attivo il blocco visibile e interrompo l'osservazione per ridurre operazioni non necessarie.
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -20px 0px',
  });

  // Inizializzo tutte le card con una classe di entrata prima di osservare il loro stato.
  items.forEach((item) => {
    item.classList.add('reveal');
    observer.observe(item);
  });

  // Aggiorno lo stato attivo del menu per riflettere la sezione attualmente visibile.

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const currentId = entry.target.id;

        // Rimuovo lo stato attivo dai link per ricostruire il riferimento corrente.
        navLinks.forEach((link) => {
          link.classList.remove('active');
        });

        // Seleziono il link corrispondente alla sezione visibile.
        const activeLink = document.querySelector(
          `.main-nav a[href="#${currentId}"]`
        );

        if (activeLink) {
          activeLink.classList.add('active');
        }
      });
    },


    {
      threshold: 0,
      rootMargin: '-30% 0px -60% 0px'
    }


  );

  // Osservo tutte le sezioni per aggiornare il menu in modo coerente.
  sections.forEach((section) => {
    navObserver.observe(section);
  });

});
