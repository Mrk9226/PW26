// Ho separato la logica dei KPI per mantenere il codice più leggibile e manutenibile.

// Formato i valori numerici per garantire una visualizzazione uniforme nei contatori.
function formatValue(value, decimals) {
  return value.toLocaleString('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

// Avvio l'animazione dei contatori solo quando il blocco è pronto per essere mostrato.
function animateCounter(counter) {
  if (counter.dataset.animated === 'true') return;

  const target = Number(counter.dataset.target);

  if (Number.isNaN(target)) return;

  const suffix = counter.dataset.suffix || '';
  const decimals = Number.isInteger(target) ? 0 : 1;

  const duration = 1200;
  const startTime = performance.now();

  counter.dataset.animated = 'true';

  function update(currentTime) {
    const progress = Math.min(
      (currentTime - startTime) / duration,
      1
    );

    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;

    counter.textContent =
      formatValue(value, decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      counter.textContent =
        formatValue(target, decimals) + suffix;

      counter.setAttribute(
        'aria-label',
        formatValue(target, decimals) + suffix
      );
    }
  }

  requestAnimationFrame(update);
}

// Inizializzo gli indicatori al caricamento del DOM per evitare errori con gli elementi non ancora presenti.
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.animate-number');

  // Uso Intersection Observer per attivare l'animazione solo quando il contatore entra nel viewport.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.25
    }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});