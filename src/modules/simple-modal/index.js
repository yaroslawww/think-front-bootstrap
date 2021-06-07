/*
Part of accordion functionality.
@see /src/scss/parts/_simple-modal.scss
*/


document.addEventListener("DOMContentLoaded", () => {
    window.SimpleModal = class SimpleModal {
        constructor(selector) {
            this.selector = selector
            this.openClass = 'simple-modal--show';
            this.bodyClass = 'disable-scroll';
        }

        realOpen(el) {
            document.body.classList.add(this.bodyClass);
            el.classList.add(this.openClass);
        }

        realClose(el) {
            el.classList.remove(this.openClass);
            document.body.classList.remove(this.bodyClass);
        }

        realToggle(el) {
            if(el.classList.contains(this.openClass)) {
                this.realClose(el)
            } else {
                this.realOpen(el)
            }
        }

        open(el) {
            if(el) {
                this.realOpen(el)
            } else {
                document.querySelectorAll(this.selector).forEach(item => {
                    this.realOpen(item)
                })
            }
        }

        close(el) {
            if(el) {
                this.realClose(el)
            } else {
                document.querySelectorAll(this.selector).forEach(item => {
                    this.realClose(item)
                })
            }
        }

        toggle(el) {
            if(el) {
                this.realToggle(el)
            } else {
                document.querySelectorAll(this.selector).forEach(item => {
                    this.realToggle(item)
                })
            }
        };
    };


    document.body.addEventListener('click', event => {
        if (!event.target.classList.contains('simple-modal__trigger')) {
            return
        }
        event.preventDefault()
        let el = event.target.closest('.simple-modal')
        if(el) {
            (new SimpleModal).toggle(el)
        }
    });

    document.body.addEventListener('click', event => {
        if (!event.target.hasAttribute("data-simple-modal-trigger")) {
            return
        }
        event.preventDefault()
        let el = document.querySelector(event.target.getAttribute("data-simple-modal-trigger"))
        if(el) {
            (new SimpleModal).open(el)
        }
    });
});