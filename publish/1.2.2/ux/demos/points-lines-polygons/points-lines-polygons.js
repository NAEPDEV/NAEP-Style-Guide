function togglePoint(target) {
  var parent = target.parents('.response-area');

  if (parent.hasClass('delete-mode')) {
    target.removeClass('point-placed').addClass('point-unplaced');
    return;
  }

  if (target.hasClass('point-unplaced')) {
    target.removeClass('point-unplaced').addClass('point-placed');
  } else if (target.hasClass('point-placed') && target.hasClass('point-modal')) {
    target.removeClass('point-new-state');
    return;
  } else if (target.hasClass('point-placeable') && target.hasClass('point-new-state')) {
    return;
  } else if (target.hasClass('point-placeable') && target.hasClass('point-placed')) {
    target.removeClass('point-placed').addClass('point-unplaced');
  }
  target.siblings('point').removeClass('point-latest');
  target.addClass('point-new-state point-latest');
}

$('.point-placeable, .point-modal').click(function() {
  target = $(this);
  togglePoint(target);
});

$('.point-placeable, .point-modal').keydown(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which),
    target = $(this),
    targetIndex = $('.point').index(this),
    container = target.parents('.response-area-number-line'),
    btnUndo = container.find('.btn').eq(0),
    parent = target.parents('.number-line'),
    points = parent.find('.point'),
    prev = points.eq(targetIndex - 1),
    next = points.eq(targetIndex + 1),
    first = points.first(),
    last = points.last();

  switch (code) {
    case 9: //Tab
      target.removeClass('active');
      break;
    case 13: //Enter
    case 32: //Space
      e.preventDefault();
      if (target.hasClass('point-placed') && target.hasClass('point-modal')) {
        target.siblings('.point').removeClass('active');
        target.toggleClass('active');
      }
      togglePoint(target);
      break;
    case 37: //Left arrow
    case 38: //Up arrow
      if (parent.length) {
        e.preventDefault();
        prev.focus();
      }
      break;
    case 39: //Right arrow
    case 40: //Down arrow
      if (parent.length && target.is(last)) {
        e.preventDefault();
        first.focus();
      } else if (parent.length && !target.is(last)) {
        e.preventDefault();
        next.focus();
      }
      break;
  }
});

//When a point is on a number line, this allows Tab and Shift Tab to skip other points
$('.number-line .point-placeable').focus(function() {
  $(this).siblings('.point-placeable').attr('tabindex', -1);
});

$('.point-placeable, .point-modal').mouseleave(function() {
  $(this).removeClass('point-new-state');
});

$('.point-placeable, point-modal').blur(function() {
  $(this).removeClass('point-new-state');
  $('.point').removeAttr('tabindex'); // When a point is on a number line, this allows points to be focusable when returning to the number line
});

// Delete button functionality
$('.btn-point-delete').click(function() {
  $(this).parents('.response-area').toggleClass('delete-mode');
});

$('.btn-point-delete').keydown(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which),
    target = $(this),
    parent = target.parents('.response-area'),
    points = parent.find('.point'),
    //count = Math.round(points.length / 2) - 1,
    deleteClass = 'delete-mode';

  switch (code) {
    case 13: //Enter
    case 32: //Space
      e.preventDefault();
      parent.toggleClass(deleteClass);
      if (parent.hasClass(deleteClass)) {
        points.eq(0).addClass('focus-tabbed').focus();
      }
      break;
    }
});

$(document).keydown(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which);

  switch (code) {
    case 27:
      $('.response-area').removeClass('delete-mode');
  }

});
