/**
 * Lorem Ipsum Text Generator based on Code from Emmet Sublime Text Plugin
 *
 */

var WP_Dummy = WP_Dummy || {};

(function($){

  'use strict';

  WP_Dummy.Lipsum_Generator = {

    /**
     * A bunch of lorem ipsum words
     * 
     */
    langs: {
      en: {
        common: ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipisicing', 'elit'],
        words: ['exercitationem', 'perferendis', 'perspiciatis', 'laborum', 'eveniet',
          'sunt', 'iure', 'nam', 'nobis', 'eum', 'cum', 'officiis', 'excepturi',
          'odio', 'consectetur', 'quasi', 'aut', 'quisquam', 'vel', 'eligendi',
          'itaque', 'non', 'odit', 'tempore', 'quaerat', 'dignissimos',
          'facilis', 'neque', 'nihil', 'expedita', 'vitae', 'vero', 'ipsum',
          'nisi', 'animi', 'cumque', 'pariatur', 'velit', 'modi', 'natus',
          'iusto', 'eaque', 'sequi', 'illo', 'sed', 'ex', 'et', 'voluptatibus',
          'tempora', 'veritatis', 'ratione', 'assumenda', 'incidunt', 'nostrum',
          'placeat', 'aliquid', 'fuga', 'provident', 'praesentium', 'rem',
          'necessitatibus', 'suscipit', 'adipisci', 'quidem', 'possimus',
          'voluptas', 'debitis', 'sint', 'accusantium', 'unde', 'sapiente',
          'voluptate', 'qui', 'aspernatur', 'laudantium', 'soluta', 'amet',
          'quo', 'aliquam', 'saepe', 'culpa', 'libero', 'ipsa', 'dicta',
          'reiciendis', 'nesciunt', 'doloribus', 'autem', 'impedit', 'minima',
          'maiores', 'repudiandae', 'ipsam', 'obcaecati', 'ullam', 'enim',
          'totam', 'delectus', 'ducimus', 'quis', 'voluptates', 'dolores',
          'molestiae', 'harum', 'dolorem', 'quia', 'voluptatem', 'molestias',
          'magni', 'distinctio', 'omnis', 'illum', 'dolorum', 'voluptatum', 'ea',
          'quas', 'quam', 'corporis', 'quae', 'blanditiis', 'atque', 'deserunt',
          'laboriosam', 'earum', 'consequuntur', 'hic', 'cupiditate',
          'quibusdam', 'accusamus', 'ut', 'rerum', 'error', 'minus', 'eius',
          'ab', 'ad', 'nemo', 'fugit', 'officia', 'at', 'in', 'id', 'quos',
          'reprehenderit', 'numquam', 'iste', 'fugiat', 'sit', 'inventore',
          'beatae', 'repellendus', 'magnam', 'recusandae', 'quod', 'explicabo',
          'doloremque', 'aperiam', 'consequatur', 'asperiores', 'commodi',
          'optio', 'dolor', 'labore', 'temporibus', 'repellat', 'veniam',
          'architecto', 'est', 'esse', 'mollitia', 'nulla', 'a', 'similique',
          'eos', 'alias', 'dolore', 'tenetur', 'deleniti', 'porro', 'facere',
          'maxime', 'corrupti']
      }
    },

    /**
     * Returns random integer between 'from' and 'to' values
     * @param Integer from
     * @param Integer to
     * @returns Integer
     */
    randint: function( from, to ) {
      return Math.round(Math.random() * (to - from) + from);
    },

    /**
     * @param {Array} arr
     * @param {Number} count
     * @returns {Array}
     */
    sample: function( arr, count ) {
      var len = arr.length;
      var iterations = Math.min(len, count);
      var result = [];
      while (result.length < iterations) {
        var randIx = this.randint(0, len - 1);
        if (!_.include(result, randIx))
          result.push(randIx);
      }
      
      return _.map(result, function(ix) {
        return arr[ix];
      });
    },

    /**
     * Choose one character from collection of character
     * 
     * @param Mixed val Collection of character, you can use array or string
     * @return String
     */
    choice: function( val ) {
      if (_.isString(val))
        return val.charAt(this.randint(0, val.length - 1));
      
      return val[this.randint(0, val.length - 1)];
    },

    /**
     * Generate Sentence.
     * 
     * @param  Array words Sentence to generate
     * @param  String end  Mark on each sentence
     * @return String
     */
    sentence: function( words, end ) {
      // Capitalize String
      if (words.length) {
        words[0] = words[0].charAt(0).toUpperCase() + words[0].substring(1);
      }
      
      return words.join(' ') + (end || this.choice('?!...')); // more dots than question marks
    },

    /**
     * Insert commas at randomly selected words. This function modifies values
     * inside 'words' array 
     * 
     * @param Array words
     */
    insertCommas: function( words ) {
      var len = words.length;
      var totalCommas = 0;
      var _self = this;
      
      if (len > 3 && len <= 6) {
        totalCommas = this.randint(0, 1);
      } else if (len > 6 && len <= 12) {
        totalCommas = this.randint(0, 2);
      } else {
        totalCommas = this.randint(1, 4);
      }

      if (!totalCommas) {
        return;
      }

      _.each(_.range(totalCommas), function(ix) {
        if (words.length < 2) {
          return;
        }

        var pos = _self.randint(0, words.length - 2);
        var word = words[pos];
        if (word.charAt(word.length - 1) !== ',') {
          words[pos] += ',';
        }
      });
    },

    /**
     * Generate "Lorem ipsum" text
     * 
     * @param Integer wordCount Words count in paragraph
     * @param Boolean startWithCommon Should paragraph start with common "lorem ipsum" sentence.
     * @returns String
     */
    generate: function( wordCount, startWithCommon) {
      var data = this.langs.en;
      if (!data) {
        return '';
      }

      var result = [];
      var totalWords = 0;
      var words;
      
      wordCount = parseInt(wordCount, 10);
      
      if (startWithCommon && data.common) {
        words = data.common.slice(0, wordCount);
        if (words.length > 5) {
          words[4] += ',';
        }
        totalWords += words.length;
        result.push( this.sentence(words, '.'));
      }
      
      while (totalWords < wordCount) {
        words = this.sample(data.words, Math.min(this.randint(2, 30), wordCount - totalWords));
        totalWords += words.length;
        this.insertCommas(words);
        result.push(this.sentence(words));
      }
      
      return result.join(' ');
    }

  };

})(jQuery);