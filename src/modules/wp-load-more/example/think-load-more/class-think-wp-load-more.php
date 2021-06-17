<?php

abstract class Think_WP_Load_More {

  /**
   * Internal WP_Query object.
   *
   * @var WP_Query|null
   */
  protected ?WP_Query $query = null;

  private static array $instances = [];

  /**
   * Current query args.
   *
   * @var array
   */
  protected array $args = [];

  /**
   * Get singleton instance
   *
   *
   * @return Think_WP_Load_More
   */
  public static function instance( ): Think_WP_Load_More {
    $cls = static::class;
    if ( ! isset( self::$instances[ $cls ] ) ) {
      self::$instances[ $cls ] = new static();
    }

    return self::$instances[ $cls ];
  }

  /**
   * Think_WP_Load_More constructor.
   */
  protected function __construct( ) {
    $this->initialiseAjax();
  }

  /**
   * Generate internal query. Used for delay initialisation.
   */
  protected function query() {
    $this->query = new WP_Query( array_merge( $this->defaultQueryParams(), $this->args ) );
  }

  /**
   * Get internal WP_Query object.
   *
   * @return WP_Query
   */
  public function getQuery(): WP_Query {
    if ( ! $this->query ) {
      $this->query();
    }

    return $this->query;
  }

  /**
   * Propagate method request to WP_Query
   *
   * @param $method
   * @param $parameters
   *
   * @return mixed
   */
  public function __call( $method, $parameters ) {
    return $this->getQuery()->{$method}( ...$parameters );
  }


  /**
   * Return html view with items list
   *
   * @return string
   */
  public function getItemsView(): string {
    $data = '';
    while ( $this->getQuery()->have_posts() ) {
      $this->getQuery()->the_post();
      $data .= $this->loadItem();
    }
    wp_reset_postdata();

    return $data;
  }

  /**
   * Get count off all posts accepts filtration.
   *
   * @return int
   */
  public function totalCount(): int {
    return $this->getQuery()->found_posts;
  }

  /**
   * Get count off total pages.
   *
   * @return int
   */
  public function totalPages(): int {
    return $this->getQuery()->max_num_pages;
  }

  /**
   * Current queried page.
   *
   * @return int
   */
  public function currentPage(): int {
    return (int) ( $this->getQuery()->get( 'paged', 1 ) ?: 1 );
  }

  /**
   * Check is has next page.
   *
   * @return int
   */
  public function hasNext(): int {
    return $this->currentPage() < $this->totalPages();
  }

  /**
   * Initialise wordpress ajax receivers.
   * Do not call it, it auto call in constructor.
   *
   * @param bool $nopriv
   * @param bool $priv
   *
   * @return $this
   */
  public function initialiseAjax( bool $nopriv = true, bool $priv = true ): self {
    if ( $priv ) {
      add_action( "wp_ajax_{$this->ajaxAction()}", [ $this, 'loadMore' ] );
    }
    if ( $nopriv ) {
      add_action( "wp_ajax_nopriv_{$this->ajaxAction()}", [ $this, 'loadMore' ] );
    }

    return $this;
  }

  /**
   * Get next page.
   *
   */
  public function loadMore() {
    $data = $this->loadResponseData();

    wp_send_json_success( array_merge($data, [
      'replaces'    => $this->getReplaces(),
    ]) );
  }

  /**
   * Generate response data.
   *
   * @return array
   */
  public function loadResponseData(): array {
    $this->args  = $this->regenerateArgs();
    $this->query = null;

    return  [
      'items'       => $this->getItemsView(),
      'currentPage' => $this->currentPage(),
      'totalCount'  => $this->totalCount(),
      'totalPages'  => $this->totalPages(),
      'hasNext'     => $this->hasNext(),
    ];
  }

  /**
   * Replaces list for html template
   *
   * key = selector
   * value = innerHtml
   *
   * @return array
   */
  public function getReplaces(): array {
    return [];
  }

  /**
   * Hook to set new arguments values.
   *
   * @return array
   */
  abstract public function regenerateArgs(): array;

  /**
   * Default query arguments like post_type, per_page....
   *
   * @return array
   */
  abstract public function defaultQueryParams(): array;

  /**
   * Single item template.
   *
   * @return string
   */
  abstract public function loadItem(): string;

  /**
   * Unique wordpress ajax action name.
   *
   * @return string
   */
  abstract public function ajaxAction(): string;
}
