class FontSelector {
  constructor(params = {}) {
    this.params = {};
    if (typeof params === 'object' && params !== null) {
      this.params = params;
    }

    this.classPrefix = this.params.classPrefix || 'font-selector';

    this.bindClick();
    this.bindClickOutside();
  }

  bindClickOutside() {
    if (document.querySelector(`.${this.classPrefix}`)) {
      document.addEventListener('click', (e) => {
        document.querySelectorAll(`.${this.classPrefix}`)
          .forEach((trigger) => {
            if (!trigger.contains(e.target)) {
              const menu = trigger.querySelector(`.${this.classPrefix}__menu`);
              this.closeMenu(menu);
            }
          });
      });
    }
  }

  bindClick() {
    document.querySelectorAll(`.${this.classPrefix}`)
      .forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          const menu = trigger.querySelector(`.${this.classPrefix}__menu`);
          if (menu && !menu.contains(e.target)) {
            e.preventDefault();
            this.toggleMenu(menu);
          }
        });
      });
    document.querySelectorAll(`.${this.classPrefix}__option`)
      .forEach((option) => {
        option.addEventListener('click', (e) => {
          e.preventDefault();
          const menu = option.closest(`.${this.classPrefix}__menu`);
          if (menu) {
            this.selectOption(option);
            this.closeMenu(menu);
          }
        });
      });
  }

  toggleMenu(menuEl) {
    if (menuEl) {
      if (menuEl.classList.contains(`.${this.classPrefix}--menu-open`)) {
        this.closeMenu(menuEl);
      } else {
        this.openMenu(menuEl);
      }
    }
  }

  openMenu(menuEl) {
    if (menuEl) {
      menuEl.querySelectorAll(`.${this.classPrefix}__option`)
        .forEach((option) => {
          const fontClass = this.getFontClass(option);
          if (fontClass && document.body.classList.contains(fontClass)) {
            this.setActiveOption(option);
          } else if (!fontClass && !this.hasClassWithPrefix(document.body)) {
            this.setActiveOption(option);
          }
        });
      menuEl.classList.add(...this.getMenuOpenClasses());
      menuEl.classList.remove(...this.getMenuCloseClasses());
    }
  }

  closeMenu(menuEl) {
    if (menuEl) {
      menuEl.classList.add(...this.getMenuCloseClasses());
      menuEl.classList.remove(...this.getMenuOpenClasses());
    }
  }

  getFontClass(option) {
    let fontClass = option.getAttribute('data-font-class');
    if (fontClass) {
      if (!fontClass.startsWith(this.getFontClassPrefix())) {
        fontClass = this.getFontClassPrefix() + fontClass;
      }
    }
    return fontClass;
  }

  selectOption(option) {
    if (option) {
      this.setActiveOption(option);

      this.removeClassByPrefix(document.body);
      const fontClass = this.getFontClass(option);
      if (fontClass) {
        document.body.classList.add(fontClass);
      }
    }
  }

  setActiveOption(option) {
    if (option) {
      const optionActiveClasses = this.getOptionActiveClasses();
      document.querySelectorAll(`.${this.classPrefix}__option`)
        .forEach((el) => {
          el.classList.remove(...optionActiveClasses);
        });
      option.classList.add(...optionActiveClasses);
    }
  }

  getMenuOpenClasses() {
    let classes = [`${this.classPrefix}--menu-open`];
    const userDefined = this.params.menuOpenClasses || [];
    if (Array.isArray(userDefined) && userDefined.length > 0) {
      classes = classes.concat(userDefined);
    }

    return classes;
  }

  getMenuCloseClasses() {
    let classes = [];
    const userDefined = this.params.menuCloseClasses || [];
    if (Array.isArray(userDefined) && userDefined.length > 0) {
      classes = classes.concat(userDefined);
    }

    return classes;
  }

  getOptionActiveClasses() {
    let classes = [`${this.classPrefix}--option-active`];
    const userDefined = this.params.optionActiveClasses || [];
    if (Array.isArray(userDefined) && userDefined.length > 0) {
      classes = classes.concat(userDefined);
    }

    return classes;
  }

  getFontClassPrefix() {
    return this.params.fontClassPrefix || 'use-font-';
  }

  getFontClassRegex() {
    return new RegExp(`\\b${this.getFontClassPrefix()}[\\S]*\\b`, 'g');
  }

  /* eslint-disable no-param-reassign */
  removeClassByPrefix(el) {
    el.className = el.className.replace(this.getFontClassRegex(), '');
  }

  hasClassWithPrefix(el) {
    return this.getFontClassRegex().test(el.className);
  }
}

export default FontSelector;
