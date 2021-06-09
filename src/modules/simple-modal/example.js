/* eslint-disable */

require('think-front-bootstrap/src/modules/share')

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('share-url-copied', () => {
    if (window.thinkSimpleModal) {
      window.thinkSimpleModal.close(document.getElementById('share-modal'))
    }
  })
});
