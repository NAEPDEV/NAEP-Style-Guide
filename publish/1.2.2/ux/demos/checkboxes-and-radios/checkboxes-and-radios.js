$('.control input').keydown(function(e) {
  var code = (e.keyCode ? e.keyCode : e.which),
    target = $(this);

  switch (code) {
    case 13: //Enter
      e.preventDefault();
      target.trigger('click');
      break;
  }
});
