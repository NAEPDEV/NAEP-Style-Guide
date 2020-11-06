function navButtonController(idx) {
  var count = $('.step-indicator input').length - 1,
    current = $('.step-indicator input').eq(idx),
    sibs = current.siblings('.step-indicator input');

  if (idx < 1) {
    updateState('nav', 'start');
  } else if (idx >= 1 && idx < count) {
    updateState('nav', 'middle');
  } else if (idx >= count) {
    updateState('nav', 'end');
  }

  current.removeClass('step-indicator-complete');

  sibs.each(function() {
    if (sibs.index(this) >= idx) {
      $(this).removeClass('step-indicator-complete');
    } else if (sibs.index(this) < idx) {
      $(this).addClass('step-indicator-complete');
    }
  });

  //Turn off TTS if on
  updateState('tts', 'off');

}

$('#back-btn').click(function() {
  var active = $('.step-indicator input:checked'),
    idx = $('.step-indicator input').index(active) - 1;

  $('.step-indicator input').eq(idx).prop('checked', true);
  navButtonController(idx);
});

$('#next-btn').click(function() {
  var active = $('.step-indicator input:checked'),
    idx = $('.step-indicator input').index(active) + 1;

  $('.step-indicator input').eq(idx).prop('checked', true);
  navButtonController(idx);
});

$('.step-indicator input').click(function() {
  var active = $(this),
    idx = $('.step-indicator input').index(active);

  navButtonController(idx);
  active.focus();
});
