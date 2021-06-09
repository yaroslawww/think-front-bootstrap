/*
document.body.addEventListener('class_add', function (e) { e.detail.classes }, false);
document.body.addEventListener('class_remove', function (e) { e.detail.classes }, false);
document.body.addEventListener('class_toggle', function (e) { e.detail.classes }, false);

data-body-class-add="class1,class2"
data-body-class-remove="class1,class2"
data-body-class-toggle="class1,class2"
*/
document.addEventListener('DOMContentLoaded', () => {
  function bodyClassPrepare(event, item) {
    if (item.hasAttribute('data-click-prevent')) {
      event.preventDefault();
    }
    let el;
    if (item.hasAttribute('data-target')) {
      el = document.querySelector(item.getAttribute('data-target'));
    } else {
      el = document.body;
    }

    return el;
  }
  document.querySelectorAll('[data-body-class-add]').forEach((item) => {
    item.addEventListener('click', (event) => {
      const el = bodyClassPrepare(event, item);
      if (el) {
        const classes = item.getAttribute('data-body-class-add').split(',');
        el.classList.add(...classes);
        el.dispatchEvent(new CustomEvent('class_add', { detail: { classes } }));
      }
    });
  });
  document.querySelectorAll('[data-body-class-remove]').forEach((item) => {
    item.addEventListener('click', (event) => {
      const el = bodyClassPrepare(event, item);
      if (el) {
        const classes = item.getAttribute('data-body-class-remove').split(',');
        el.classList.remove(...classes);
        el.dispatchEvent(new CustomEvent('class_remove', { detail: { classes } }));
      }
    });
  });
  document.querySelectorAll('[data-body-class-toggle]').forEach((item) => {
    item.addEventListener('click', (event) => {
      const el = bodyClassPrepare(event, item);
      if (el) {
        const classes = item.getAttribute('data-body-class-toggle').split(',');
        classes.forEach((singleClass) => {
          el.classList.toggle(singleClass);
        });
        el.dispatchEvent(new CustomEvent('class_toggle', { detail: { classes } }));
      }
    });
  });
});
