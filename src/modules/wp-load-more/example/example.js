/* eslint-disable */

import ThinkLoadMore from 'think-front-bootstrap/src/modules/wp-load-more';

document.addEventListener('DOMContentLoaded', () => {
  const loadMore = document.querySelector('.load-more-box');
  if (loadMore) {
    const thinkLoadMore = new ThinkLoadMore({
      classPrefix: 'load-more-box',
      ajaxAction: loadMore.getAttribute('data-tlmore-action'),
      filterResponseData: (data) => {
        if (data.items && data.items.length > 0) {
          data.items = data.items.replaceAll('data-src', 'src');
        }

        return data;
      },
      findParamsBeforeLoad: () => {
        const searchForm = document.getElementById('search-form');

        const data = {};

        const searchTextEl = searchForm.querySelector('[name="search"]');
        if (searchTextEl && searchTextEl.value && searchTextEl.value.length > 0) {
          data.search = searchTextEl.value;
        }

        const locations = [];
        searchForm.querySelectorAll('[name="locations[]"]:checked')
          .forEach((el) => {
            locations.push(el.value);
          });
        if (locations.length > 0) {
          data.locations = locations;
        }

        const services = [];
        searchForm.querySelectorAll('[name="services[]"]:checked')
          .forEach((el) => {
            services.push(el.value);
          });
        if (services.length > 0) {
          data.services = services;
        }

        return data;
      },
    });

    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (thinkLoadMore && !thinkLoadMore.isLoading()) {
          thinkLoadMore.loadMore({ paged: 1 });
        }
        if (thinkSimpleModal) {
          thinkSimpleModal.close(document.getElementById('our-people-search-filter'));
        }
      });

      document.querySelectorAll('.our-people-search-filter__clear')
        .forEach((trigger) => {
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            searchForm.reset();
            thinkLoadMore.loadMore({ paged: 1 });
          });
        });
    }
  }
});
