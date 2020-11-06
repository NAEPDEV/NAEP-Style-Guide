$('.asymptote-handle').mousedown(function() {
  $(this).siblings('.asymptote').addClass('active');
});

$('.asymptote').mousedown(function() {
  $(this).siblings('.asymptote-handle').addClass('active');
});

$(document).mouseup(function() {
  $('.asymptote').removeClass('active');
  $('.asymptote-handle').removeClass('active');
})

$('.asymptote-handle').on('touchstart', function() {
  $(this).siblings('.asymptote').addClass('active');
});

$('.asymptote').on('touchstart', function() {
  $(this).siblings('.asymptote-handle').addClass('active');
});

$(document).on('touchend', function() {
  $('.asymptote').removeClass('active');
  $('.asymptote-handle').removeClass('active');
})
