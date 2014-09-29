<?php
/**
 * Plugin Name: WordPress Dummy Generator
 * Plugin URI: http://colorlabsproject.com/
 * Description: Generate Lipsum content easily. Search and download photo from Flickr for use inside the content. 
 * Version: 0.1.0
 * Author: Arif Widipratomo
 * Author URI: http://colorlabsproject.com/
 * License: GPLv2 or later
 * 
 * @package WP_Dummy_Generator
 * @author Arif Widipratomo
*/

// Define contants
if ( !defined( 'WP_DUMMY_DIR' ) )
  define( 'WP_DUMMY_DIR', plugin_dir_path( __FILE__ ) );

if ( !defined( 'WP_DUMMY_URL' ) )
  define( 'WP_DUMMY_URL', plugin_dir_url( __FILE__ ) );

if ( !defined( 'WP_DUMMY_VERSION' ) )
  define( 'WP_DUMMY_VERSION', '0.1.0' );

/**
 * Main WP_Dummy_Generator class
 *
 * @version  0.1.0
 */
class WP_Dummy_Generator {

  var $prefix;

  function __construct() {
    $this->prefix = 'wp_dummy_';

    $this->include_files();
  }

  /**
   * Include other files
   *
   * @return void
   */
  function include_files() {
    require_once( 'includes/classes/class-admin.php' );
    require_once( 'includes/classes/class-lipsum-generator.php' );
  }

}

new WP_Dummy_Generator;