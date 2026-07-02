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

function parseNumericValue(value) {
  if (value === null || value === undefined) return null;
  if (typeof value === 'number' && Number.isFinite(value)) return value;

  const stringValue = String(value).trim().replace(/\s+/g, '');
  if (!stringValue) return null;

  const sign = stringValue.startsWith('-') ? -1 : 1;
  const sanitized = stringValue.replace(/[+-]/g, '');
  const cleaned = sanitized.replace(/[^\d,.-]/g, '');

  if (!cleaned) return null;

  if (cleaned.includes(',') && cleaned.includes('.')) {
    const lastComma = cleaned.lastIndexOf(',');
    const lastDot = cleaned.lastIndexOf('.');
    const decimalSeparator = lastComma > lastDot ? ',' : '.';
    const thousandSeparator = decimalSeparator === ',' ? '.' : ',';
    const normalized = cleaned
      .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
      .replace(decimalSeparator, '.');

    return Number(normalized) * sign;
  }

  if (cleaned.includes(',')) {
    return Number(cleaned.replace(/,/g, '.')) * sign;
  }

  if (cleaned.includes('.')) {
    return Number(cleaned) * sign;
  }

  return Number(cleaned) * sign;
}

function getCounterSettings(element) {
  const rawText = element.textContent.trim();
  const dataTarget = element.dataset.target;
  const targetValue = parseNumericValue(dataTarget ?? rawText);

  if (targetValue === null) return null;

  const className = Array.from(element.classList).find((cls) => cls.startsWith('count-to-'));
  const classValue = className ? parseNumericValue(className.replace('count-to-', '')) : null;
  const finalTarget = classValue ?? targetValue;

  const prefix = element.dataset.prefix ?? rawText.match(/^[^0-9+-]*/)?.[0] ?? '';
  const suffix = element.dataset.suffix ?? rawText.match(/[^0-9+-]*$/)?.[0] ?? '';
  const decimalPlaces = Math.max(
    0,
    (String(dataTarget ?? className ?? rawText).match(/[.,](\d+)/)?.[1]?.length) ?? 0
  );

  return {
    targetValue: finalTarget,
    prefix,
    suffix,
    decimalPlaces,
  };
}

// Formato i valori numerici per ottenere una lettura più leggibile durante l'animazione dei contatori.
function formatCounterValue(value, { prefix = '', suffix = '', decimalPlaces = 0 }) {
  const roundedValue = Number(value).toFixed(decimalPlaces);
  const [whole, fractional = ''] = roundedValue.split('.');
  const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const decimalSeparator = decimalPlaces > 0 ? ',' : '';
  const fractionalPart = decimalPlaces > 0 ? `${decimalSeparator}${fractional}` : '';

  return `${prefix}${formattedWhole}${fractionalPart}${suffix}`;
}

// Avvio la numerazione solo quando il blocco è visibile per ridurre il carico computazionale.
function animateCounter(element) {
  if (!element || element.dataset.animated === 'true') return;

  const settings = getCounterSettings(element);
  if (!settings) return;

  const { targetValue, prefix, suffix, decimalPlaces } = settings;
  const duration = 1200;
  const startValue = 0;
  const startTime = performance.now();

  element.textContent = formatCounterValue(startValue, { prefix, suffix, decimalPlaces });
  element.dataset.animated = 'true';

  const step = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + (targetValue - startValue) * easedProgress;

    element.textContent = formatCounterValue(currentValue, { prefix, suffix, decimalPlaces });
    element.setAttribute('aria-label', formatCounterValue(targetValue, { prefix, suffix, decimalPlaces }));

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.setAttribute('aria-live', 'polite');
    }
  };

  requestAnimationFrame(step);
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
        entry.target.querySelectorAll('.animate-number').forEach((counter) => animateCounter(counter));
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
