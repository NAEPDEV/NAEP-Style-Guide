(function initializeSIS() {
  var responseAreas = $('.sis-response-area'),
    mediaSelections = $('.sis-media-selection');

  responseAreas.each(function() {
    setSIScolumns($(this));
    setPlaceholders($(this));
  });

  mediaSelections.each(function() {
    placeMediaSelections($(this));
  });

  addSISUniqueIDs();
})();

//Add unique IDs to all SIS selections on initialization
function addSISUniqueIDs() {
  var counter = 1,
    ref = $('.sis-selection');

  ref.each(function() {
    $(this).attr('id', 'sis-selection-' + counter);
    counter++;
  });
};

//Sets number of columns on initialization
function setSIScolumns(target) {
  var columns = target.data('columns');
  if (columns > 0) {
    target.addClass('sis-col-' + columns);
  }
}

//Applies placeholders on initialization based on min-select parameter
function setPlaceholders(target) {
  var placeholders = target.data('placeholders'),
    minSelections = target.data('minSelections');

  if (placeholders == true) {
    target.removeClass('sis-no-placeholders')
    for (var i = 0, len = minSelections; i < len; i++) {
      target.append('<div class="sis-selection-placeholder"></div>');
    }
  }
}

//Determines position and width of media selections
function placeMediaSelections(target) {
  var i = setInterval(function() {
    var media = target.parents('.media-container').find('.media');

    if (media.get(0).readyState > 0) {
      var startTime = target.data('startTime'),
        endTime = target.data('endTime'),
        mediaTotalTime = parseInt(media.get(0).duration) * 1000,
        leftPos = startTime / mediaTotalTime * 100,
        rightPos = endTime / mediaTotalTime * 100,
        width = rightPos - leftPos;

      target.css({
        'left': leftPos + '%',
        'width': 'calc(' + width + '% - 2px)'
      });
      clearInterval(i);
    }
  }, 200);
}

//Determines whether to add a See More button to text selections based on their height
function evalSeeMore(newSelection) {
  var seeMoreBtn = document.createElement('button');

  if (newSelection.clientHeight >= 260) {
    newSelection.classList.add('sis-text-overflow');
    seeMoreBtn.className = 'btn-see-more';
    newSelection.append(seeMoreBtn);
  }
}

//Modify new selections as needed based on media type
function modByMedia(target, newSelection) {
  var textClass = 'sis-text-selection',
    mediaClass = 'sis-media-selection',
    targetTitle = target.attr('title'),
    targetContent = target.html(),
    targetId = target.attr('id'),
    targetIdNum = targetId.replace("sis-selection", ""),
    numStimuli = $('.childItem.selected').find('.childStim').length,
    parentTitle = target.parents('.childStim').data('title'),
    media,
    mediaSrc;

  if (target.hasClass(textClass)) {
    newSelection.className = 'sis-selection-container sis-text';
    if (numStimuli > 1) {
      newSelection.innerHTML = '<div class="sis-selection-header"><p>' + parentTitle + '</p></div><p>' + targetContent + '</p><button class="btn-close"></button>';
    } else {
      newSelection.innerHTML = '<p><button class="btn-close"></button>' + targetContent + '</p>';
    }
  } else if (target.hasClass(mediaClass)) {
    media = target.parents('.media-container').find('.media');
    mediaSrc = media.data('source');
    newSelection.className = 'sis-selection-container sis-media';
    if (numStimuli > 1) {
      newSelection.innerHTML = '<div class="sis-selection-header"><p class="sis-selection-label">' + targetTitle + '</p><p>' + parentTitle + '</p></div><button class="btn-close"></button>';
    } else {
      newSelection.innerHTML = '<div class="sis-selection-header"><p class="sis-selection-label">' + targetTitle + '</p></div><button class="btn-close"></button>';
    }
    var mediaContainer = document.createElement('figure');
    mediaContainer.className = 'media-container';
    mediaContainer.innerHTML = '<div class="media-wrapper"><video class="media" controls preload="metadata"><source src="' + mediaSrc + targetIdNum + '.mp4" type="video/mp4"><track src="../multimedia-controls/countdown_en.vtt" kind="subtitles" srclang="en" label="English"></video><button class="video-hero-play media-btn" aria-label="Play/Pause" tabindex="-1"></button><div class="video-custom-track-wrapper hidden"><span class="video-custom-track hidden"></span></div></div><div class="media-controls"><button type="button" class="media-btn icon-play media-btn-playpause" aria-label="Play/Pause"></button><span class="media-tooltip media-btn-playpause-tooltip">Play</span><span class="media-time-display"><span class="media-time-current">0:00</span><span>/</span><span class="media-time-duration">0:00</span></span><div class="media-progress-container-outer"><div class="slider-container media-progress-container"><div class="media-hover hidden"></div><progress class="media-progress" value="0"></progress><input type="range" class="media-seek" min="0" value="0" /></div><div class="media-tooltip media-tooltip-seek hidden">0:00</div></div><button type="button" class="media-btn icon-volume-up media-btn-mute"></button><div class="slider-container media-volume-container"><progress class="media-volume-progress" value="1" max="1"></progress><input type="range" class="media-volume" min="0" max="1" step="0.05" value="1" /></div><button type="button" class="media-btn icon-cc-off video-btn-cc" style="display: none;"></button><button type="button" class="media-btn icon-fullscreen video-btn-fs"></button><span class="media-tooltip media-btn-mute-tooltip">Mute</span><span class="media-tooltip video-btn-cc-tooltip">Closed&#160;captions</span><span class="media-tooltip video-btn-fs-tooltip">Full&#160;screen</span></div>';
    newSelection.append(mediaContainer);
    initializeMediaControls(mediaContainer);
  }
}


//Add selections to response area
function addSISselection(target) {
  var responseArea = $('.childItem.selected').find('.sis-response-area'),
    showPlaceholders = responseArea.data('placeholders'),
    placeholderText = responseArea.children("p"),
    placeholders = responseArea.children('.sis-selection-placeholder'),
    columns = responseArea.data('columns'),
    targetId = target.attr('id'),
    textClass = 'sis-text-selection',
    newSelection = document.createElement('div');

  placeholderText.remove();
  newSelection.id = targetId + '-selected';

  if (showPlaceholders == true) {
    modByMedia(target, newSelection);
    if (placeholders.length) {
      $(newSelection).insertAfter(placeholders.first());
      placeholders.first().remove();
    } else {
      responseArea.append(newSelection);
    }
  } else if (showPlaceholders == false) {
    modByMedia(target, newSelection);
    responseArea.prepend(newSelection);
  }

  //If there's more than one column and the selection is text-based, check if it needs a See More button
  if (columns > 1 && target.hasClass(textClass)) {
    evalSeeMore(newSelection);
  }
}

//Remove selections from response area
function removeSISselection(e, context) {
  var responseArea = $('.childItem.selected').find('.sis-response-area'),
    showPlaceholders = responseArea.data('placeholders'),
    selection,
    sourceId,
    targetId;

  if (context == "stim") {
    sourceId = e.closest('.sis-selection').attr('id');
    targetId = sourceId + "-selected";
  } else if (context == "task") {
    targetId = e.closest('.sis-selection-container').attr('id');
    sourceId = targetId.replace("-selected", "");
    $('#' + sourceId).removeClass('selected');
  }

  selection = responseArea.children('#' + targetId);
  selection.addClass('fadeout');

  setTimeout(function() {
    selection.remove();

    if (showPlaceholders == true) {
      responseArea.append('<div class="sis-selection-placeholder"></div>');
    }

    if (responseArea.children('.sis-selection-container').length < 1) {
      responseArea.prepend('<p>Your choices will appear here.</p>');
    }

    if (selection.hasClass('sis-text')) {
      $('.sis-selection').first().focus();
    } else {
      $('.sis-media-btn-primary').first().focus();
    }
  }, 300);
}

//Selection and deselection controller
function SISselectionController(target) {
  var context,
    selections = $('.sis-selection'),
    selection = target.closest('.sis-selection.active'),
    item = $('.childItem.selected'),
    responseArea = item.find('.sis-response-area'),
    selectionContainers = item.find('.sis-selection-container'),
    currentSelections = selectionContainers.length,
    maxSelections = responseArea.data('maxSelections'),
    minSelections = responseArea.data('minSelections') - 1,
    selectionUnitSingular = responseArea.data('selectionUnitSingular'),
    selectionUnitPlural = responseArea.data('selectionUnitPlural'),
    selectedClass = 'selected';

  if (selection.hasClass(selectedClass)) {
    selection.removeClass(selectedClass);
    context = "stim";
    removeSISselection(target, context);
    if (typeof answerItem == 'function') {
      deAnswerItem(selectionContainers);
    } else {
      console.warn('Missing tabs.js.');
    }
  } else {
    if (responseArea.hasClass('sis-single-select')) {
      selections.removeClass(selectedClass);
      selectionContainers.remove();
      selection.addClass(selectedClass);
      addSISselection(target);
      if (typeof answerItem == 'function') {
        return answerItem(selectionContainers);
      } else {
        console.warn('Missing tabs.js.');
      }
    } else if (responseArea.hasClass('sis-multiple-select')) {
      //Show max-selections alert if user attempts to make more selections than allowed
      if (currentSelections < maxSelections) {
        selection.addClass(selectedClass);
        addSISselection(target);
      } else if (currentSelections >= maxSelections) {
        if (selection.hasClass('sis-media-selection')) {
          selection.find('.sis-media-btn-primary').addClass('sis-selection-originator');
        } else {
          selection.addClass('sis-selection-originator');
        }
        MaxSelectAlert(maxSelections, selectionUnitSingular, selectionUnitPlural);
      }

      //Focus first close button when max selections have been made (Note this violates WCAG 3.2.5.)
      if (currentSelections == maxSelections - 1 ) {
        $('.btn-close').first().focus();
      }

      //Answer item if selections >= minimum
      if (typeof answerItem == 'function') {
        if (currentSelections >= minSelections) {
          answerItem(selectionContainers);
        } else {
          deAnswerItem(selectionContainers);
        }
      } else {
        console.warn('Missing tabs.js.');
      }
    }
  }
  MoreBtnController(300);
}

var fadeOut;

//Close Max-select Alert
function closeMaxSelectAlert() {
  $('.sis-alert').addClass('hidden');
  $('.sis-alert-close').attr('disabled', true);
  $('.sis-selection-originator').focus();
  $('.sis-selection-originator').removeClass('sis-selection-originator');
}

//Max-select Alert controller
function MaxSelectAlert(maxSelections, selectionUnitSingular, selectionUnitPlural) {
  var arr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],
    selector = arr[maxSelections - 1],
    alert = $('.sis-alert'),
    selOrigin = $('.sis-selection-originator'),
    alertCloseBtn = $('.sis-alert-close'),
    selOriginClass = 'sis-selection-originator',
    hiddenClass = 'hidden',
    transitionClass = 'opacity-transition',
    pulseClass = 'pulse';

  if (!alert.hasClass(hiddenClass)) {
    clearTimeout(fadeOut);
    fadeOut = setTimeout(function() {
      alert.addClass(transitionClass);
      closeMaxSelectAlert();
    }, 6000);
    alertCloseBtn.focus();
    alert.addClass(pulseClass);
    setTimeout(function() {
      alert.removeClass(pulseClass);
    }, 600);
  } else {
    alert.removeClass(transitionClass);
    alert.find('u').html(selector);
    alert.find('.sis-selection-unit-singular').html(selectionUnitSingular);
    alert.find('.sis-selection-unit-plural').html(selectionUnitPlural);
    alert.removeClass(hiddenClass);
    alertCloseBtn.removeAttr('disabled');
    alertCloseBtn.focus();
    fadeOut = setTimeout(function() {
      alert.addClass(transitionClass);
      closeMaxSelectAlert();
    }, 6000);
  }
}

var playFor;
//Play/pause clip when video selection widget play button is selected
function playVideoClip(target, startTime, endTime) {
  var mediaContainer = target.parents('.media-container'),
    media = mediaContainer.find('.media'),
    play = mediaContainer.find('.media-btn-playpause'),
    heroplay = mediaContainer.find('.video-hero-play'),
    tooltipPlay = mediaContainer.find('.media-btn-playpause-tooltip'),
    widgets = '.sis-media-selection',
    sibPlayBtns = mediaContainer.find('.sis-media-btn-play'),
    startTime = target.parents(widgets).data('startTime'),
    endTime = target.parents(widgets).data('endTime'),
    btnPlayClip = target.closest('.sis-media-btn-play'),
    playingClass = 'sis-media-playing',
    iconPlay = 'icon-play',
    iconPause = 'icon-pause',
    pausedClass = 'paused',
    stopVideoAfter = endTime - startTime;

  if (!btnPlayClip.hasClass(playingClass)) {
    media.get(0).currentTime = startTime / 1000;
    media.get(0).play();
    sibPlayBtns.removeClass(playingClass);
    btnPlayClip.addClass(playingClass);
    play.removeClass(iconPlay);
    play.addClass(iconPause);
    heroplay.addClass(pausedClass);
    tooltipPlay.html('Pause');
    clearTimeout(playFor);
    //Pause video once end of clip is reached
    playFor = setTimeout(function() {
      media.get(0).pause();
      target.removeClass(playingClass);
      play.removeClass(iconPause);
      play.addClass(iconPlay);
      heroplay.removeClass(pausedClass);
      tooltipPlay.html('Play');
    }, stopVideoAfter);
  } else {
    media.get(0).pause();
    btnPlayClip.removeClass(playingClass);
    play.removeClass(iconPause);
    play.addClass(iconPlay);
    heroplay.removeClass(pausedClass);
    tooltipPlay.html('Play');
    clearTimeout(playFor);
  }
}

//Run selection controller on text-selection click
$('.sis-text-selection').click(function(e) {
  var target = $(this);
  SISselectionController(target);
});

//Run selection controller on text-selection space/enter
$('.sis-text-selection').keypress(function(e) {
  var key = e.which;
  if (key == 13 || key == 32) { //Enter & Space
    e.preventDefault();
    var target = $(this);
    SISselectionController(target);
  }
});

//Handler for media selection widgets
$(document).click(function(e) {
  var widgets = '.sis-media-selection',
    btnMain = '.sis-media-btn-primary',
    btnSub = '.sis-media-btn-secondary',
    btnAdd = '.sis-media-btn-add',
    btnPlayClip = '.sis-media-btn-play',
    btnAddLabel = '.sis-media-btn-add span',
    btnPlayClipLabel = '.sis-media-btn-play span',
    mediaControls = '#mediaContainer *',
    mediaActiveClass = 'sis-media-active',
    mediaSelectedClass = 'selected',
    target = $(e.target),
    parent = target.parents(widgets);

  if (target.is(btnMain)) {
    parent.toggleClass(mediaActiveClass);
    if (parent.hasClass(mediaActiveClass)) {
      $(btnSub).attr('tabindex', -1);
      parent.siblings(widgets).removeClass(mediaActiveClass);
      target.siblings(btnSub).attr('tabindex', 0);
    } else {
      target.siblings(btnSub).attr('tabindex', -1);
    }
  } else if (target.is(btnPlayClip) || target.is(btnPlayClipLabel)) {
    playVideoClip(target);
  } else if (target.is(btnAdd) || target.is(btnAddLabel)) {
    SISselectionController(parent);
  } else if (target.is(mediaControls)) {
    return;
  } else {
    resetSISMedia(); //In ux/demos/shared/platform-utilities.js
  }
});

//Selected tile close button controller
$(document).on("click", ".sis-selection-container .btn-close", function() {
  var target = $(this),
    context = "task";

  removeSISselection(target, context);
  if (typeof answerItem == 'function') {
    deAnswerItem($('.childItem.selected').find('.sis-selection-container'));
  } else {
    console.warn('Missing tabs.js.');
  }
  MoreBtnController(300);
});

//Max-selection alert close button controller
$('.sis-alert-close').click(function(e) {
  $('.sis-alert').removeClass('pulse');
  closeMaxSelectAlert();
  clearTimeout(fadeOut);
});

//See-more button controller
$(document).on("click", ".btn-see-more", function() {
  $(this).closest('.sis-selection-container').toggleClass('expanded');
  MoreBtnController();
});
