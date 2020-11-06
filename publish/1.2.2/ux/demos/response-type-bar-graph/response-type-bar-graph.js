$('.handle-size').hover(function() {
  $(this).prev('.bg-bar').toggleClass('hover');
})

$('.handle-size').mousedown(function() {
  $(this).prev('.bg-bar').addClass('active');
})

$(document).mouseup(function() {
  $('.bg-bar').removeClass('active');
})

$('.handle-size').on('touchstart', function() {
  $(this).prev('.bg-bar').addClass('active');
});

$(document).on('touchend', function() {
  $('.bg-bar').removeClass('active');
})



$(document).on('keyup', '.handle-size', function(e) {
  var code = (e.keyCode ? e.keyCode : e.which),
    target = $(this),
    sibBar = target.prev('.bg-bar');

  if (target.is(":focus")) {
    switch (code) {
      case 9: //Tab
        sibBar.addClass('active');
        break;
    }
  }
});

$(document).on('blur', '.handle-size', function(e) {
  $(this).prev('.bg-bar').removeClass('active');
});



//Keyboard trigger
$('.handle-size').keydown(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which),
    target = $(this),
    sibBar = target.prev('.bg-bar');

  switch (code) {
    case 38: //Up arrow
    case 40: //Down arrow
      e.preventDefault();
      target.addClass('active');
      sibBar.addClass('active');
      break;
  }
});

//Keyboard trigger
$('.handle-size').keyup(function() {
    $(this).removeClass('active');
});

$('.handle-size').click(function() {
  $(this).removeClass('active');
});
