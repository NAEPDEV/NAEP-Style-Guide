function toggleZoomPreview(target) {
  var container = target.parents('.response-area'),
    parentWindow = target.closest('.nl-zoom-span'),
    siblings = parentWindow.siblings('.nl-zoom-span'),
    zoomWindows = container.find('.nl-zoom-span'),
    zoomView = container.find('.nl-zoom-view'),
    activeClass = 'active';

  if (target.is('.nl-zoom-preview') || target.is('.nl-zoom-span')) {
    siblings.removeClass(activeClass);
  } else {
    zoomWindows.removeClass(activeClass);
  }

  if (target.is('.nl-zoom-span:first-of-type')) {
    parentWindow.addClass(activeClass);
  } else {
    parentWindow.toggleClass(activeClass);
  }

  if (zoomWindows.hasClass(activeClass)) {
    zoomView.addClass(activeClass);
  } else {
    zoomView.removeClass(activeClass);
  }
}

$('.nl-zoom-preview').click(function() {
  var target = $(this);
  toggleZoomPreview(target);
});

$('.nl-zoom-span, .btn-undo').keyup(function(e) {
  var target = $(this),
    code = (e.keyCode ? e.keyCode : e.which);

  if (target.is(":focus") && code == 9) {
    toggleZoomPreview(target);
  }
});
