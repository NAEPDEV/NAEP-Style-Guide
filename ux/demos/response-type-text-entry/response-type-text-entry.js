(function() {
  var TextEntryController,
    bind = function(fn, me) {
      return function() {
        return fn.apply(me, arguments);
      };
    },
    indexOf = [].indexOf || function(item) {
      for (var i = 0, l = this.length; i < l; i++) {
        if (i in this && this[i] === item) return i;
      }
      return -1;
    };

  TextEntryController = (function() {
    function TextEntryController() {
      var charCount, currentVal, e, empty, f, fn, j, k, l, len, len1, len2, len3, len4, len5, len6, len7, m, maxLength, maxValue, minValue, n, o, p, q, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, textarea, textarea1, textarea2, textarea3, textSet, textSet1, textSet2, textSet3, value;
      ref = $('.response-area-text-entry');
      for (j = 0, len = ref.length; j < len; j++) {
        textSet = ref[j];
        ref1 = $(textSet).find('input[type=text], textarea');
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          textarea = ref1[k];
          fn = function(e) {
            return function(f) {
              empty = e.parents('.response-area-text-entry').find('input[type=text], textarea').filter(function() {
                return !$.trim(this.value);
              });
              if (typeof deAnswerItem == 'function') {
                if (empty.length) {
                  deAnswerItem(e);
                } else {
                  answerItem(e);
                }
              } else {
                console.warn('Missing tabs.js.');
              }
            };
          };
          $(textarea).on('keyup', fn($(textarea)));
        }
      }

      ref2 = $('.response-area-text-entry');;
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        textSet1 = ref2[l];
        ref3 = $(textSet1).find('.numeric-entry');
        for (m = 0, len3 = ref3.length; m < len3; m++) {
          textarea1 = ref3[m];
          fn = function(e) {
            return function(f) {
              maxValue = parseInt(e.data('maxValue'));
              minValue = parseInt(e.data('minValue'));
              maxLength = parseInt(e.data('maxLength'));
              charCount = e.val().length;
              if (f.which < 48 || f.which > 57) {
                e.addClass('dialog-originator no-change');
                if (typeof openDialog == 'function') {
                  openDialog("validation", $(this), minValue, maxValue, maxLength);
                } else {
                  console.warn('Missing dialogs.js.');
                }
                e.removeClass('no-change');
                return;
              }
            };
          };
        }
        $(textarea1).on('keypress', fn($(textarea1)));
      }

      ref4 = $('.response-area-text-entry');;
      for (n = 0, len4 = ref4.length; n < len4; n++) {
        textSet2 = ref4[n];
        ref5 = $(textSet2).find('.numeric-entry');
        for (o = 0, len5 = ref5.length; o < len5; o++) {
          textarea2 = ref5[o];
          fn = function(e) {
            return function() {
              value = this.value;
              maxValue = parseInt(e.data('maxValue'));
              minValue = parseInt(e.data('minValue'));
              if (!value.length || e.hasClass('no-change')) {
                return;
              }
              if (value > maxValue || value < minValue) {
                e.val("");
                e.addClass('dialog-originator');
                if (typeof openDialog == 'function') {
                  openDialog("validation", $(this), minValue, maxValue);
                } else {
                  console.warn('Missing dialogs.js.');
                }
                if (typeof deAnswerItem == 'function') {
                  return deAnswerItem(e);
                } else {
                  console.warn('Missing tabs.js.');
                }
                return;
              }
            };
          };
        }
        $(textarea2).on('blur', fn($(textarea2)));
      }

      ref6 = $('.response-area-text-entry');
      for (p = 0, len6 = ref6.length; p < len6; p++) {
        textSet3 = ref6[p];
        ref7 = $(textSet3).find('input[type=text], textarea');
        for (q = 0, len7 = ref7.length; q < len7; q++) {
          textarea3 = ref7[q];
          fn = function(e) {
            return function() {
              maxLength = parseInt(e.data('maxLength'));
              charCount = e.val().length;
              if (charCount > maxLength) {
                e.addClass('dialog-originator');
                e.val(e.val().substring(0, maxLength));
                if (typeof openDialog == 'function') {
                  openDialog("validation", $(this), minValue, maxValue, maxLength);
                } else {
                  console.warn('Missing dialogs.js.');
                }
                return;
              }
            };
          };
        }
        $(textarea3).on('input', fn($(textarea3)));
      }
    }

    return TextEntryController;

  })();

  $(function() {
    return window.TextEntryController = new TextEntryController();
  });

}).call(this);
