Example of child class 

```injectablephp
class Think_WP_Load_More_Example extends Think_WP_Load_More {

	public function ajaxAction(): string {
		return 'load_more_example';
	}

	public function defaultQueryParams(): array {
		return [
			'post_type'      => 'pt_example',
			'post_status'    => 'publish',
			'posts_per_page' => 1,
			'orderby'        => 'title',
			'order'          => 'ASC',
		];
	}

	public function loadItem(): string {
		ob_start();
		$example_data = [
			'title'     => get_the_title(),
			'link'      => get_the_permalink(),
			'thumbnail' => think_post_thumbnail_url( null, 'medium-thumb' ),
			'position'  => get_field( 'position' ),
			'service'   => get_field( 'related_service' ),
		];
		?>
        <div class="px-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-8">
			<?php get_template_part( 'template-parts/tiles/example', null, [ 'data' => $example_data ] ); ?>
        </div>
		<?php
		$var = ob_get_contents();
		ob_end_clean();

		return $var;
	}

	public function getReplaces(): array {
		return [
			'.load-more-box__total' => $this->totalCountString(),
		];
	}

	public function totalCountString(): string {
		return sprintf( _n( '%s result', '%s results', $this->totalCount(), 'my_wp' ), $this->totalCount() );
	}

	public function regenerateArgs(): array {
		$args = [];

		if ( ! empty( $paged = (int) ( $_REQUEST['paged'] ?? 1 ) ) ) {
			$args['paged'] = $paged;
		}
		if ( ! empty( $search = (string) ( $_REQUEST['search'] ?? '' ) ) ) {
			$args['s'] = $search;
		}

		return $args;
	}
}

Think_WP_Load_More_Example::instance();
```