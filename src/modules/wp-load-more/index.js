import wpRequest from '../wp-request';

class ThinkLoadMore {
  constructor(params = {}) {
    this.params = params;

    this.classPrefix = this.params.classPrefix || 'load-more-box';
    this.ajaxAction = this.params.ajaxAction || 'load_more';

    this.boxEl = document.querySelector(`.${this.classPrefix}`);
    this.listEl = document.querySelector(`.${this.classPrefix}__list`);
    if (!this.boxEl || !this.listEl) {
      return;
    }

    this.bindTriggers();
  }

  bindTriggers() {
    document.querySelectorAll(`.${this.classPrefix}__trigger`)
      .forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          this.loadMore();
        });
      });
  }

  hideTriggers() {
    this.boxEl.classList.add(`${this.classPrefix}--all-showed`);
    if (this.params.onHideTriggers) {
      this.params.onHideTriggers(this.boxEl, document.querySelectorAll(`.${this.classPrefix}__trigger`));
    }
  }

  showTriggers() {
    this.boxEl.classList.remove(`${this.classPrefix}--all-showed`);
    if (this.params.onShowTriggers) {
      this.params.onShowTriggers(this.boxEl, document.querySelectorAll(`.${this.classPrefix}__trigger`));
    }
  }

  isLoading() {
    return this.boxEl.classList.contains(`${this.classPrefix}--loading`);
  }

  loadMore(hardParams = {}) {
    let params = {};
    if (this.params.findParamsBeforeLoad) {
      params = this.params.findParamsBeforeLoad(this);
    }
    if (!params) {
      params = {};
    }

    let paged = parseInt(this.boxEl.getAttribute('data-tlmore-page'), 10);
    paged = Number.isNaN(paged) ? 1 : paged;

    let searchData = {
      action: this.ajaxAction,
      class_prefix: this.classPrefix,
      paged: paged + 1,
    };

    if (typeof params === 'object') {
      searchData = Object.assign(searchData, params);
    }

    if (typeof hardParams === 'object') {
      searchData = Object.assign(searchData, hardParams);
    }

    this.boxEl.classList.add(`${this.classPrefix}--loading`);
    wpRequest.ajaxPost(searchData)
      .then((response) => {
        if (response.data && response.data.success
                    && response.data.data
        ) {
          let { data } = response.data;
          if (this.params.filterResponseData) {
            data = this.params.filterResponseData(data);
          }
          if (data.currentPage) {
            this.boxEl.setAttribute('data-tlmore-page', data.currentPage);
          }

          if (Object.prototype.hasOwnProperty.call(data, 'items')) {
            if (data.items.length <= 0) {
              this.listEl.innerHTML = '';
            } else if (data.currentPage && data.currentPage <= paged) {
              this.listEl.innerHTML = data.items;
            } else {
              this.listEl.innerHTML += data.items;
            }
          }

          if (Object.prototype.hasOwnProperty.call(data, 'replaces') && data.replaces) {
            Object.keys(data.replaces).forEach((selector) => {
              document.querySelectorAll(selector)
                .forEach((el) => {
                  /* eslint-disable no-param-reassign */
                  el.innerHTML = data.replaces[selector];
                });
            });
          }

          if (data.hasNext) {
            this.showTriggers();
          } else {
            this.hideTriggers();
          }

          if (this.params.onRequestThenSuccess) {
            this.params.onRequestThenSuccess(response.data);
          }
          return;
        }

        if (this.params.onRequestThenError) {
          this.params.onRequestThenError(response.data);
        }
      })
      .catch((error) => {
        if (this.params.onRequestCatch) {
          this.params.onRequestCatch(error);
        }
      })
      .finally(() => {
        this.boxEl.classList.remove(`${this.classPrefix}--loading`);
        if (this.params.onRequestFinally) {
          this.params.onRequestFinally();
        }
      });
  }
}

export {
  ThinkLoadMore as default,
};
