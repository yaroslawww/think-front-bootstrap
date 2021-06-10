document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const hash = e.currentTarget.getAttribute('href');
        const target = document.querySelector(hash);
        if (target) {
          let headerOffset = parseInt(trigger.getAttribute('data-header-offset'), 10);
          headerOffset = (Number.isNaN(headerOffset) ? 0 : headerOffset);
          let elementPosition = parseInt(target.getBoundingClientRect().top, 10);
          elementPosition = (Number.isNaN(elementPosition) ? 0 : elementPosition);
          elementPosition += (window.pageYOffset || document.documentElement.scrollTop);
          const offsetPosition = elementPosition - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      });
    });
});
