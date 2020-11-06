//Initialize multiple-choice options
addUniqueID($('.response-area-mc'), "mc-");

$('.response-area-mc').each(function() {
  var target = $(this),
    inputs = target.find('input'),
    targetId;

  targetId = target.attr('id');
  addUniqueID(inputs, targetId + "-");
  inputs.attr('name', targetId);
});

(function() {
  var MCController,
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

  MCController = (function() {
    function MCController() {
      var ansFn, elim, fn, j, k, l, len, len1, len2, len3, len4, m, maxSelect, minSelect, n, numSelected, option, radioSet, ref, ref1, ref2, ref3, ref4;
      ref = $('.response-area-mc');
      for (j = 0, len = ref.length; j < len; j++) {
        option = ref[j];
        fn = function(e) {
          return function() {
            var target = e.find('.mc-option');
            target.removeClass('mc-selected');
            target.find('input').prop('checked', false);
            if (typeof deAnswerItem == 'function') {
              return deAnswerItem(target);
            } else {
              console.warn('Missing tabs.js.');
            }
          };
        };
        $(option).find('.btn-clear-answer').click(fn($(option)));
      }
      ref1 = $('.mc-option');
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        option = ref1[k];
        elim = $(option).find('.mc-eliminate-choice').first();
        fn = function(e) {
          return function(evt) {
            evt.stopPropagation();
            e.find('.mc-eliminate-choice').focus();
            e.toggleClass('mc-eliminated');
            if (e.hasClass('mc-eliminated')) {
              if (typeof deAnswerItem == 'function') {
                deAnswerItem(e);
              } else {
                console.warn('Missing tabs.js.');
              }
              e.find('input').prop('checked', false);
              return e.removeClass('mc-selected');
            }
          };
        };
        elim.parent().click(fn($(option)));
      }
      ref2 = $('.mc-multiple-select .mc-option');
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        option = ref2[l];
        fn = function(e) {
          return function() {
            if (e.hasClass('tts-active')) {
              return;
            }
            e.toggleClass('mc-selected');
            if (e.hasClass('mc-selected')) {
              e.find('input').prop('checked', true);
            } else {
              e.find('input').prop('checked', false);
            }
            e.find('input').focus();
            if (e.hasClass('mc-selected')) {
              e.removeClass('mc-eliminated');
            }

            minSelect = parseInt(e.parents('.response-area-mc').data('minSelect'));
            numSelected = e.parent().find('.mc-selected').length;
            if (typeof answerItem == 'function') {
              if (minSelect == numSelected || Number.isNaN(minSelect)) {
                answerItem(e);
              }
              if (numSelected < minSelect) {
                deAnswerItem(e);
              }
            } else {
              console.warn('Missing tabs.js.');
            }
          };
        };
        $(option).click(fn($(option)));
      }
      ref3 = $('.mc-single-select');
      for (m = 0, len3 = ref3.length; m < len3; m++) {
        radioSet = ref3[m];
        ref4 = $(radioSet).find('.mc-option');
        for (n = 0, len4 = ref4.length; n < len4; n++) {
          option = ref4[n];
          fn = function(e) {
            return function() {
              if (e.hasClass('tts-active')) {
                return;
              }
              if (typeof answerItem == 'function') {
                answerItem(e);
              } else {
                console.warn('Missing tabs.js.');
              }
              e.addClass('mc-selected');
              e.find('input').prop('checked', true).focus();
              e.removeClass('mc-eliminated');
              e.siblings('.mc-option').find('input').prop('checked', false);
              return e.siblings('.mc-option').removeClass('mc-selected');
            };
          };
          $(option).click(fn($(option)));
        }
      }
    }

    return MCController;

  })();

  $(function() {
    return window.mcController = new MCController();
  });

}).call(this);

//Keyboard navigation for single-select
$('.mc-single-select .control input').keydown(function(e) {
  var target = $(this),
    parent = target.parents('.mc-option'),
    item = target.parents('.mc'),
    inputs = item.find('input'),
    elim = parent.find('.mc-eliminate-choice'),
    prev = parent.prev(),
    elimPrev = prev.find('.mc-eliminate-choice');

  switch (e.which) {
    case 9: //Tab
      if (e.shiftKey) {
        if (target.is(inputs.eq(0))) {
          return;
        }
        e.preventDefault();
        elimPrev.focus();
      } else {
        e.preventDefault();
        elim.focus();
      }
      break;
  }
});

$('.mc-single-select .mc-eliminate-choice').keydown(function(e) {
  var target = $(this),
    parent = target.parents('.mc-option'),
    item = target.parents('.mc'),
    elims = item.find('.mc-eliminate-choice'),
    input = parent.find('input'),
    next = parent.next(),
    inputNext = next.find('input');

  switch (e.which) {
    case 9: //Tab
      if (e.shiftKey) {
        e.preventDefault();
        input.focus();
      } else {
        if (target.is(elims.last())) {
          return;
        }
        e.preventDefault();
        inputNext.focus();
      }
      break;
  }
});
