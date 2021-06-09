/*
Part of accordion functionality.
@see /src/scss/parts/_tabs.scss
*/

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[tab-target]').forEach((item) => {
    item.addEventListener('click', (event) => {
      const buttonsGroup = event.currentTarget.closest('.tabs-buttons');
      if (buttonsGroup) {
        buttonsGroup.querySelectorAll('[tab-target]').forEach((tabButton) => {
          tabButton.classList.remove('active');
        });
      }
      event.currentTarget.classList.add('active');

      let contentSelector = buttonsGroup.getAttribute('tabs-content-target');

      if (contentSelector && contentSelector.length > 0) {
        contentSelector = `${contentSelector} ${event.currentTarget.getAttribute('tab-target')}`;
      } else {
        contentSelector = event.currentTarget.getAttribute('tab-target');
      }

      document.querySelectorAll(contentSelector).forEach((tabContent) => {
        const contentGroup = tabContent.closest('.tabs-content');
        if (contentGroup) {
          contentGroup.querySelectorAll('.tab-content').forEach((tabContentElement) => {
            tabContentElement.classList.remove('active');
          });
        }
        tabContent.classList.add('active');
      });
    });
  });
  document.querySelectorAll('[tab-default]').forEach((item) => {
    setTimeout(() => item.click(), 0);
  });
});
