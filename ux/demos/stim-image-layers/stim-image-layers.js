//Switch controller
$(".layer-switch input").change(function(e) {
  var buttonID, targetID;
  buttonID = $(this).attr('id');
  targetID = buttonID.replace("layer-btn-", "#layer-");
  $(targetID).toggleClass("hidden");
  $(this).toggleClass("active");
  $(this).parent().siblings('.layer-switch-label').toggleClass('active');
});

//Flip switch if label is selected
$(".layer-switch-label").click(function(e) {
  $(this).siblings('.layer-switch').children('input').click().focus();
});

//Keyboard navigation handler
$('.layer-switch input').keypress(function(e) {
  switch (e.which) {
    case 13: //Enter
      e.preventDefault();
      $(this).trigger('click');
      break;
  }
});
