<?php

abstract class Think_WP_Load_More_Group {

  private static array $instances = [];

  /**
   * Current query args.
   *
   * @var array
   */
  protected array $args = [];

  /**
   * Groups list.
   *
   * @var array
   */
  protected array $groups;

  public static function instance(): Think_WP_Load_More_Group {
    $cls = static::class;
    if ( ! isset( self::$instances[ $cls ] ) ) {
      self::$instances[ $cls ] = new static();
    }

    return self::$instances[ $cls ];
  }

  /**
   * Think_WP_Load_More_Group constructor.
   */
  protected function __construct() {
    $this->initialiseAjax();
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
    wp_send_json_success( [
      'groups'   => $this->getGroupsResponse(),
      'replaces' => $this->getReplaces(),
    ] );
  }

  /**
   * @return array
   */
  public function groups(): array {
    return $this->groups;
  }

  /**
   * @return array
   */
  public function groupsKeys(): array {
    return array_keys( $this->groups );
  }

  /**
   * @param string $key
   *
   * @return Think_WP_Load_More|null
   */
  public function group( string $key ): ?Think_WP_Load_More {
    return $this->groups[ $key ] ?? null;
  }

  /**
   * Get groups data
   *
   * @return array
   */
  public function getGroupsResponse(): array {
    return [];
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
   * Unique wordpress ajax action name.
   *
   * @return string
   */
  abstract public function ajaxAction(): string;

}
