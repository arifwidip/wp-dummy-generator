<?php
/**
 * Class for handling "Lipsum" dummy generator
 *
 * @package WP_Dummy_Generator/Classes
 * @since  0.1.0
 */
class WP_Dummy_Lipsum {

  var $prefix;

  /**
   * Constructor
   */
  function __construct() {

    // Add button for opening "Lipsum" generator popup
    add_action( 'media_buttons', array( $this, 'media_button' ), 19 );

    // Render Lipsum Generator inside Thickbox
    add_action( 'admin_footer', array( $this, 'lipsum_popup' ) );

  }

  /**
   * Render button for opening "Lipsum" generato popup
   *
   * @return void
   */
  function media_button() {
    global $post;

    if( WP_Dummy_Admin::is_in_post_page() ) {
      $thickbox_url = '#TB_inline?width=753&height=578&inlineId=lipsum-generator';
      echo '<a href="'. $thickbox_url .'" class="button add-lipsum-dummy" id="add-lipsum-dummy" title="' . esc_attr__( 'Lipsum Generator', 'colabsthemes' ) . '" onclick="return false;">'. __('Lipsum Generator', 'colabsthemes') .'</a>';
    }
  }

  /**
   * Render Lipsum Generator inside Thickbox
   * 
   * @return void
   */
  function lipsum_popup() {
    if( WP_Dummy_Admin::is_in_post_page() ) {
      require_once( WP_DUMMY_DIR . '/includes/views/view-lipsum-generator.php' );
    }
  }

}

new WP_Dummy_Lipsum;