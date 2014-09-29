<?php
/**
 * Function inside admin dashboard page
 *
 * @package WP_Dummy_Generator/Classes
 * @since 0.1.0
 */
class WP_Dummy_Admin {

  function __construct() {

    // Enqueue CSS and Javascript
    if( $this->is_in_post_page() ) {
      add_action( 'admin_enqueue_scripts', array( $this, 'admin_styles' ) );
      add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
    }

  }

  /**
   * Print Style on admin footer
   *
   * @return void
   */
  function admin_styles() {
    wp_enqueue_style( 'wp_dummy_generator', WP_DUMMY_URL . 'css/wp-dummy-generator.css', array(), WP_DUMMY_VERSION );
  }

  /**
   * Print Scripts
   *
   * @return void
   */
  function admin_scripts() {
    wp_enqueue_script( 'wp_dummy_lipsum', WP_DUMMY_URL . 'js/lipsum-text-generator.js', array('jquery', 'backbone', 'underscore'), WP_DUMMY_VERSION, true );
    wp_enqueue_script( 'wp_dummy_generator', WP_DUMMY_URL . 'js/wp-dummy-generator.js', array('jquery', 'backbone', 'underscore'), WP_DUMMY_VERSION, true );
  }

  /**
   * Check is user on Edit or Post Submission Page
   *
   * @return Boolean
   */
  static function is_in_post_page() {
    return in_array( basename( $_SERVER['PHP_SELF'] ), array( 'post-new.php', 'page-new.php', 'post.php', 'page.php' ) );
  }
}

new WP_Dummy_Admin;
