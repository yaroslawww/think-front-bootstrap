/*
Part of accordion functionality.
@see /src/scss/parts/_simple-modal.scss
*/


import SimpleModal from "./simple-modal";

document.addEventListener("DOMContentLoaded", () => {
    window.thinkSimpleModal = new SimpleModal

    document.body.addEventListener('click', event => {
        if (!event.target.classList.contains('simple-modal__trigger')) {
            return
        }
        event.preventDefault()
        let el = event.target.closest('.simple-modal')
        if(el) {
            thinkSimpleModal.toggle(el)
        }
    });

    document.body.addEventListener('click', event => {
        if (!event.target.hasAttribute("data-simple-modal-trigger")) {
            return
        }
        event.preventDefault()
        let el = document.querySelector(event.target.getAttribute("data-simple-modal-trigger"))
        if(el) {
            thinkSimpleModal.open(el)
        }
    });
});