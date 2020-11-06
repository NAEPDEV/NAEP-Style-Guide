function scratchwork(id, action) {
  var canvas;

  if (action == 'initialize') {
    canvas = new fabric.Canvas(id, {
      isDrawingMode: true
    });

    canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);

    canvas.freeDrawingCursor = 'url("../scratchwork/Cur_Draw_Scratch.cur") 20 20, auto';
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = '#AD0000';
      canvas.freeDrawingBrush.width = 2;
    }
  }

  if (action == 'pencil') {}

  if (action == 'highlighter') {}

  if (action == 'erase') {}

  $('#pencil-btn, #scratchwork-btn').click(function() {
    canvas.freeDrawingCursor = 'url("../scratchwork/Cur_Draw_Scratch.cur") 20 20, auto';
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = '#AD0000';
      canvas.freeDrawingBrush.width = 2;
    }
  });

  $('#highlighter-btn').click(function() {
    canvas.freeDrawingCursor = 'url("../scratchwork/Cur_Highlighter_Scratch.cur") 15 20, auto';
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = 'rgba(255,266,0,0.3)';
      canvas.freeDrawingBrush.width = 24;
    }
  });

  $('#clearSW-btn').click(function() {
    canvas.clear();
  });

}
