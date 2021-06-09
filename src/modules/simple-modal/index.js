/*
Part of accordion functionality.
@see /src/scss/parts/_simple-modal.scss
*/

import SimpleModal from './simple-modal';

document.addEventListener('DOMContentLoaded', () => {
  window.thinkSimpleModal = new SimpleModal();

  document.body.addEventListener('click', (event) => {
    if (!event.target.classList.contains('simple-modal__trigger')) {
      return;
    }
    event.preventDefault();
    const el = event.target.closest('.simple-modal');
    if (el && window.thinkSimpleModal) {
      window.thinkSimpleModal.toggle(el);
    }
  });

  document.body.addEventListener('click', (event) => {
    if (!event.target.hasAttribute('data-simple-modal-trigger')) {
      return;
    }
    event.preventDefault();
    const el = document.querySelector(event.target.getAttribute('data-simple-modal-trigger'));
    if (el && window.thinkSimpleModal) {
      window.thinkSimpleModal.open(el);
    }
  });
});
