//Controller for when an item is answered
function answerItem(target) {
  var components = $('.childItem.selected').find('.response-area').length,
    compsAnswered,
    responseArea = target.parents('.response-area'),
    tab = $('.itemTab li.selected'),
    tabTitle = parseInt(tab.html()),
    visible;

  responseArea.attr('answered', true);

  compsAnswered = $('.childItem.selected').find('.response-area').filter(function() {
    return $(this).attr("answered") == "true";
  });

  if (compsAnswered.length >= components) {
    if (tab.length) {
      //Set tab to answered state
      tab.addClass('answered');
      //Remove item from unanswered list
      $('.list-review li:nth-of-type(' + tabTitle + ')').hide();

      //Check # of unanswered items and adjust review screen accordingly
      visible = $('.list-review li').filter(function() {
        return $(this).css('display') == "list-item";
      });

      if (visible.length <= 1) {
        $('#review-questions-span').html('question');
      }
      if (visible.length == 0) {
        $('.review-unanswered').hide();
        $('.review-answered').show();
      }
    }

    //Set any associated calls-to-action to active
    updateState('.childItem.selected .btn-submit', 'enabled');
    updateState('.childItem.selected .cta-message', 'enabled');
    responseArea.find('.cta-submit-wrapper .cta-message').attr('tabindex', -1);
  }
}

//Controller for when an item is reverted to unanswered
function deAnswerItem(target) {
  var components = $('.childItem.selected').find('.response-area').length,
    compsAnswered,
    responseArea = target.parents('.response-area'),
    tab = $('.itemTab li.selected'),
    tabTitle = parseInt(tab.html()),
    visible;

  responseArea.attr('answered', false);

  compsAnswered = $('.childItem.selected').find('.response-area').filter(function() {
    return $(this).attr("answered") == "true";
  });

  if (compsAnswered.length <= components) {
    if (tab.length) {
      //Set tab to unanswered state
      tab.removeClass('answered');
      //Return item to unanswered list
      $('.list-review').find('li:nth-of-type(' + tabTitle + ')').show();

      //Check # of unanswered items and adjust review screen accordingly
      visible = $('.list-review li').filter(function() {
        return $(this).css('display') == "list-item";
      });

      if (visible.length > 1) {
        $('#review-questions-span').html('questions');
      }
      if (visible.length > 0) {
        $('.review-answered').hide();
        $('.review-unanswered').show();
      }
    }

    //Set any associated calls-to-action to inactive
    updateState('.childItem.selected .btn-submit', 'disabled');
    updateState('.childItem.selected .cta-message', 'disabled');
  }

}

//Item tab pagination controller
function showTabTray() {
  if ($('.itemTab').length) {
    var leftBtnWidth = parseInt($('.btn-tab-mover-wrapper:first-of-type').outerWidth()),
      viewportWidth = parseInt($(window).width()),
      firstTabLeftEdge = parseInt($('.itemTab li:first-of-type').offset().left),
      lastTabLeftEdge = parseInt($('.itemTab li:last-of-type').offset().left),
      lastTabWidth = parseInt($('.itemTab li:last-of-type').outerWidth(true)),
      lastTabRightEdge = lastTabLeftEdge + lastTabWidth,
      tabListWidth = lastTabRightEdge - firstTabLeftEdge;
    if (tabListWidth <= viewportWidth - 5) {
      $('.enaepTabStrip').addClass('non-paginated');
      $('.itemTab').css({
        "margin-left": 0,
        "transition": "margin 0s"
      });
    }
    if (tabListWidth > viewportWidth - 5) {
      $('.enaepTabStrip').removeClass('non-paginated');
      $('.itemTab').css({
        "margin-left": leftBtnWidth,
        "transition": "margin 0s"
      });
    }
  }
}

function changeBtnState() {
  if ($('.itemTab').length) {
    var currentMargin = parseInt($('.itemTab').css('margin-left')),
      leftBtnWidth = parseInt($('.btn-tab-mover-wrapper:first-of-type').outerWidth()),
      rightBtnOffset = parseInt($('.btn-tab-mover-wrapper:last-of-type').offset().left),
      tabListOffset = parseInt($('.itemTab').offset().left),
      tabWidth = parseInt($('.itemTab').outerWidth()),
      limit = tabListOffset + tabWidth;
    if (tabListOffset < leftBtnWidth - 1) {
      updateState('#btn-tab-mover-left', 'enabled');
    }
    if (limit > rightBtnOffset + 1) {
      updateState('#btn-tab-mover-right', 'enabled');
    }
    if (tabListOffset >= leftBtnWidth - 1) {
      updateState('#btn-tab-mover-left', 'disabled');
      $('#btn-tab-mover-right').focus();
    }
    if (limit <= rightBtnOffset + 1) {
      updateState('#btn-tab-mover-right', 'disabled');
      $('#btn-tab-mover-left').focus();
    }
  }
}

function showActiveTab() {
  var currentMargin = parseInt($('.itemTab').css('margin-left')),
    leftBtnOffset = parseInt($('.btn-tab-mover-wrapper:first-of-type').offset().left),
    leftBtnWidth = parseInt($('.btn-tab-mover-wrapper:first-of-type').outerWidth()),
    leftBtnRightEdge = leftBtnOffset + leftBtnWidth,
    rightBtnOffset = parseInt($('.btn-tab-mover-wrapper:last-of-type').offset().left),
    activeTabOffset = parseInt($('.itemTab li.selected').offset().left),
    activeTabWidth = parseInt($('.itemTab li.selected').outerWidth()),
    activeTabRightEdge = activeTabOffset + activeTabWidth,
    leftOverage = -(activeTabOffset - leftBtnRightEdge),
    rightOverage = activeTabRightEdge - rightBtnOffset;
  if (activeTabRightEdge >= rightBtnOffset) {
    $('.itemTab').css({
      "margin-left": currentMargin - rightOverage,
      "transition": "margin " + rightOverage / 750 + "s"
    });
    setTimeout(function() {
      changeBtnState();
    }, rightOverage + 50);
  }
  if (activeTabOffset <= leftBtnRightEdge) {
    $('.itemTab').css({
      "margin-left": currentMargin + leftOverage,
      "transition": "margin " + leftOverage / 750 + "s"
    });
    setTimeout(function() {
      changeBtnState();
    }, leftOverage + 50);
  }
}

function updateEE(target) {
  textArea = target.find('textarea').length;
  textInput = target.find('input[type=text]').length;
  if (textArea > 0 || textInput > 0) {
    updateState('#equation-btn', 'enabled');
  } else {
    updateState('#equation-btn', 'disabled');
  }
}

(function() {
  var ItemTabController, ItemTabGen, StimTabController, StimTabGen
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

  ItemTabController = (function() {
    function ItemTabController(arg) {
      var ref, height, heightEms;
      ref = arg != null ? arg : {}, this.element = ref.element, this.title = ref.title, this.listitem = ref.listitem, this.others = ref.others;
      this.setInactive = bind(this.setInactive, this);
      this.setActive = bind(this.setActive, this);
      this.tab = $("<li class='item'>" + this.title + "</li>");
      this.tab.click(this.setActive);
      $('ul.itemTab').append(this.tab);

      //Create a list item on the review tab for each item
      this.listitem = $("<li>Question " + this.title + "</li>");
      $('.list-review').append(this.listitem);

      //Create a scratchwork canvas for each item
      if (typeof scratchwork == 'function') {
        height = this.element.outerHeight() + 24;
        heightEms = height / 24;
        this.element.append('<canvas class="scratchwork-canvas" id="sw' + this.title + '" width="1416" height="' + height + '" style="height: ' + heightEms + 'em;"></canvas>');
        $('.scratchwork-canvas').each(function(idx) {
          var id = "sw" + (idx + 1);
          scratchwork(id, "initialize");
        });
      } else {
        console.warn('Missing scratchwork.js.');
      }

    }

    ItemTabController.prototype.setActive = function() {
      var c, d, e, j, k, l, len, len2, len3, ref, textArea, textInput, Title;
      ref = this.others;

      if (this.tab.hasClass('selected')) {
        return false;
      }

      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        c.setInactive();
      }

      this.element.parent('.content-container').show();
      $(".contentarea-inner").animate({
        scrollTop: 0
      }, 300);

      //Show selected item
      this.element.show();
      this.tab.addClass('selected');
      this.element.addClass('selected');

      //Disable Back/Next buttons if at first/last tab
      if (!this.tab.prev().length) {
        updateState('nav', 'start');
      } else if (!this.tab.next().length) {
        updateState('nav', 'end');
      } else {
        updateState('nav', 'middle');
      }

      //If tabs are paginated, make sure active tab is visible
      if (!this.tab.parents('.enaepTabStrip').hasClass('non-paginated')) {
        showActiveTab();
      }

      //Show Scroll Indicator if needed
      if (typeof MoreBtnController == 'function') {
        MoreBtnController(300);
      } else {
        console.warn('Missing scroll-indicator.js.');
      }

      //Disable scratchwork on review tab
      if (this.tab.is(':last-of-type')) {
        updateState('#scratchwork-btn', 'disabled');
      } else {
        updateState('#scratchwork-btn', 'enabled');
      }

      //Close equation editor if open
      updateState('ee', 'off');

      //Turn off TTS if on
      updateState('tts', 'off');

      //Disable equation editor button unless text entry field is in active item
      updateEE(this.element);

    };

    ItemTabController.prototype.setInactive = function() {
      this.element.parent('.content-container').hide();
      this.element.hide();
      this.element.removeClass('selected');
      return this.tab.removeClass('selected');
    };

    return ItemTabController;

  })();

  ItemTabGen = (function() {
    function ItemTabGen() {
      var item, idx, j, len, ref, selections, title;
      this.items = [];
      ref = $('.childItem');
      for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
        item = ref[idx];
        item = $(item);
        title = idx + 1;
        this.items.push(new ItemTabController({
          element: item,
          title: title,
          others: this.items
        }));
      }
      $('ul.itemTab li:first-child').addClass('selected');
      $('ul.itemTab li:last-child').html('Review');

      $('.content-container').hide();
      $('.content-container:first-of-type').find('.childItem').addBack().show();
      $('.content-container:first-of-type').find('.childItem').addBack().addClass('selected');
      updateEE($('.content-container:first-of-type'));

      $('.list-review li:last-of-type').remove();

    }

    return ItemTabGen;
  })();

  StimTabController = (function() {
    function StimTabController(arg) {
      var ref;
      ref = arg != null ? arg : {}, this.element = ref.element, this.title = ref.title, this.listitem = ref.listitem, this.others = ref.others;
      this.setInactive = bind(this.setInactive, this);
      this.setActive = bind(this.setActive, this);
      this.tab = $("<li class='stim'>" + this.title + "</li>");
      this.tab.click(this.setActive);
      $('ul.stimTab').append(this.tab);
    }

    StimTabController.prototype.setActive = function() {
      var c, j, len, ref;
      ref = this.others;

      if (this.tab.hasClass('selected')) {
        return false;
      }

      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        c.setInactive();
      }

      $('.stim-container').fadeOut(0).delay(250).fadeIn(200);

      //Shows selected item
      this.element.show();
      this.tab.addClass('selected');
      this.element.addClass('selected');
    };

    StimTabController.prototype.setInactive = function() {
      this.element.hide();
      this.element.removeClass('selected');
      return this.tab.removeClass('selected');
    };

    return StimTabController;
  })();

  StimTabGen = (function() {
    function StimTabGen() {
      var item, idx, j, len, ref, title;
      this.items = [];
      ref = $('.childStim');
      for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
        item = ref[idx];
        item = $(item);
        title = $(item).data('title');
        this.items.push(new StimTabController({
          element: item,
          title: title,
          others: this.items
        }));
      }
      $('ul.stimTab li:first-child').addClass('selected');
      $('.childStim').hide();
      $('.childStim').eq(0).show();
      $('.childStim').eq(0).addClass('selected');
    }

    return StimTabGen;
  })();

  $(function() {
    window.ItemTabGen = new ItemTabGen();
    return window.StimTabGen = new StimTabGen();
  });

}).call(this);

$(document).ready(function() {
  //Run tab tray controllers on initialization
  showTabTray();
  changeBtnState();

  //Run item tab tray controller on window resize/zoom
  $(window).resize(function() {
    showTabTray();
    changeBtnState();
  });

  $('#btn-tab-mover-left').click(function(e) {
    var currentMargin = parseInt($('.itemTab').css('margin-left')),
      leftBtnOffset = parseInt($('.btn-tab-mover-wrapper:first-of-type').offset().left),
      leftBtnWidth = parseInt($('.btn-tab-mover-wrapper:first-of-type').outerWidth()),
      rightBtnOffset = parseInt($('.btn-tab-mover-wrapper:last-of-type').offset().left),
      tabTrayOffset = leftBtnOffset + leftBtnWidth,
      tabTrayWidth = rightBtnOffset - tabTrayOffset,
      tabListOffset = parseInt($('.itemTab').offset().left),
      overage = -(tabListOffset - tabTrayOffset),
      tabWidth = parseInt($('.itemTab li:first-of-type').outerWidth()),
      remainder = tabTrayWidth % tabWidth;
    if (overage < tabTrayWidth) {
      $('.itemTab').css({
        "margin-left": leftBtnWidth,
        "transition": "margin " + overage / 1000 + "s"
      });
      //updateState('#btn-tab-mover-right', 'enabled');
      updateState('#btn-tab-mover-left', 'disabled');
      $('#btn-tab-mover-right').focus();
    } else {
      $('.itemTab').css({
        "margin-left": currentMargin + tabTrayWidth - remainder,
        "transition": "margin " + tabTrayWidth / 1000 + "s"
      });
      updateState('#btn-tab-mover-right', 'enabled');
    }
    setTimeout(function() {
      changeBtnState();
    }, tabTrayWidth);
  });

  $('#btn-tab-mover-right').click(function(e) {
    var currentMargin = parseInt($('.itemTab').css('margin-left')),
      rightBtnOffset = parseInt($('.btn-tab-mover-wrapper:last-of-type').offset().left),
      leftBtnOffset = parseInt($('.btn-tab-mover-wrapper:first-of-type').offset().left),
      leftBtnWidth = parseInt($('.btn-tab-mover-wrapper:first-of-type').outerWidth()),
      tabTrayOffset = leftBtnOffset + leftBtnWidth,
      tabTrayWidth = rightBtnOffset - tabTrayOffset,
      tabListOffset = parseInt($('.itemTab').offset().left),
      tabListWidth = parseInt($('.itemTab').outerWidth()),
      overage = (tabListOffset + tabListWidth) - rightBtnOffset,
      tabWidth = parseInt($('.itemTab li:first-of-type').outerWidth()),
      remainder = tabTrayWidth % tabWidth;
    if (overage < tabTrayWidth) {
      $('.itemTab').css({
        "margin-left": currentMargin - overage,
        "transition": "margin " + overage / 1000 + "s"
      });
      //updateState('#btn-tab-mover-left', 'enabled');
      updateState('#btn-tab-mover-right', 'disabled');
      $('#btn-tab-mover-left').focus();
    } else {
      $('.itemTab').css({
        "margin-left": currentMargin - tabTrayWidth + remainder,
        "transition": "margin " + tabTrayWidth / 1000 + "s"
      });
      //updateState('#btn-tab-mover-left', 'enabled');
    }
    setTimeout(function() {
      changeBtnState();
    }, tabTrayWidth);
  });

  $('#back-btn').click(function() {
    $('.itemTab li.selected').prev().trigger('click');
  });

  $('#next-btn').click(function() {
    $('.itemTab li.selected').next().trigger('click');
  });

});
