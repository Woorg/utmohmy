(function() {
  var FORM, RESULT_URL, SPANS, SUBCAT_, build_url, spaces_to_hyphens;

  FORM = {
    input_orig_url: document.querySelector('#input-orig-url'),
    input_source: document.querySelector('#input-source'),
    input_channel: document.querySelector('#input-channel'),
    input_targeting: document.querySelector('#input-targeting'),
    input_category: document.querySelector('#input-category'),
    input_subcategory: document.querySelector('#input-subcategory')
  };

  SPANS = {
    input_orig_url: 'span-orig-url',
    input_source: 'span-source',
    input_channel: 'span-channel',
    input_targeting: 'span-targeting',
    input_category: 'span-category',
    input_subcategory: 'span-subcategory'
  };

  RESULT_URL = document.querySelector('#result-url');

  SUBCAT_ = '_';

  window.onload = function() {
    var input, input_name;
    FORM.input_orig_url.value = 'https://ohmystats.com';
    FORM.input_source.value = 'ohmyblog';
    FORM.input_channel.value = 'blog';
    FORM.input_targeting.value = '00';
    FORM.input_category.value = 'marketing';
    FORM.input_subcategory.value = 'utm-tags';
    build_url();
    for (input_name in FORM) {
      input = FORM[input_name];
      input.addEventListener('input', function() {
        var _ref;
        if ((_ref = this.value) === null || _ref === '') {
          if (this.id !== 'input-subcategory') {
            this.classList.add('invalid');
          } else {
            SUBCAT_ = '';
          }
        } else {
          if (this.id !== 'input-subcategory') {
            this.classList.remove('invalid');
          } else {
            SUBCAT_ = '_';
          }
        }
        return build_url();
      });
      input.addEventListener('focus', function() {
        var span_id;
        span_id = "#" + (this.id.replace(/input-/, 'span-'));
        document.querySelector(span_id).classList.add('highlighted');
        return this.focused = true;
      }, false);
      input.addEventListener('blur', function() {
        var span_id;
        span_id = "#" + (this.id.replace(/input-/, 'span-'));
        document.querySelector(span_id).classList.remove('highlighted');
        return this.focused = false;
      }, false);
    }
    return RESULT_URL.addEventListener('click', function() {
      var range;
      if (document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(this.id));
        return range.select();
      } else if (window.getSelection) {
        range = document.createRange();
        range.selectNode(document.getElementById(this.id));
        return window.getSelection().addRange(range);
      }
    }, false);
  };

  build_url = function() {
    var classes, input, input_name;
    classes = {
      input_orig_url: '',
      input_source: '',
      input_channel: '',
      input_targeting: '',
      input_category: '',
      input_subcategory: ''
    };
    for (input_name in FORM) {
      input = FORM[input_name];
      if (input.focused === true) {
        classes[input_name] = 'highlighted';
      } else {
        classes[input_name] = '';
      }
    }
    return RESULT_URL.innerHTML = "<span id=" + SPANS.input_orig_url + " class=" + classes.input_orig_url + ">" + (spaces_to_hyphens(FORM.input_orig_url.value)) + "</span>?utm_source=<span id=" + SPANS.input_source + " class=" + classes.input_source + ">" + (spaces_to_hyphens(FORM.input_source.value)) + "</span>&utm_medium=<span id=" + SPANS.input_channel + " class=" + classes.input_channel + ">" + (spaces_to_hyphens(FORM.input_channel.value)) + "</span>&utm_campaign=<span id=" + SPANS.input_targeting + " class=" + classes.input_targeting + ">" + (spaces_to_hyphens(FORM.input_targeting.value)) + "</span>_<span id=" + SPANS.input_category + " class=" + classes.input_category + ">" + (spaces_to_hyphens(FORM.input_category.value)) + "</span>" + SUBCAT_ + "<span id=" + SPANS.input_subcategory + " class=" + classes.input_subcategory + ">" + (spaces_to_hyphens(FORM.input_subcategory.value)) + "</span>";
  };

  spaces_to_hyphens = function(str) {
    return str.replace(/\s+/g, '-');
  };

}).call(this);
