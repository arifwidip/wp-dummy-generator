var WP_Dummy = WP_Dummy || {};

(function($){

  'use strict';

  WP_Dummy.WP_Dummy_Generator = {
    el: {},

    /**
     * Cache elements into variables
     */
    setupElements: function() {
      this.el.$preview = $('.lipsum-preview-box-inner');
      this.el.$sidebar = $('.lipsum-sidebar');
      this.el.$typeSelector = $('.lipsum-type-selector');
      this.el.$generateBlock = $('.lipsum-generate-block');
      this.el.$lipsumButton = $('.add-lipsum-dummy');
      this.el.$lipsumFooter = $('.lipsum-footer');
    },

    /**
     * Event Binding
     */
    eventBinding: function() {
      this.el.$generateBlock.on('click', '.button-generate', $.proxy( this.generateLipsum, this ));
      this.el.$lipsumButton.on('click', $.proxy( this.openModal, this ));

      this.el.$lipsumFooter.on('click', '.clear-preview', $.proxy( this.clearLipsumPreview, this ));
      this.el.$lipsumFooter.on('click', '.insert-content', $.proxy( this.insertLipsumContent, this ));
    },

    /**
     * Generate Lipsum depends on Type
     */
    generateLipsum: function(e) {
      e.preventDefault();
      
      // Check for selected type
      var type = this.el.$typeSelector.val();
      var output = this.generator[type].apply(this);

      this.el.$preview.append( output );
    },

    /**
     * Lipsum Generator
     */
    generator: {
      paragraph: function( numberOfParagraph, numberOfWords ) {
        var num = $('#num-of-paragraph').val(),
            numWords = $('#num-of-words').val(),
            output = '';

        if( numWords.indexOf('-') != -1 ) {
          var rangeNumWords = numWords.split('-');
        }

        for( var i = 0; i < num; i++ ) {

          // This is range number
          if( numWords.indexOf('-') != -1 ) {
            var generateWords = WP_Dummy.Lipsum_Generator.randint( parseInt(rangeNumWords[0], 10), parseInt(rangeNumWords[1], 10) );
          } else {
            var generateWords = numWords;
          }

          output += '<p>'+ WP_Dummy.Lipsum_Generator.generate(generateWords, false) +'</p>';
        }

        return output;
      },

      ul: function( numberOfParagraph, numberOfWords ) {
        var num = $('#num-of-paragraph').val(),
            numWords = $('#num-of-words').val(),
            output = '<ul>';

        if( numWords.indexOf('-') != -1 ) {
          var rangeNumWords = numWords.split('-');
        }

        for( var i = 0; i < num; i++ ) {

          // This is range number
          if( numWords.indexOf('-') != -1 ) {
            var generateWords = WP_Dummy.Lipsum_Generator.randint( parseInt(rangeNumWords[0], 10), parseInt(rangeNumWords[1], 10) );
          } else {
            var generateWords = numWords;
          }

          output += '<li>'+ WP_Dummy.Lipsum_Generator.generate(generateWords, false) +'</li>';
        }

        output += '</ul>';

        return output;
      },

      ol: function( numberOfParagraph, numberOfWords ) {
        var num = $('#num-of-paragraph').val(),
            numWords = $('#num-of-words').val(),
            output = '<ol>';

        if( numWords.indexOf('-') != -1 ) {
          var rangeNumWords = numWords.split('-');
        }

        for( var i = 0; i < num; i++ ) {

          // This is range number
          if( numWords.indexOf('-') != -1 ) {
            var generateWords = WP_Dummy.Lipsum_Generator.randint( parseInt(rangeNumWords[0], 10), parseInt(rangeNumWords[1], 10) );
          } else {
            var generateWords = numWords;
          }

          output += '<li>'+ WP_Dummy.Lipsum_Generator.generate(generateWords, false) +'</li>';
        }

        output += '</ol>';

        return output;
      },
    },

    /**
     * Open Lipsum Modal Box
     */
    openModal: function( e ) {
      e.preventDefault();

      var $link = $(e.currentTarget),
          title = $link.attr('title'),
          url = $link.attr('href');

      if( typeof tb_show != 'undefined' ) {
        tb_show( title, url, false );
      }
    },

    /**
     * Clear content inside Lipsum Preview
     */
    clearLipsumPreview: function( e ) {
      e.preventDefault();
      this.el.$preview.empty();
    },

    /**
     * Insert content inside Lipsum Preview into tiny mce editor
     */
    insertLipsumContent: function( e ) {
      e.preventDefault();

      var mce = typeof(tinymce) != 'undefined',
          content = this.el.$preview.html(),
          editor;

      if ( !wpActiveEditor ) {
        if ( mce && tinymce.activeEditor ) {
          editor = tinymce.activeEditor;
          wpActiveEditor = editor.id;
        }
      }

      else if ( mce ) {
        if ( tinymce.activeEditor && (tinymce.activeEditor.id == 'mce_fullscreen' || tinymce.activeEditor.id == 'wp_mce_fullscreen') ) {
          editor = tinymce.activeEditor;
        } else {
          editor = tinymce.get(wpActiveEditor);
        }
      }

      if ( editor && !editor.isHidden() ) {
        // restore caret position on IE
        if ( tinymce.isIE && editor.windowManager.insertimagebookmark )
          editor.selection.moveToBookmark(ed.windowManager.insertimagebookmark);
          
        editor.execCommand('mceInsertContent', false, content);
      }

      else {
        document.getElementById(wpActiveEditor).value += content;
      }

      tb_remove();
      this.el.$preview.empty();
    },

    /**
     * Initialization
     */
    init: function() {
      this.setupElements();
      this.eventBinding();
    }
  };

  WP_Dummy.WP_Dummy_Generator.init();

})(jQuery);