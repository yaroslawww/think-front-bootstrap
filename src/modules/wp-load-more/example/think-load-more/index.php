<?php
require __DIR__ . '/class-think-wp-load-more.php';

/**
 * Add ajax meta to use wp
 */
add_action( 'wp_head', function () {
	echo '<meta name="wp-ajax-url" content="' . admin_url( 'admin-ajax.php' ) . '" />';
} );
