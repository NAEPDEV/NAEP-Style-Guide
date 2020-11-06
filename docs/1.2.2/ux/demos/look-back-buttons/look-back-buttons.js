function contextNav(lbbID) {
  var bottom, $contexts, duration, fn, height, scrollContainer, scrollerMiddle, scrollerTop, top, windowPos;

  scrollContainer = $('.scroll').parent();
  $contexts = scrollContainer.find('.context-' + lbbID);
  if (!($contexts.length > 0)) {
    return;
  }

  $contexts.removeClass('context-active');

  top = $contexts.first().offset().top;
  scrollerTop = scrollContainer.scrollTop();
  scrollerMiddle = scrollContainer.innerHeight() / 2;
  bottom = $contexts.last().offset().top + $contexts.last().height();
  height = bottom - top;
  windowPos = scrollerTop + (top - (scrollContainer.innerHeight() / 2) + (height / 2));

  // Change duration based on target's distance from midline
  if (bottom < scrollerMiddle + 50 && bottom > scrollerMiddle - 50) {
    duration = 250;
  } else {
    duration = 1000;
  }

  // Animate scrolled panel so target is vertically centered
  scrollContainer.animate({
    scrollTop: windowPos
  }, duration, 'swing');

  setTimeout(function() {
    $contexts.addClass('context-active');
  }, duration + 750);

}

$(".btn-lbb").click(function(e) {
  var el = $(this).attr('id');
  contextNav(el);
});
