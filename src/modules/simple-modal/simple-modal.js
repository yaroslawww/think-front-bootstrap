class SimpleModal {
  constructor(params = {}) {
    this.selector = params.selector || '';
    this.openClass = params.openClass || 'simple-modal--show';
    this.bodyClass = params.bodyClass || 'disable-scroll';
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
    if (el.classList.contains(this.openClass)) {
      this.realClose(el);
    } else {
      this.realOpen(el);
    }
  }

  open(el) {
    if (el) {
      this.realOpen(el);
    } else {
      document.querySelectorAll(this.selector).forEach((item) => {
        this.realOpen(item);
      });
    }
  }

  close(el) {
    if (el) {
      this.realClose(el);
    } else {
      document.querySelectorAll(this.selector).forEach((item) => {
        this.realClose(item);
      });
    }
  }

  toggle(el) {
    if (el) {
      this.realToggle(el);
    } else {
      document.querySelectorAll(this.selector).forEach((item) => {
        this.realToggle(item);
      });
    }
  }
}

export default SimpleModal;
