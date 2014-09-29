<?php
/**
 * View for rendering Lipsum Generator inside Thickbox
 *
 * @package WP_Dummy_Generator/Views
 * @since 0.1.0
 */
?>

<div id="lipsum-generator" style="display: none;">
  
  <div class="lipsum-generator-wrapper">
    <div class="lipsum-row">
      
      <div class="lipsum-preview-wrapper">
        <h3><?php _e('Preview', 'wp_dummy'); ?></h3>
        <div class="lipsum-preview-box">
          <div class="lipsum-preview-box-inner"></div>
        </div>
      </div>
      <!-- /.lipsum-preview -->

      <div class="lipsum-sidebar lipsum-generate-block">
        <div class="lipsum-sidebar-inner">
          <div class="form-field">
            <label for=""><?php _e('Type', 'wp_dummy'); ?></label>
            
            <?php
              $lipsum_type_list = array(
                'paragraph' => __('Paragraph', 'wp_dummy'),
                'ul' => __('Unordered List', 'wp_dummy'),
                'ol' => __('Ordered List', 'wp_dummy')
              );
              $lipsum_type_list = apply_filters( 'lipsum_type_list', $lipsum_type_list );
            ?>

            <select name="" id="" class="lipsum-type-selector">
              <?php foreach( $lipsum_type_list as $value => $label ) : ?>
                <option value="<?php echo $value;?>"><?php echo $label; ?></option>  
              <?php endforeach; ?>
            </select>
          </div>
    
          <div class="form-field">
            <label for="num-of-paragraph"><?php _e('Paragraph/List', 'wp_dummy'); ?></label>
            <input type="text" id="num-of-paragraph" name="num_of_paragraph">
            <p class="description"><?php _e('Enter number of paragraph/list to generate', 'wp_dummy'); ?></p>
          </div>

          <div class="form-field">
            <label for="num-of-words"><?php _e('Words', 'wp_dummy'); ?></label>
            <input type="text" id="num-of-words" name="num_of_words">
            <p class="description"><?php _e('Enter number of words to generate for each paragraph/list. You can use single number like "10" or use range "10-30"(Omit the double quotes symbol and no spaces between number and dash).', 'wp_dummy'); ?></p>
          </div>
          
          <div class="form-field">
            <a href="#"  class="button button-generate"><?php _e('Generate', 'wp_dummy'); ?></a>
          </div>
        </div><!-- .lipsum-sidebar-inner -->
      </div>
      <!-- /.lipsum-sidebar -->

      <div class="lipsum-footer">
        <a href="#" class="button clear-preview"><?php _e('Clear', 'wp_dummy'); ?></a>
        <a href="#" class="button button-primary insert-content"><?php _e('Insert into Content', 'wp_dummy'); ?></a>
      </div>

    </div>
  </div>
  <!-- /.lipsum-generator-wrapper -->

</div>
<!-- /#lipsum-generator -->