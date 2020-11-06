//Help controller
$('#help-btn').click(function() {
  if (state['help'] == 'on') {
    updateState('help', 'off');
  } else {
    updateState('help', 'on');
  }
});


//Theme controller
$('#theme-btn').click(function() {
  if (state['theme'] == 'default') {
    updateState('theme', 'beige');
  } else if (state['theme'] == 'beige') {
    updateState('theme', 'dark');
  } else if (state['theme'] == 'dark') {
    updateState('theme', 'default');
  }
});


//Zoom controller
$('#zoom-out-btn').click(function() {
  zoomState = state['zoom'];
  zoomState--;
  updateState('zoom', zoomState);

  if (zoomState == 0) {
    $('#zoom-in-btn').focus();
  }
});


$('#zoom-in-btn').click(function() {
  zoomState = state['zoom'];
  zoomState++;
  updateState('zoom', zoomState);

  if (zoomState == 3) {
    $('#zoom-out-btn').focus();
  }
});


//Change Language controller
$('#change-lang-btn, #change-lang-btn2').click(function() {
  if (state['lang'] == 'eng') {
    updateState('lang', 'esp');
  } else if (state['lang'] == 'esp') {
    updateState('lang', 'eng');
  }
});


//Text-to-speech controller
$('#read-aloud-btn').click(function() {
  if (state['tts'] == 'on') {
    updateState('tts', 'off');
  } else {
    updateState('tts', 'on');
  }
});


//Scratchwork controller
$('#scratchwork-btn').click(function() {
  if (state['sw'] == 'on') {
    updateState('sw', 'off');
  } else {
    updateState('sw', 'on');
  }
});

//Scratchwork mode controller
$('#pencil-btn').click(function() {
  updateState('sw-mode', 'pencil');
});
$('#highlighter-btn').click(function() {
  updateState('sw-mode', 'highlighter');
});
$('#eraser-btn').click(function() {
  updateState('sw-mode', 'eraser');
});


//Equation Editor controller
$('#equation-btn, #ee-btn-close').click(function() {
  if (state['ee'] == 'on') {
    updateState('ee', 'off');
  } else {
    updateState('ee', 'on');
  }
  $('#equation-btn').focus();
});


//Calculator controller
$('#calc-btn').click(function() {
  if (state['calc'] == 'on') {
    updateState('calc', 'off');
  } else {
    updateState('calc', 'on');
  }
});


//Timer controller
$("#timer-btn").click(function() {
  if (state['timer'] == 'on') {
    updateState('timer', 'off');
  } else {
    updateState('timer', 'on');
  }
});
