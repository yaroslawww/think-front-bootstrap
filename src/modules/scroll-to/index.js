document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('a[href^="#"]')
    .forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const hash = e.currentTarget.getAttribute('href');
        const target = document.querySelector(hash);
        const headerOffset = 100;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      });
    });
});
