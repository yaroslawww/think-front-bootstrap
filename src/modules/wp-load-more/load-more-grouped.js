import wpRequest from '../wp-request';

class ThinkLoadMoreGrouped {
  constructor(params = {}) {
    this.params = params;

    this.classPrefix = this.params.classPrefix || 'load-more-grouped';
    this.ajaxAction = this.params.ajaxAction || 'load_more_grouped';

    this.boxEl = document.querySelector(`.${this.classPrefix}`);
    if (!this.boxEl) {
      return;
    }

    this.bindTriggers();
  }

  bindTriggers() {
    document.querySelectorAll(`.${this.classPrefix}__trigger`)
      .forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
          e.preventDefault();

          const params = {};
          const targetList = trigger.getAttribute('data-target-group');
          if (targetList) {
            params.target_group = targetList;
          }
          this.loadMore(params);
        });
      });
  }

  hideTriggers(groupKey) {
    if (groupKey) {
      document.querySelectorAll(`.${this.classPrefix}__group--${groupKey}`)
        .forEach((el) => {
          el.classList.add(`${this.classPrefix}--all-showed`);
        });
    }
    if (this.params.onHideTriggers) {
      this.params.onHideTriggers(groupKey, this);
    }
  }

  showTriggers(groupKey) {
    if (groupKey) {
      document.querySelectorAll(`.${this.classPrefix}__group--${groupKey}`)
        .forEach((el) => {
          el.classList.remove(`${this.classPrefix}--all-showed`);
        });
    }
    if (this.params.onShowTriggers) {
      this.params.onShowTriggers(groupKey, this);
    }
  }

  setStatusEmpty(groupKey) {
    this.getListEl(groupKey).innerHTML = '';
    this.getGroupBoxEl(groupKey).classList.add(`${this.classPrefix}--empty`);
    if (this.params.onSetStatusEmpty) {
      this.params.onSetStatusEmpty(groupKey, this);
    }
  }

  setStatusNotEmpty(groupKey) {
    this.getGroupBoxEl(groupKey).classList.remove(`${this.classPrefix}--empty`);
    if (this.params.onSetStatusNotEmpty) {
      this.params.onSetStatusNotEmpty(groupKey, this);
    }
  }

  getListEl(groupKey) {
    let el = document.querySelector(`.${this.classPrefix}__group--${groupKey} .${this.classPrefix}__list`);
    if (this.params.filterListEl) {
      el = this.params.filterListEl(groupKey, el, this);
    }
    return el;
  }

  getGroupBoxEl(groupKey) {
    let el = document.querySelector(`.${this.classPrefix}__group--${groupKey}`);
    if (this.params.filterGroupBoxEl) {
      el = this.params.filterGroupBoxEl(groupKey, el, this);
    }
    return el;
  }

  loadMore(hardParams = {}) {
    let targetGroupKey = null;
    if (typeof hardParams === 'object' && Object.prototype.hasOwnProperty.call(hardParams, 'target_group')) {
      targetGroupKey = hardParams.target_group;
    }

    let params = {};
    if (this.params.findParamsBeforeLoad) {
      params = this.params.findParamsBeforeLoad(targetGroupKey, this);
    }
    if (!params) {
      params = {};
    }

    let paged = parseInt(this.boxEl.getAttribute((targetGroupKey) ? `data-tlmore-${targetGroupKey}-page` : 'data-tlmore-page'), 10);
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

          if (Object.prototype.hasOwnProperty.call(data, 'replaces') && data.replaces) {
            Object.keys(data.replaces).forEach((selector) => {
              document.querySelectorAll(selector)
                .forEach((el) => {
                  /* eslint-disable no-param-reassign */
                  el.innerHTML = data.replaces[selector];
                });
            });
          }

          if (Object.prototype.hasOwnProperty.call(data, 'groups')) {
            Object.keys(data.groups).forEach((groupKey) => {
              const group = data.groups[groupKey];
              if (Object.prototype.hasOwnProperty.call(group, 'currentPage')) {
                this.boxEl.setAttribute(`data-tlmore-${groupKey}-page`, group.currentPage);
              }
              if (Object.prototype.hasOwnProperty.call(group, 'totalCount')) {
                if (group.totalCount <= 0) {
                  this.setStatusEmpty(groupKey);
                } else {
                  this.setStatusNotEmpty(groupKey);
                }
              }

              if (Object.prototype.hasOwnProperty.call(group, 'items') && group.items.length > 0) {
                if (group.currentPage && group.currentPage <= paged) {
                  this.getListEl(groupKey).innerHTML = group.items;
                } else {
                  this.getListEl(groupKey).innerHTML += group.items;
                }
              }

              if (Object.prototype.hasOwnProperty.call(group, 'hasNext') && group.hasNext) {
                this.showTriggers(groupKey);
              } else {
                this.hideTriggers(groupKey);
              }

              if (typeof this.params.onRequestThenSuccessGroup === 'function') {
                this.params.onRequestThenSuccessGroup(groupKey, group);
              }
            });
          }

          if (this.params.onRequestThenSuccess === 'function') {
            this.params.onRequestThenSuccess(response.data);
          }
          return;
        }

        if (this.params.onRequestThenError === 'function') {
          this.params.onRequestThenError(response.data);
        }
      })
      .catch((error) => {
        if (this.params.onRequestCatch === 'function') {
          this.params.onRequestCatch(error);
        }
      })
      .finally(() => {
        this.boxEl.classList.remove(`${this.classPrefix}--loading`);
        if (this.params.onRequestFinally === 'function') {
          this.params.onRequestFinally();
        }
      });
  }
}

export {
  ThinkLoadMoreGrouped as default,
};
