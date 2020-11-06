$(".char-text-bare .char-portrait img").hover(function(e) {
  $(this).parents('.char-portrait').siblings('.btn').toggleClass('hover');
});

$(".char-text-bare .char-portrait img").mousedown(function(e) {
  $(this).parents('.char-portrait').siblings('.btn').addClass('active');
});

$(".char-text-bare .char-portrait img").mouseup(function(e) {
  $(this).parents('.char-portrait').siblings('.btn').removeClass('active');
});

$(".char-text-bare .char-portrait img").click(function(e) {
  $(this).parents('.char-portrait').siblings('.btn').focus();
  $(this).parents('.char-wrapper').toggleClass('char-vo-play');
});

$(".btn-char-vo").hover(function(e) {
  $(this).siblings('.char-portrait').find('img').toggleClass('hover');
});

$(".btn-char-vo").click(function(e) {
  $(this).parents('.char-wrapper').toggleClass('char-vo-play');
});
