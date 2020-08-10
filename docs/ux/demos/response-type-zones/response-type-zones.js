(function() {
  var ZonesController,
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

  ZonesController = (function() {
    function ZonesController() {
      var background, border, e, i, j, k, l, len, len0, len1, len2, len3, len4, len5, m, multiFn, n, option, p, ref, ref0, ref1, ref2, ref3, ref4, ref5, singleFn, svg;

      ref0 = $('.response-area-zones');
      for (i = 0, len0 = ref0.length; i < len0; i++) {
        option = ref0[i];
        fn = function(e) {
          return function() {
            var target = e.find('a');
            target.removeClass('zones-selected');
            if (typeof deAnswerItem == 'function') {
              return deAnswerItem(target);
            } else {
              console.warn('Missing tabs.js.');
            }
          };
        };
        $(option).find('.btn-clear-answer').click(fn($(option)));
      }

      ref = $('svg.zones-mask');
      for (j = 0, len = ref.length; j < len; j++) {
        svg = ref[j];
        ref1 = $(svg).find('.zones-mask-border');
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          e = ref1[k];
          border = $(e);
          background = border.prev();
          border.data('background', background);
        }
      }
      multiFn = (function(_this) {
        return function(border) {
          return function() {
            var classes, minSelect, numSelected;

            border.toggleClass('zones-selected');
            numSelected = border.parent().find('a.zones-selected').length;
            minSelect = parseInt(border.parents('.response-area-zones').data('minSelect'));
            classes = border.attr('class').split(/\s+/);
            if (typeof answerItem == 'function') {
              if (minSelect == numSelected || Number.isNaN(minSelect)) {
                answerItem(border);
              }
              if (numSelected < minSelect) {
                deAnswerItem(border);
              }
            } else {
              console.warn('Missing tabs.js.');
            }
          };
        };
      })(this);
      singleFn = (function(_this) {
        return function(border) {
          return function() {
            var l, len2, o, ref2;
            ref2 = border.parents('.zones-mask').find('a');
            ref2.removeClass('zones-selected');
            border.addClass('zones-selected');
            if (typeof answerItem == 'function') {
              return answerItem(ref2);
            } else {
              console.warn('Missing tabs.js.');
            }
          };
        };
      })(this);
      ref2 = $('.response-area-zones.zones-multiple-select svg.zones-mask');
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        svg = ref2[l];
        ref3 = $(svg).find('a');
        for (m = 0, len3 = ref3.length; m < len3; m++) {
          border = ref3[m];
          $(border).click(multiFn($(border)));
        }
      }
      ref4 = $('.response-area-zones.zones-single-select svg.zones-mask');
      for (n = 0, len4 = ref4.length; n < len4; n++) {
        svg = ref4[n];
        ref5 = $(svg).find('a');
        for (p = 0, len5 = ref5.length; p < len5; p++) {
          border = ref5[p];
          $(border).click(singleFn($(border)));
        }
      }
    }

    return ZonesController;

  })();

  $(function() {
    return window.zonesController = new ZonesController();
  });

}).call(this);

//Keyboard navigation handler
$('.response-area-zones svg.zones-mask a').keypress(function(e) {
  switch (e.which) {
    case 13: //Enter
    case 32: //Space
      e.preventDefault();
      $(this).trigger('click');
      break;
  }
});
