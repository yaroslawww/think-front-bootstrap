/*
Part of accordion functionality.
@see /src/scss/parts/_tabs.scss
*/

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[tab-target]').forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      const tabTarget = event.currentTarget.getAttribute('tab-target');

      document.querySelectorAll('[tab-target]').forEach((tabButton) => {
        if (tabButton.getAttribute('tab-target') === tabTarget) {
          tabButton.classList.add('active');
        } else {
          tabButton.classList.remove('active');
        }
      });

      let contentSelector;

      const buttonsGroup = event.currentTarget.closest('.tabs-buttons');
      if (buttonsGroup) {
        contentSelector = buttonsGroup.getAttribute('tabs-content-target');
      } else {
        contentSelector = event.currentTarget.getAttribute('tabs-content-target');
      }

      if (contentSelector && contentSelector.length > 0) {
        contentSelector = `${contentSelector} ${tabTarget}`;
      } else {
        contentSelector = tabTarget;
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
