$(document).ready(function() {

  //Pane width controller
  var panestate = 0;

  $("#toggleLeft").click(function(e) {
    if (panestate == 0) {
      $("#taskpane").addClass("taskpane-left");
      $("#toggleRight").removeAttr('disabled');
      $("#wri-editor-toolbar button:not(.button-sticky-fontsize.ql-active)").removeAttr("tabindex");
      $("#wri-editor-actual").removeAttr("tabindex");
      $("#start-writing-flag").fadeOut(200);
      setTimeout(function() {
        $("#wri-editor-contents-wrapper").css("overflow-x", "auto");
      }, 450);
      panestate = 1;
    } else if (panestate == 1) {
      $("#taskpane").addClass("taskpane-left2");
      $("#toggleLeft").attr('disabled', true);
      $(".tts-active").attr("tabindex", -1);
      $("#toggleRight").focus();
      updateState('tts', 'off');
      updateState('sw', 'off');
      updateState('#scratchwork-btn', 'disabled');
      updateState('#read-aloud-btn', 'disabled');
      panestate = 2;
    }
  });

  $("#toggleRight").click(function(e) {
    if (panestate == 1) {
      $("#taskpane").removeClass("taskpane-left");
      $("#toggleRight").attr('disabled', true);
      $("#toggleLeft").focus();
      $("#wri-editor-contents-wrapper").css("overflow-x", "hidden");
      $(".wri-dialog-backdrop").addClass("hidden");
      $("button.spelling-toggle").removeClass("ql-active");
      $("button.thesaurus-toggle").removeClass("ql-active");
      $("#wri-editor-toolbar button, #wri-editor-actual").attr("tabindex", -1);
      panestate = 0;
    } else if (panestate == 2) {
      $("#taskpane").removeClass("taskpane-left2");
      $("#toggleLeft").removeAttr('disabled');
      $(".tts-active").attr("tabindex", 0);
      updateState('#scratchwork-btn', 'enabled');
      updateState('#read-aloud-btn', 'enabled');
      panestate = 1;
    }
  });

  //Menu controllers
  //Open dropdown and main context menu
  function openDropdown(target) {
    var buttonWidth = target.outerWidth(),
      dropWidth = target.siblings('.wri-menu').outerWidth(),
      windowWidth = $(window).width(),
      remainder = windowWidth - target.offset().left,
      difference = buttonWidth - dropWidth + 1,
      menu = target.siblings('.wri-menu');

    //Makes dropdowns drop left if near right edge of screen
    menu.removeClass('wri-dropdown-left').css('left', 0);
    if (remainder <= dropWidth) {
      menu.addClass('wri-dropdown-left');
      menu.css('left', difference);
    }

    //Opens dropdown menu, makes options tabbable, and hides any others currently open
    target.parentsUntil('#wri-editor-toolbar').siblings().find(".wri-dropdown-wrapper").removeClass('active');
    $('#wri-context-menu').removeClass('active');
    $('.wri-menu').find('button, .wri-context-sub-trigger').attr('tabindex', -1);
    target.parent('.wri-dropdown-wrapper').toggleClass('active');
    if (target.parent('.wri-dropdown-wrapper').hasClass('active')) {
      menu.find('button').attr('tabindex', 0);
    }
  }

  //Open context submenu
  function openSubMenu(e) {
    e.addClass('active');
    e.find('button').attr('tabindex', 0);
    e.find('button:first-of-type').focus();
  }

  //Hide all menus
  function hideMenus() {
    $('.wri-dropdown-wrapper, .wri-menu, .wri-context-sub-trigger').removeClass('active');
    $('.wri-menu').find('button, .wri-context-sub-trigger').attr('tabindex', -1);
  }

  //Hide context submenu
  function hideSubMenu(e) {
    e.removeClass('active');
    e.find('button').attr('tabindex', -1);
    e.focus();
  }

  //Get position of mouse pointer
  function getCursorPosition(e) {
    var posx = 0;
    var posy = 0;

    if (!e) var e = window.event;

    if (e.pageX || e.pageY) {
      posx = e.pageX;
      posy = e.pageY;
    } else if (e.clientX || e.clientY) {
      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    return {
      x: posx,
      y: posy
    }
  }

  //Set position of context menu to pointer position
  function positionMenu(e) {
    var clickCoords = getCursorPosition(e),
      clickCoordsX = clickCoords.x,
      clickCoordsY = clickCoords.y - 60,
      menu = $('#wri-context-menu'),
      menuWidth = menu.outerWidth() + 4,
      menuHeight = menu.outerHeight() + 4,
      windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    if ((windowWidth - clickCoordsX) < menuWidth) {
      menu.css('left', windowWidth - menuWidth + 'px');
    } else {
      menu.css('left', clickCoordsX + "px");
    }

    if ((windowHeight - clickCoordsY) < menuHeight) {
      menu.css('top', clickCoordsY - menuHeight + "px");
    } else {
      menu.css('top', clickCoordsY + "px");
    }
  }

  //Set position of context submenu to avoid overflow
  function positionSubMenu(option) {
    var optionOffsetX = option.offset().left,
      optionOffsetY = option.offset().top,
      optionWidth = option.outerWidth(),
      optionHeight = option.outerHeight(),
      menu = option.find('.wri-context-submenu'),
      menuWidth = menu.outerWidth() + 4,
      menuHeight = menu.outerHeight() + 4,
      windowWidth = window.innerWidth,
      windowHeight = window.innerHeight;

    if (windowWidth < (optionOffsetX + optionWidth + menuWidth)) {
      menu.css('left', -menuWidth + 3 + 'px');
    } else {
      menu.css('left', '');
    }

    if (windowHeight < (optionOffsetY + menuHeight)) {
      menu.css('top', -(menuHeight - optionHeight - 3) + 'px');
    } else {
      menu.css('top', '');
    }
  }

  //Open dropdown and close all other menus when dropdown button is clicked
  $(document).click(function(e) {
    var target = $(e.target),
      button = e.which || e.button;

    if (button === 1) { //If left-click, open menu
      if (target.is('.wri-dropdown-wrapper > .wri-btn')) {
        openDropdown(target);
      } else { //Otherwise, close all menus
        hideMenus();
      }
    }
  });

  //Open context menu when text area is right-clicked
  $(document).contextmenu(function(e) {
    if ($(e.target).is('#wri-editor-actual')) { //Open context menu and close other menus when text editor is right-clicked
      e.preventDefault();
      hideMenus();
      positionMenu(e);
      $('#wri-context-menu').addClass('active');
      $('#wri-context-menu').children('button, .wri-context-sub-trigger').attr('tabindex', 0);
      $('#wri-context-menu').children('button:first-of-type').focus();
    } else { //Close menus when anything else is right-clicked
      hideMenus();
    }
  });

  //On mouseover of context submenu trigger, position context submenu and enable options
  $('.wri-context-sub-trigger').mouseover(function(e) {
    var target = $(this);
    positionSubMenu(target);
    target.addClass('active');
    target.find('button').attr('tabindex', 0);
  });

  //On mouseout of context submenu trigger, hide submenu and disable options
  $('.wri-context-sub-trigger').mouseout(function(e) {
    var target = $(this);
    target.removeClass('active');
    target.find('button').attr('tabindex', -1);
  });

  //Initialize Quill
  var quill = new Quill('#wri-editor-actual', {
    modules: {
      toolbar: '#wri-editor-toolbar'
    }
  });

  //Listen to quill selection changes
  quill.on('selection-change', function(range, oldRange, source) {
    if (range) {
      if (range.length == 0) {
        $('.ql-cut, .ql-copy').addClass('disabled'); //Disable cut and copy buttons when there is no selection
      } else {
        $('.ql-cut, .ql-copy').removeClass('disabled'); //Enabled cut and copy buttons when there is a selection
        // content = quill.getText(range.index, range.length); //Set clipboard content when text is selected
      }
    } else {
      $('.ql-cut, .ql-copy').addClass('disabled');
    }
  });

  //Controller for cut, copy, and paste buttons
  (function() {
    var content;

    //Cut button
    $('.ql-cut').click(function() {
      var range = quill.getSelection();
      if (range != 0) {
        content = quill.getText(range.index, range.length); //Set clipboard content to selection
        quill.deleteText(range.index, range.length); //Delete selection
      }
    });

    //Copy button
    $('.ql-copy').click(function() {
      var range = quill.getSelection();
      content = quill.getText(range.index, range.length); //Set clipboard content
      quill.focus();
    });

    //Paste button
    $('.ql-paste').click(function() {
      if (content) {
        var length = content.length,
          range = quill.getSelection(),
          newPos = length + range.index;
        if (range) {
          if (range != 0) {
            quill.deleteText(range.index, range.length); //If text is selected, delete it
          }
          quill.insertEmbed(range.index, 'text', content, 'user');
          quill.setSelection(newPos, 0); //Move cursor to end of inserted text
        }
      }
    });

  })();


  //Controller for select-all button
  $('.ql-select-all').click(function() {
    var length = quill.getLength();
    quill.setSelection(0, length, 'user');
  });

  //Controller for undo button
  $('.ql-undo').click(function() {
    quill.history.undo();
  });

  //Controller for redo button
  $('.ql-redo').click(function() {
    quill.history.redo();
  });

  //Controller for button states
  quill.on('text-change', function(delta, oldDelta, source) {
    var length = quill.getLength(),
      range = quill.getSelection(),
      undoHistory = quill.history.stack.undo.length,
      redoHistory = quill.history.stack.redo.length;

    if (range) {
      if (range.length == 0) {
        $('.ql-cut, .ql-copy').addClass('disabled'); //Disable cut and copy buttons when there is no selection
      } else {
        $('.ql-cut, .ql-copy').removeClass('disabled'); //Enabled cut and copy buttons when there is a selection
      }
    }
    if (length <= 1) {
      $('.ql-select-all').addClass('disabled'); //Disable select-all button when there is no content in the editor
    } else if (length > 1) {
      $('.ql-select-all').removeClass('disabled');
    }
    if (undoHistory == 0) {
      $('.ql-undo').addClass('disabled');
    } else if (undoHistory > 0) {
      $('.ql-undo').removeClass('disabled');
    }
    if (redoHistory == 0) {
      $('.ql-redo').addClass('disabled');
    } else if (redoHistory > 0) {
      $('.ql-redo').removeClass('disabled');
    }
  });


  //Set border-radius for formatting buttons by watching for class mutations
  //Select the target nodes
  var targets = $('.button-sticky');

  //Create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      target = mutation.target,
        next = target.nextElementSibling,
        prev = target.previousElementSibling;

      observer.disconnect(); //Kill observer to prevent infinite loop caused by class change
      observer.takeRecords(); //Remove observer's record cue
      if (target.classList.contains('ql-active')) {
        if (next) {
          if (next.classList.contains('ql-active')) {
            target.classList.add('remove-border-radius');
          } else {
            target.classList.remove('remove-border-radius');
          }
        }
        if (prev) {
          if (prev.classList.contains('ql-active')) {
            prev.classList.add('remove-border-radius');
          }
        }
      } else {
        target.classList.remove('remove-border-radius');
        if (prev) {
          prev.classList.remove('remove-border-radius');
        }
      }
      targets.each(function() { //Restart observer
        observer.observe(this, config);
      });
    });
  });

  //Configuration of the observer
  var config = {
    attributes: true,
    attributeFilter: ['class']
  };

  targets.each(function() {
    //Pass the target node and observer options
    observer.observe(this, config);
  });


  //Controller for dynamic drop shadow below writing editor controls
  $('#wri-editor-contents-wrapper').on('scroll', function() {
    var scrollposition;
    if ($(this).scrollTop() <= 300) {
      scrollposition = $(this).scrollTop();
      scrollposition = scrollposition / 300;
      $("#wri-editor-top-shadow").css("opacity", scrollposition);
    }
  });

  //Make dialogs draggable
  $(".wri-dialog").draggable({
    handle: ".wri-dialog-top-bar",
    cancel: ".close-dialog-btn",
    containment: 'parent'
  });

  //Open and close dialogs
  $(".spelling-toggle").click(function(e) {
    $(".wri-dialog-backdrop:not(#spell-check-dialog)").addClass('hidden');
    $("[class*=toggle]:not(.spelling-toggle)").removeClass('ql-active');
    $("#spell-check-dialog").toggleClass("hidden");
    $(".spelling-toggle").toggleClass("ql-active");
    if (!$("#spell-check-dialog").hasClass('hidden')) {
      $("#spell-check-dialog select").focus();
    } else {
      quill.focus();
    }
  });

  $(".thesaurus-toggle").click(function(e) {
    $(".wri-dialog-backdrop:not(#thesaurus-dialog)").addClass('hidden');
    $("[class*=toggle]:not(.thesaurus-toggle)").removeClass('ql-active');
    $("#thesaurus-dialog").toggleClass("hidden");
    $(".thesaurus-toggle").toggleClass("ql-active");
    if (!$("#thesaurus-dialog").hasClass('hidden')) {
      $("#thesaurus-dialog select").focus();
    } else {
      quill.focus();
    }
  });

  $(".options-toggle").click(function(e) {
    $(".wri-dialog-backdrop:not(#options-dialog)").addClass('hidden');
    $("[class*=toggle]").removeClass('ql-active');
    $("#options-dialog").toggleClass("hidden");
    if (!$('#options-dialog').hasClass('hidden')) {
      $('#options-dialog input[type=checkbox]').eq(0).focus();
    } else {
      quill.focus();
    }
  });

  //Draggable dialog flag controller
  $(".wri-dialog").mousedown(function(e) {
    $(".draggable-dialog-flag").fadeOut(300);
  });

  //Focus Quill when visible editor area is clicked
  $('#wri-editor-actual').click(function() {
    quill.focus();
  });

  //Keyboard navigation handler for dropdown button
  $('.wri-dropdown-wrapper .wri-btn').keydown(function(e) {
    var target = $(e.target);
    switch (e.which) {
      case 27: //Escape
        hideMenus();
        break;
      case 13: //Enter
      case 32: //Space
        e.preventDefault();
        openDropdown(target);
        if ($(this).parents('.wri-dropdown-wrapper').hasClass('active')) {
          $(this).siblings('.wri-menu').find('button:not([class*="disabled"])').first().focus();
        }
        break;
      case 40: //Down arrow
        e.preventDefault();
        if ($(this).parents('.wri-dropdown-wrapper').hasClass('active')) {
          $(this).siblings('.wri-menu').find('button:not([class*="disabled"])').first().focus();
        } else {
          openDropdown(target);
          $(this).siblings('.wri-menu').find('button:not([class*="disabled"])').first().focus();
        }
        break;
    }
  });

  //Keyboard navigation handler for dropdown menu options
  $('.wri-menu').children().not('hr').keydown(function(e) {
    var target = $(e.target),
      parent = target.closest('.wri-menu'),
      button = target.parents('.wri-dropdown-wrapper').children('.wri-btn'),
      sibs = parent.children().not('hr'),
      idx = sibs.index(e.target),
      first = sibs.eq(0),
      last = sibs.eq(sibs.length - 1),
      next = sibs.eq(idx + 1),
      prev = sibs.eq(idx - 1);

    e.preventDefault();
    switch (e.which) {
      case 9: //Tab
      case 27: //Escape
        if (parent.hasClass('wri-context-submenu')) {
          hideSubMenu(parent.closest('.wri-context-sub-trigger'));
        } else {
          hideMenus();
          if (button.length) {
            button.focus();
          } else {
            quill.focus();
          }
        }
        break;
      case 13: //Enter
      case 32: //Space
        if (target.is('.wri-context-sub-trigger')) {
          openSubMenu(target);
        } else {
          hideMenus();
          quill.focus();
        }
        break;
      case 36: //Home
        first.focus();
        break;
      case 35: //End
        last.focus();
        break;
      case 37: //Left arrow
        hideSubMenu(parent.closest('.wri-context-sub-trigger'));
        break;
      case 38: //Up arrow
        if (target.is(':first-child')) {
          last.focus();
        } else {
          prev.focus();
        }
        break;
      case 39: //Right arrow
        if (target.is('.wri-context-sub-trigger')) {
          openSubMenu(target);
        }
        break;
      case 40: //Down arrow
        if (target.is(':last-child')) {
          first.focus();
        } else {
          next.focus();
        }
        break;
      default:
        return false;
    }
  });

  // Focus dropdown menu options on hover so user can switch between mouse and keyboard nav at will
  $('.wri-menu').children().not('hr').hover(function() {
    $(this).focus();
    $(this).siblings().removeClass('active');
  });

  // Throw dialog when user enters > max characters
  $('textarea').on('input', function(e) {
    var el = $(this),
      maxLength = parseInt(el.data('maxLength')),
      charCount = el.val().length;
    if (charCount > maxLength) {
      el.addClass('dialog-originator');
      el.val(el.val().substring(0, maxLength));
      if (typeof openDialog == 'function') {
        openDialog("validation", $(this), "", "", maxLength);
      } else {
        console.warn('Missing dialogs.js.');
      }
      return;
    }
  });

  //Set up scratchwork
  $('#stimulus').append('<canvas class="scratchwork-canvas" id="sw1" width="590" height="837" style="display:none;"></canvas>');
  if (typeof scratchwork == 'function') {
    scratchwork("sw1", "initialize");
  } else {
    console.warn('Missing scratchwork.js.');
  }

});
