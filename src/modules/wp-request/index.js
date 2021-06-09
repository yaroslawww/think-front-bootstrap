/*
* add_action( 'wp_head', function () {
* echo '<meta name="wp-ajax-url" content="' . admin_url( 'admin-ajax.php' ) . '" />';
* } );
*/
/*
* Required packages:
* yarn add axios qs
*/

/* eslint-disable import/no-unresolved */
import Qs from 'qs';
/* eslint-disable import/no-unresolved */
import axios from 'axios';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

class WpRequest {
  constructor() {
    const ajaxUrlMeta = document.head.querySelector('[name~=wp-ajax-url][content]');
    if (!ajaxUrlMeta || !ajaxUrlMeta.content) {
      /* eslint-disable no-console */
      console.error('Please specify meta wp-ajax-url');
    } else {
      this.ajaxUrl = ajaxUrlMeta.content;
    }
  }

  ajaxPost(data, config) {
    return axios.post(this.ajaxUrl, Qs.stringify(data), config);
  }
}

const wpRequest = new WpRequest();

export {
  wpRequest as default,
  WpRequest,
};
