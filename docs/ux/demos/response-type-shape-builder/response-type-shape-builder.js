$('.ft-center-point').mousedown(function() {
  $(this).siblings('.line').addClass('active');
});

$('.ft-center-point').on('touchstart', function() {
  $(this).siblings('.line').addClass('active');
});

$(document).mouseup(function() {
  $('.line').removeClass('active');
});

$(document).on('touchend', function() {
  $('.line').removeClass('active');
});
