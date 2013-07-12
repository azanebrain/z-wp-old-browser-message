<?php
/*
Plugin Name: Zane WordPress Old Browser Message
Plugin URI: http://github.com/AJZane/z-wp-old-browser-message
Description: Informs users that they are using an old browser
Author: AJ Zane
Version: 0.0
Author URI: http://AJZane.com
*/

class ZWP_Old_Browser_Message {

	public function __construct() {
		// echo "constructing ... <Br>";
		add_action( 'wp_enqueue_scripts', array( $this, 'scripts/zwp_old_brwsr_msg_register_scripts' ) );
		$this->test_func();
	}//construct

	public function zwp_old_brwsr_msg_register_scripts(){
		// echo "adding plugin scripts<br>";
		// echo ' <div id="dialog-modal" title="Basic modal dialog"><p>Adding the modal overlay screen makes the dialog look more prominent because it dims out the page content.</p></div>';
		//Quick reference: wp_register_script ( $handle, $src, $deps, $ver, $in_footer ) 
		wp_enqueue_style('jquery-ui', 'http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css'); 
		wp_enqueue_script('zwp_old_brwsr_msg', WP_PLUGIN_URL . '/z-wp-old-browser-message/zwp-old-browser-message.js', array( 'jquery-ui-dialog' ), true, false); 
	}//register_scripts

	private function test_func(){
		// echo "my test: ".dirname(__FILE__)."<br>";
		// echo "my test: ".WP_PLUGIN_URL ."<br>";
	}

}//class

$zwp_old_browser_message = new ZWP_Old_Browser_Message();