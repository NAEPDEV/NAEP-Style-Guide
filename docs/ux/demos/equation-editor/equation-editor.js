//Controller for equation editor focus and active state behaviors
$(document).click(function(e) {
  var target = $(e.target);

  if (target.is('.ee-btnarea .ee-btn') || target.is('.ee-btnarea .ee-btn span') || target.is('.ee-btnarea .ee-btn i') || target.is('.ee-tabarea') || target.is('.ee-tabs li') || target.is('.ee-btnarea') || target.is('.ee-spacer') || target.is('.ee-btnarea-row') || target.is('.ee-btnarea-group') || target.is('#equation-btn') || target.is('#equation-btn span') || target.is('#ee-btn-close')) {
    return;
  } else if (target.is('textarea') || target.is('input[type=text]')) {
    enableEquationEditor(target); // In ux/demos/shared/platform-utilities.js
  } else {
    disableEquationEditor(target); // In ux/demos/shared/platform-utilities.js
  }
});

$(document).keypress(function(e) {
  var target = $(e.target);

  if (target.is('.ee-btnarea .ee-btn') || target.is('.ee-btnarea .ee-btn span') || target.is('.ee-btnarea .ee-btn i') || target.is('.ee-tabarea') || target.is('.ee-tabs li') || target.is('.ee-btnarea-group')) {
    return;
  } else if (target.is('textarea') || target.is('input[type=text]')) {
    enableEquationEditor(target); // In ux/demos/shared/platform-utilities.js
  } else {
    disableEquationEditor(target); // In ux/demos/shared/platform-utilities.js
  }
});

//Delegated keyboard nav handler for EE tabs
$('.ee-tabs').on('keydown', 'li', function(e) {
  e.preventDefault();
  switch (e.which) {
    case 9: //Tab
      if (e.shiftKey) {
        var FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex=0], *[contenteditable]';
        $('#contentarea').find(FOCUSABLE_SELECTORS).last().focus();
      } else {
        $('#ee-btn-close').focus();
      }
      break;
    case 13: //Enter
    case 32: //Space
      $(this).trigger('click');
      break;
    case 37: //Left arrow
    case 38: //Up arrow
      if ($(this).is('li:first-of-type')) {
        $(this).siblings('li:last-of-type').trigger('click');
      } else {
        $(this).prev().trigger('click');
      }
      break;
    case 39: //Right arrow
    case 40: //Down arrow
      if ($(this).is('li:last-of-type')) {
        $(this).siblings('li:first-of-type').trigger('click');
      } else {
        $(this).next().trigger('click');
      }
      break;
  }
});

//Redirect focus to active EE tab when focus shifts to any tab
$('.ee-tabs').on('focus', 'li', function(e) {
  $(this).siblings('.selected').focus();
});


//Contoller for equation editor tabs
(function() {
  var EETabController, EETabGen,
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

  EETabController = (function() {
    function EETabController(arg) {
      var ref;
      ref = arg != null ? arg : {}, this.element = ref.element, this.title = ref.title, this.others = ref.others;
      this.setInactive = bind(this.setInactive, this);
      this.setActive = bind(this.setActive, this);
      this.tab = $("<li tabindex='-1'>" + this.title + "</li>");
      this.tab.click(this.setActive);
      $('ul.ee-tabs').append(this.tab);
    }

    EETabController.prototype.setActive = function() {
      var c, j, len, ref;
      ref = this.others;
      if (this.tab.hasClass('selected')) {
        return false;
      }
      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        c.setInactive();
      }
      this.element.show();
      this.tab.addClass('selected').focus();
    };

    EETabController.prototype.setInactive = function() {
      this.element.hide();
      return this.tab.removeClass('selected');
    };

    return EETabController;
  })();

  EETabGen = (function() {
    function EETabGen() {
      var item, idx, j, len, ref, title;
      this.items = [];
      ref = $('.ee-btnarea');
      for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
        item = ref[idx];
        item = $(item);
        title = item.data('title');
        this.items.push(new EETabController({
          element: item,
          title: title,
          others: this.items
        }));
      }
      if ($('ul.ee-tabs li').length == 1) {
        $('ul.ee-tabs li').remove();
      } else {
        $('ul.ee-tabs li:first-child').addClass('selected');
      }
      $('.ee-btnarea').hide();
      $('.ee-btnarea:nth-of-type(2)').show();
    }
    return EETabGen;
  })();

  $(function() {
    return window.EETabGen = new EETabGen();
  });

}).call(this);
