var baseZoom = parseFloat($('html').css('font-size')),
  state = {
    help: 'off',
    theme: 'default',
    zoom: 0,
    lang: 'eng',
    tts: 'off',
    sw: 'off',
    'sw-mode': 'pencil',
    ee: 'off',
    calc: 'off',
    nav: 'start',
    'ereader-panel': 'closed',
    dialog: 'closed',
    wizard: 'closed',
  };

function updateState(k, v) {
  var tools = [
    'help',
    'theme',
    'zoom',
    'lang',
    'tts',
    'sw',
    'sw-mode',
    'ee',
    'calc',
    'nav',
    'ereader-panel',
    'dialog',
    'wizard',
  ];

  // Check if parameters are asking to enable an ad hoc element.
  // If so, enable element and remove it from the hash.
  // If not, update the hash.
  if (!tools.indexOf(k) >= 0 && v == 'enabled') {
    $(k).removeAttr('disabled');
    delete state[k];
  } else {
    state[k] = v;
  }

  //Timer (must be in this position)
  if (state['timer'] == 'on') {
    $('#timer-btn').addClass('active');
    $('#timer-tray').removeClass('hidden');
  } else if (state['timer'] == 'off') {
    $('#timer-btn').removeClass('active');
    $('#timer-tray').addClass('hidden');
  }

  //Scratchwork mode
  changeSWMode(state['sw-mode']);

  //Scratchwork (must be in this position)
  if (state['sw'] == 'on') {
    disableUI();
    turnOffTTS();
    state['tts'] = 'off';
    turnOffEE();
    state['ee'] = 'off';
    turnOffCalc();
    state['calc'] = 'off';
    turnOnSW(k);
    return;
  } else if (state['sw'] == 'off') {
    enableUI();
    turnOffSW();
  }

  //TTS
  if (state['tts'] == 'on') {
    if (k == 'ee' && v == 'on') {
    } else {
      turnOffEE();
      state['ee'] = 'off';
      disableUI();
      turnOnTTS();
      sendMessage('tts,on');
    }
  } else if (state['tts'] == 'off') {
    enableUI();
    turnOffTTS();
    sendMessage('tts,off');
  }

  //Help
  if (state['help'] == 'on') {
    $('#help-btn').addClass('active');
  } else if (state['help'] == 'off') {
    $('#help-btn').removeClass('active');
  }

  //Theme
  if (k == 'theme') {
    if (state['theme'] == 'default') {
      changeColorTheme('default');
      sendMessage('theme,default');
    } else if (state['theme'] == 'beige') {
      changeColorTheme('beige');
      sendMessage('theme,beige');
    } else if (state['theme'] == 'dark') {
      changeColorTheme('dark');
      sendMessage('theme,dark');
    }
  }

  //Zoom
  changeZoom(state['zoom']);

  //Change Language
  if (state['lang'] == 'eng') {
    changeLanguage('eng');
  } else if (state['lang'] == 'esp') {
    changeLanguage('esp');
  }

  //Equation Editor
  if (state['ee'] == 'on') {
    turnOnEE();
  } else if (state['ee'] == 'off') {
    turnOffEE();
  }

  //Calculator
  if (state['calc'] == 'on') {
    turnOnCalc();
  } else if (state['calc'] == 'off') {
    turnOffCalc();
  }

  //Navigation
  if (state['nav'] == 'start') {
    $('#back-btn').attr('disabled', true);
    $('#next-btn').removeAttr('disabled');
    if (k == 'nav') {
      $('#next-btn').focus();
    }
  } else if (state['nav'] == 'middle') {
    $('#back-btn').removeAttr('disabled');
    $('#next-btn').removeAttr('disabled');
  } else if (state['nav'] == 'end') {
    $('#back-btn').removeAttr('disabled');
    $('#next-btn').attr('disabled', true);
    if (k == 'nav') {
      $('#back-btn').focus();
    }
  }

  //eReader questions panel
  if (state['ereader-panel'] == 'open') {
    openEreaderPanel();
  } else if (state['ereader-panel'] == 'closed') {
    closeEreaderPanel();
  }

  //Dialogs
  if (state['dialog'] == 'open') {
    $(
      '#help-btn, #scratchwork-btn, #equation-btn, #calc-btn, #next-btn, #back-btn'
    ).attr('disabled', true);
    turnOffEE();
    state['ee'] = 'off';
    $('#contentarea').find(ttsFocusRings).attr('tabindex', -1);
    $('#contentarea').find(ttsBorders).removeClass('tts-active');
    setTimeout(function () {
      $('.scroll-indicator').attr('tabindex', -1);
    }, 301);
  }

  //Wizards
  if (state['wizard'] == 'open') {
    $('#scratchwork-btn, #equation-btn, #calc-btn, #next-btn, #back-btn').attr(
      'disabled',
      true
    );
  }

  //Support for ad hoc disabling of UI elements
  for (var key in state) {
    if (state[key] == 'disabled') {
      $(key).attr('disabled', true);
    }
  }
}

//Add unique IDs to passed elements
function addUniqueID(target, prefix) {
  var counter = 1;

  target.each(function () {
    $(this).attr('id', prefix + counter);
    counter++;
  });
}

function pauseMedia() {
  $('.char-wrapper').removeClass('char-vo-play');
  $('video, audio').each(function () {
    $(this).get(0).pause();
  });
}

function resetWriting() {
  $('.wri-dropdown-wrapper').removeClass('active');
  $('.wri-dialog-backdrop').addClass('hidden');
  $('[class*=toggle]').removeClass('active');
}

function resetSISMedia() {
  $('.sis-media-selection').removeClass('sis-media-active');
  $('.sis-media-btn-secondary').attr('tabindex', -1);
}

function resetSISMaxSelect() {
  $('.sis-alert').addClass('hidden').removeClass('pulse');
  $('.sis-alert-close').attr('disabled', true);
  $('.sis-selection-originator').removeClass('sis-selection-originator');
}

function updatePageButtons(state) {
  document.dispatchEvent(
    new CustomEvent('updatePageButtons', {
      detail: {
        state: state,
      },
    })
  );
}

var standardList =
    'textarea, input[type=text], input[type=radio]:not(.step-indicator input), input[type=checkbox], input[type=range], select, .btn, .footnote-btn, .media-btn, .media-container, .btn-dialog-close, .mc, .mc-eliminate-choice, table.grid, .inline-choice, .match-option, .sis-media-selection, .sis-media-btn-primary, .btn-close, .response-area-selectable-table, .ruler-draggable, .layer-switch-wrapper, #QuestionsButton, #wri-editor-toolbar button, .wri-dialog button, .wri-combobox, .bg-bar, .obj-translatable, .obj-resizable, .obj-rotatable, .coord-grid text, .shape-prepop, .asymptote-handle, .shape-transformable, .sb-source .point, .sb-source .line, .ft-center-point, .char-portrait',
  customList =
    'a, .accordion span, .tablesorter th.header, .inline-choice > span, .sis-text-selection, .handle-size, .point:not(.sb-source .point, .ft-center-point), .line:not(.sb-source .line), .sb-source, .asymptote, .nl-point, .nl-segment, .bw-actual, .dl-section, .nl-zoom-span, .ft-source';

function disableUI() {
  var standardEls = $(standardList),
    customEls = $(customList);

  standardEls.attr('disabled', true);
  customEls.attr('disabled', true).attr('tabindex', -1);
  pauseMedia();
  resetWriting();
  resetSISMedia();
  resetSISMaxSelect();
  updatePageButtons('disable');
  $('.inline-choice').removeClass('active');
  if ($('.match-option').length) {
    $('.match-option').draggable('disable');
  }
}

function enableUI() {
  var standardEls = $(standardList),
    customEls = $(customList);

  standardEls.removeAttr('disabled');
  customEls.removeAttr('disabled').attr('tabindex', 0);
  updatePageButtons('enable');
  $('.cta-submit-wrapper .cta-message').attr('tabindex', -1);
  if ($('.match-option').length) {
    $('.match-option').draggable('enable');
  }
}

//document.addEventListener('colorThemeChange', changeColorTheme);

function changeColorTheme(theme) {
  var node;

  $('head .beige-stylesheet').remove();
  $('head .dark-stylesheet').remove();
  if (theme == 'default') return;
  node = document.createElement('link');
  node.setAttribute('rel', 'stylesheet');
  node.setAttribute('class', theme + '-stylesheet');
  node.setAttribute('href', '../shared/color-theme-' + theme + '.css');
  document.querySelector('head').appendChild(node);
}

function changeZoom(state) {
  if (state == 0) {
    $('html').css('font-size', baseZoom);
    $('#zoom-out-btn').attr('disabled', true);
    $('#zoom-in-btn').removeAttr('disabled');
  } else if (state == 1) {
    $('html').css('font-size', baseZoom * 1.333);
    $('#zoom-out-btn').removeAttr('disabled');
    $('#zoom-in-btn').removeAttr('disabled');
  } else if (state == 2) {
    $('html').css('font-size', baseZoom * 1.667);
    $('#zoom-out-btn').removeAttr('disabled');
    $('#zoom-in-btn').removeAttr('disabled');
  } else if (state == 3) {
    $('html').css('font-size', baseZoom * 2);
    $('#zoom-out-btn').removeAttr('disabled');
    $('#zoom-in-btn').attr('disabled', true);
  }
  if (typeof MoreBtnController == 'function') {
    MoreBtnController(100);
  } else {
    // console.warn('Missing scroll-indicator.js.');
  }
}

function changeLanguage(lang) {
  var target;

  if (lang == 'eng') {
    target = $('#change-lang-btn');
  } else if (lang == 'esp') {
    target = $('#change-lang-btn2');
  }

  target.removeClass('hidden');
  target.siblings('.change-lang-class').addClass('hidden');
  $('#change-lang-btn2-eng-box').toggleClass('slide-left');
  $('#change-lang-btn-esp-box').toggleClass('slide-right');
  $('.arrow').toggleClass('fade-in');
  target.siblings('.change-lang-class').focus();
}

// addEventListener support for IE8
function bindEvent(element, eventName, eventHandler) {
  if (element.addEventListener) {
    element.addEventListener(eventName, eventHandler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + eventName, eventHandler);
  }
}

// Send a message to the parent
var sendMessage = function (msg) {
  // Make sure you are sending a string, and to stringify JSON
  if (window.parent.length) {
    window.parent.postMessage(msg, '*');
  }
};

// Listen to messages from parent window
bindEvent(window, 'message', function (e) {
  var arr = e.data.split(','),
    key = arr[0],
    value = arr[1];

  updateState(key, value);
});

var ttsBorders =
    '.stimulus-paragraph p, .stem-paragraph-inner, .stem-paragraph p, .standalone-image, .mc-option, table.grid tr, .match-option-text, .footnote-paragraph, .list-unordered li, .alert p, .cta-message, .char-portrait figcaption p, .char-text p, .char-text h3 span, .sis-selection-header p, .wizard h3, .wizard p, .response-area-iic, .stim-table tr, .match-background',
  ttsFocusRings =
    '.stimulus-paragraph p, .stem-paragraph-inner, .stem-paragraph p, .standalone-image, .mc-content:not(.nl-control-wrapper .mc-content), .grid-content, .match-option-text, .footnote-paragraph, .list-unordered li, .alert p, .cta-message, .char-portrait figcaption p, .char-text p, .char-text h3 span, .sis-selection-header p, .wizard h3, .wizard p, .response-area-iic, .table-content, .match-background';

function turnOnTTS() {
  var ttsBorderedUnits = $(ttsBorders),
    ttsFocusableUnits = $(ttsFocusRings);

  $('.dialog .btn').removeAttr('disabled');
  $('#read-aloud-btn').addClass('active');
  ttsBorderedUnits.addClass('tts-active');
  ttsFocusableUnits.attr('tabindex', 0);
}

function turnOffTTS() {
  var ttsBorderedUnits = $(ttsBorders),
    ttsFocusableUnits = $(ttsFocusRings);

  $('#read-aloud-btn').removeClass('active');
  ttsBorderedUnits.removeClass('tts-active');
  ttsFocusableUnits.removeAttr('tabindex');
  $('.cta-submit-wrapper .cta-message').attr('tabindex', -1);
}

function turnOnSW(k) {
  $('.system-btn:not(#scratchwork-btn):not(#timer-btn), .btn-nav').attr(
    'disabled',
    true
  );
  $('.enaepTab li').attr('disabled', true);
  $('.btn-tab-mover').attr('disabled', true);
  $('.step-indicator input').attr('disabled', true);
  $('.footnote-content').removeClass('active');
  $('.childItem.selected, #stimulus')
    .find('.scratchwork-canvas')
    .addClass('active');
  $('#scratchwork-btn').removeAttr('disabled').addClass('active');
  $('#scratchwork-tray').removeClass('hidden');
  if (k == 'sw') {
    $('.tray-btn').removeClass('active');
    $('#pencil-btn').addClass('active');
    $('.tray-btn').removeAttr('disabled');
    $('#pencil-btn').attr('disabled', true);
    state['sw-mode'] = 'pencil';
  }
}

function turnOffSW() {
  $('.system-btn, .btn-nav').removeAttr('disabled');
  $('.enaepTab li').removeAttr('disabled');
  $('.btn-tab-mover').removeAttr('disabled');
  $('.step-indicator input').removeAttr('disabled');
  $('.childItem.selected, #stimulus')
    .find('.scratchwork-canvas')
    .removeClass('active');
  $('#scratchwork-btn').removeClass('active');
  $('#scratchwork-tray').addClass('hidden');
  $('.tray-btn').attr('disabled', true);
}

function changeSWMode(mode) {
  $('.tray-btn').removeClass('active');
  $('.tray-btn').removeAttr('disabled');
  if (mode == 'pencil') {
    $('#pencil-btn').attr('disabled');
    $('#pencil-btn').addClass('active');
  } else if (mode == 'highlighter') {
    $('#highlighter-btn').attr('disabled');
    $('#highlighter-btn').addClass('active');
  } else if (mode == 'eraser') {
    $('#eraser-btn').attr('disabled');
    $('#eraser-btn').addClass('active');
  }
}

function turnOnEE(target) {
  var contentArea = $('.contentarea-inner'),
    eeToggle = $('#equation-btn'),
    equationEditor = $('#ee-wrapper'),
    eeTabs = $('.ee-tabs li'),
    eeCloseBtn = $('#ee-btn-close'),
    eeFocused = $('.ee-focus'),
    textboxPosition;

  equationEditor.removeClass('hidden');
  eeToggle.addClass('active');

  enableUI();
  turnOffTTS();
  state['tts'] = 'off';
  sendMessage('tts,off');
  eeTabs.attr('tabindex', 0);
  eeCloseBtn.attr('tabindex', 0);
  if (eeFocused.length) {
    //If a text field has focus
    textboxPosition = eeFocused.position();
    contentArea.animate(
      {
        scrollTop: textboxPosition.top,
      },
      300
    );

    enableEquationEditor(eeFocused);
    eeFocused.focus();
  }
  if (typeof MoreBtnController == 'function') {
    MoreBtnController(300);
  } else {
    // console.warn('Missing scroll-indicator.js.');
  }
}

function turnOffEE() {
  var equationEditor = $('#ee-wrapper'),
    eeTabs = $('.ee-tabs li'),
    eeToggle = $('#equation-btn'),
    eeCloseBtn = $('#ee-btn-close'),
    textFields = $('input[type=text], textarea');

  equationEditor.addClass('hidden');
  eeToggle.removeClass('active');
  eeTabs.attr('tabindex', -1);
  eeCloseBtn.attr('tabindex', -1);
  disableEquationEditor($('#equation-btn'));
  textFields.removeClass('ee-active').removeClass('ee-focus');
  if (typeof MoreBtnController == 'function') {
    MoreBtnController(300);
  } else {
    // console.warn('Missing scroll-indicator.js.');
  }
}

//Enable the equation editor
function enableEquationEditor(target) {
  var equationEditor = $('#ee-wrapper'),
    eeSymbolBtns = $('.ee-btnarea .ee-btn'),
    numericSymbolBtns = $('.ee-numeric-btn');

  if (!equationEditor.hasClass('hidden')) {
    disableEquationEditor(target);
    target.addClass('ee-active').addClass('ee-focus');

    if (target.is('.numeric-entry')) {
      numericSymbolBtns.removeAttr('disabled');
    } else {
      eeSymbolBtns.removeAttr('disabled');
    }
  } else {
    target.addClass('ee-focus');
  }
}

//Disable the equation editor
function disableEquationEditor(target) {
  var eeTabs = $('.ee-tabs li'),
    eeBtnArea = $('.ee-btnarea'),
    eeSymbolBtns = eeBtnArea.find('.ee-btn'),
    textFields = $('input[type=text], textarea');

  if (target.is('.numeric-entry')) {
    eeTabs.removeClass('selected');
    eeTabs.first().addClass('selected');
    eeBtnArea.hide();
    eeBtnArea.first().show();
  }

  eeSymbolBtns.attr('disabled', true);
  textFields.removeClass('ee-active').removeClass('ee-focus');
}

//Turn on calculator
function turnOnCalc() {
  $('#calc-btn').addClass('active');
}

//Turn off calculator
function turnOffCalc() {
  $('#calc-btn').removeClass('active');
}

//Open eReader panel
function openEreaderPanel() {
  if ($('#QuestionsPanel').length) {
    $('#QuestionsButton').addClass('panel-down');
    $('#QuestionsPanel').removeClass('hidden');
    $('#QuestionsButton-label').html('Hide<br>Questions');
    $('#mask').removeClass('hidden');
  }
}

//Close eReader panel
function closeEreaderPanel() {
  if ($('#QuestionsPanel').length) {
    $('#QuestionsButton').removeClass('panel-down');
    $('#QuestionsPanel').addClass('hidden');
    $('#QuestionsButton-label').html('Show<br>Questions');
    $('#mask').addClass('hidden');
    $('#back-btn, #next-btn').attr('disabled', true);
  }
}

// Sticky hover fix from http://www.javascriptkit.com/dhtmltutors/sticky-hover-issue-solutions.shtml
(function () {
  var isTouch = false; //var to indicate current input type (is touch versus no touch)
  var isTouchTimer;
  var curRootClass = ''; //var indicating current document root class ("can-touch" or "")

  function addtouchclass(e) {
    clearTimeout(isTouchTimer);
    isTouch = true;
    if (curRootClass != 'can-touch') {
      //add "can-touch' class if it's not already present
      curRootClass = 'can-touch';
      document.documentElement.classList.add(curRootClass);
    }
    isTouchTimer = setTimeout(function () {
      isTouch = false;
    }, 500); //maintain "istouch" state for 500ms so removetouchclass doesn't get fired immediately following a touch event
  }

  function removetouchclass(e) {
    if (!isTouch && curRootClass == 'can-touch') {
      //remove 'can-touch' class if not triggered by a touch event and class is present
      isTouch = false;
      curRootClass = '';
      document.documentElement.classList.remove('can-touch');
    }
  }

  document.addEventListener('touchstart', addtouchclass, false); //this event only gets called when input type is touch
  document.addEventListener('mouseover', removetouchclass, false); //this event gets called when input type is everything from touch to mouse/ trackpad
})();

// Set focus ring to only trigger on tab, not click
(function () {
  var focusableEls =
    'input[type=range], input[type=checkbox], .ui-slider-handle, .point, .line, .asymptote, .nl-point, .nl-segment, .handle-size, .bw-actual, .dl-section, .ft-source';

  $(document).on('keyup', focusableEls, function (e) {
    var target = $(this),
      code = e.keyCode ? e.keyCode : e.which;

    if (target.is(':focus')) {
      switch (code) {
        case 9: //tabcase
        case 37: //Left arrow
        case 38: //Up arrow
        case 39: //Right arrow
        case 40: //Down arrow
          target.addClass('focus-tabbed');
          break;
      }
    }
  });

  $(document).on('blur mousedown', focusableEls, function (e) {
    $(this).removeClass('focus-tabbed');
  });
})();
