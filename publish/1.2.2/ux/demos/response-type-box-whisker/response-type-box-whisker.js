$('.bw-box, .bw-whisker').hover(function() {
  $(this).siblings('.bw-box, .bw-whisker').toggleClass('hover');
});

$('.bw-box, .bw-whisker').mousedown(function() {
  $(this).siblings('.bw-box, .bw-whisker').addClass('active');
});

$(document).mouseup(function() {
  $('.bw-whisker, .bw-box').removeClass('active');
});

$('.bw-box, .bw-whisker').on('touchstart', function() {
  $(this).siblings('.bw-box, .bw-whisker').addClass('active');
});

$(document).on('touchend', function() {
  $('.bw-whisker, .bw-box').removeClass('active hover');
})
