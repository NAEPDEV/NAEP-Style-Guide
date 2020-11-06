var nmleft, nmtop;

function openDialog(e, trigger, f, g, h) {

  var arr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
    fLength,
    FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex=0], *[contenteditable]',
    tabIndexedEls = $('#contentarea [tabindex]'),
    tabIndices = getTabIndices(tabIndexedEls),
    selector = arr[f - 1],
    target;

  updateState('dialog', 'open');
  trigger.addClass('dialog-originator');

  switch (e) {
    case "maxSelection":
      target = $('#modal-max-selection');
      target.find('span').html(selector);
      break;
    case "nextSection":
      target = $('#modal-next-section');
      break;
    case "timeOut":
      target = $('#modal-time-out');
      break;
    case "itemError":
      target = $('#modal-item-error');
      break;
    case "nextSectionSBT":
      target = $('#modal-next-section-SBT');
      break;
    case "endOfAssessment":
      target = $('#modal-end-assessment');
      break;
    case "SqIncomplete":
      target = $('#modal-sq-incomplete');
      break;
    case "SqInvalidZip":
      target = $('#modal-sq-invalid-zip');
      break;
    case "SbtSubmit":
      target = $('#modal-sbt-submit');
      break;
    case "nonModal":
      target = $('#non-modal');
      break;
    case "neValidation":
      target = $('#modal-ne-validation');
      break;
    case "validation":
      target = $('#modal-validation');
      validation(f, g, h);
      break;
    default:
      return false;
  }

  target.removeClass('hidden');

  //Close dialog and restore focus to invoking element
  target.find('.close-dialog').click(function() {
    closeDialog(target);
    reFocusEls(tabIndexedEls, tabIndices);
  });

  // Focus the first element within the dialog.
  target.find(FOCUSABLE_SELECTORS).first().focus();

  //Set position of non-modal dialogs; trap keyboard focus in modal dialogs
  if (target.is($('#non-modal'))) {
    target.find('.dialog-content').css({
      "left": nmleft + "px",
      "top": nmtop + "px"
    });
  } else {
    $('#contentarea').find(FOCUSABLE_SELECTORS).attr('tabindex', -1);
  }
}

function getTabIndices(tabIndexedEls) {
  var els = [];

  tabIndexedEls.each(function(idx) {
    els[idx] =  $(this).attr('tabindex');
  });
  return els;
}

function reFocusEls(els, indices) {
  var FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex=0], *[contenteditable]';

  $('#contentarea').find(FOCUSABLE_SELECTORS).removeAttr('tabindex');
  els.each(function(idx) {
    $(this).attr('tabindex', indices[idx]);
  });
}


//Determine appropriate validation message based on passed parameters
function validation(f, g, h) {
  var target = $('#modal-validation');
  if ($('.dialog-originator').hasClass('extendedtext') || $('.dialog-originator').is('#wri-editor-actual') || $('.dialog-originator').is('.btn-max-character')) {
    target.find('p').html('You have reached the maximum amount you can type.<br /><br /> To type something else, you must remove some of what you already typed.');
  } else if ($.isNumeric(f) && $.isNumeric(g)) {
    target.find('p').html('You can only enter a number between <span></span> and <span></span>.');
    target.find('span').first().html(f);
    target.find('span').last().html(g);
  } else if ($.isNumeric(f) && !$.isNumeric(g)) {
    fLength = f.toString().length;
    if (fLength < h) {
      target.find('p').html('You can only enter <span></span> numbers.');
      target.find('span').first().html(h);
    } else {
      target.find('p').html('You can only enter a number that is <span></span> or more.');
      target.find('span').first().html(f);
    }
  } else if (!$.isNumeric(f) && $.isNumeric(g)) {
    target.find('p').html('You can only enter a number that is <span></span> or less.');
    target.find('span').first().html(g);
  } else if (!$.isNumeric(f) && !$.isNumeric(g) && $('.dialog-originator').hasClass('fib')) {
    target.find('p').html('You have reached the maximum amount you can type.<br /><br /> To type something else, you must remove some of what you already typed.');
  } else if (!$.isNumeric(f) && !$.isNumeric(g) && $.isNumeric(h)) {
    target.find('p').html('You can only enter <span></span> numbers.');
    target.find('span').first().html(h);
  } else if (!$.isNumeric(f) && !$.isNumeric(g) && !$.isNumeric(h)) {
    target.find('p').html('You can only enter numbers.');
  }
}


//Close dialog and restore default state to originator and system tools
function closeDialog(target) {
  //Turn off TTS
  enableUI();
  turnOffTTS();
  state['tts'] = 'off';

  target.addClass('hidden');
  $('.dialog-originator').focus();
  $('.dialog-originator').removeClass('dialog-originator');
  updateState('dialog', 'closed');

  if (target.is($('#non-modal'))) {
    var nmcontent = target.find('.dialog-content'),
      nmMarginLeft = parseInt(nmcontent.css('margin-left')),
      nmMarginTop = parseInt(nmcontent.css('margin-top')),
      originator = $('.btn-non-modal'),
      orleft = originator.offset().left,
      ortop = originator.offset().top;

    nmleft = nmcontent.offset().left - nmMarginLeft;
    nmtop = nmcontent.offset().top - nmMarginTop;
    nmcontent.css({
      "left": orleft + "px",
      "top": ortop + "px"
    });
  }
}


// Make non-modal dialogs draggable (requires jQuery UI)
$(function() {
  var draggable = $(".non-modal .dialog-content");
  if (!draggable.length) {
    return;
  }
  draggable.draggable({
    containment: ".dialog"
  });
});


//Close non-modal dialog via Escape
$(document).keydown(function(e) {
  var target = $('.non-modal');
  if (e.which === 27 && !target.hasClass('hidden')) {
    closeDialog(target);
  }
});

//Non-modal dialog button controller
if ($('.non-modal').length) {
  var counter = 0,
    backdrop = $('.dialog'),
    bdheight = backdrop.outerHeight() / 2,
    bdwidth = backdrop.outerWidth() / 2,
    nmcontent = $('.non-modal').find('.dialog-content'),
    nmheight = nmcontent.outerHeight(true) / 2,
    nmwidth = nmcontent.outerWidth(true) / 2,
    originator = $('.btn-non-modal'),
    orleft = originator.offset().left,
    ortop = originator.offset().top;

  //Get position of non-modal originator and set iniital position of non-modal to match
  nmcontent.css({
    "left": orleft + "px",
    "top": ortop + "px"
  });

  $(".btn-non-modal").click(function(e) {
    //First time button is selected, position non-modal in center of parent
    if (counter === 0) {
      openDialog('nonModal', $(this));
      nmcontent.css({
        "left": bdwidth - nmwidth + "px",
        "top": bdheight - nmheight + "px"
      });
      counter++;
    }
    //Afer first button selection, non-modal position is handled by openDialog and closeDialog functions
    else {
      if ($('#non-modal').hasClass('hidden')) {
        openDialog('nonModal', $(this));
      } else {
        closeDialog($('#non-modal'));
      }
    }
  });
}


//Open next section dialog when Next Section button is selected
$(".btn-next-section").click(function(e) {
  openDialog('nextSection', $(this));
});
