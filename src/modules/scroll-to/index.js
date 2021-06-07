document.addEventListener("DOMContentLoaded", () => {
    document
        .querySelectorAll('a[href^="#"]')
        .forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                let hash = e.currentTarget.getAttribute('href');
                let target = document.querySelector(hash);
                let headerOffset = 100;
                let elementPosition = target.offsetTop;
                let offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            });
        });
});

