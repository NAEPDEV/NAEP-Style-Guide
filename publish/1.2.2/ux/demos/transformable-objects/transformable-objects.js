$(function() {
	$('.obj-translatable').draggable({
    containment: "parent",
		grid: [ 24, 24 ]
  });

	$('.obj-resizable').resizable({
		classes: {
			"ui-resizable-handle": "handle-size-multi"
		},
		containment: "parent",
		grid: 24,
		handles: "n, e, s, w, ne, se, sw, nw",
		minHeight: 72,
		minWidth: 120
	});

	$('.obj-rotatable').rotatable();
});

//Keyboard trigger
$('.handle-size').keydown(function(e){
  var code = (e.keyCode ? e.keyCode : e.which);

	switch (code) {
    case 38: //Up arrow
		case 37: //Left arrow
		case 39: //Right arrow
		case 40: //Down arrow
      e.preventDefault();
      $(this).addClass('active');
      break;
  }
});

$('.handle-size').keyup(function() {
  $(this).removeClass('active');
});
