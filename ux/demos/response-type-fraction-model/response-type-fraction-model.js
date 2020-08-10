//Adds cells to grid models
function fmAddCells(loops, numCells, grid) {
  for (var i = 0, l = loops; i < l; i++) {
    var newCell = '<input type="checkbox" id="fm-unit-' + (numCells + i) + '" /><label for="fm-unit-' + (numCells + i) + '"></label>';
    grid.append(newCell);
  }
}

//Removes cells from grid models
function fmRemoveCells(loops, numCells, grid) {
  var cells = grid.find('input'),
    labels = grid.find('label');

  if (loops > 0) {
    numCells--;
    for (var i = 0, l = loops; i < l; i++) {
      var num = numCells - loops + i;
      labels.eq(num).remove();
      cells.eq(num).remove();
    }
  } else {
    grid.empty();
  }
}

//Creates cells in circular models
function fmCreateCells(loops, circle) {
  var deg = 360 / loops,
    offset = Math.floor(loops / 4),
    split = loops - offset;

  circle.empty();

  for (var i = 0; i < split; i++) {
    var newCell = '<input type="checkbox" id="fm-unit-' + i + '" /><label for="fm-unit-' + i + '" style="transform: rotate(-' + i * deg + 'deg);"></label>';
    circle.append(newCell);
  }

  circle.append('<div class="fm-wedge-container"></div>');

  for (var i = split; i < loops; i++) {
    var newCell = '<input type="checkbox" id="fm-unit-' + i + '" /><label for="fm-unit-' + i + '" style="transform: rotate(-' + i * deg + 'deg);"></label>';
    circle.find('.fm-wedge-container').append(newCell);
  }

  if (loops < 4) {
    circle.find('label').addClass('fm-wedge-' + loops + '');
  }

}

//Controls state of plus and minus buttons
function fmBtnStateController(container) {
  var model = container.find('.fm-model');

  if (model.hasClass('fm-grid')) {
    var colMinusBtn = container.find('.fm-increment-col .ic-btn-minus'),
      colPlusBtn = container.find('.fm-increment-col .ic-btn-plus'),
      rowMinusBtn = container.find('.fm-increment-row .ic-btn-minus'),
      rowPlusBtn = container.find('.fm-increment-row .ic-btn-plus'),
      modelCols = parseInt(model.attr('data-cols')),
      modelRows = parseInt(model.attr('data-rows')),
      modelMinCols = parseInt(model.attr('data-min-cols')),
      modelMinRows = parseInt(model.attr('data-min-rows')),
      modelMaxCols = parseInt(model.attr('data-max-cols')),
      modelMaxRows = parseInt(model.attr('data-max-rows'));

    if (modelCols <= modelMinCols) {
      colMinusBtn.attr('disabled', true);
    } else if (modelCols > modelMinCols) {
      colMinusBtn.removeAttr('disabled');
    }

    if (modelCols >= modelMaxCols) {
      colPlusBtn.attr('disabled', true);
    } else if (modelCols < modelMaxCols) {
      colPlusBtn.removeAttr('disabled');
    }

    if (modelRows <= modelMinRows) {
      rowMinusBtn.attr('disabled', true);
    } else if (modelRows > modelMinRows) {
      rowMinusBtn.removeAttr('disabled');
    }

    if (modelRows >= modelMaxRows) {
      rowPlusBtn.attr('disabled', true);
    } else if (modelRows < modelMaxRows) {
      rowPlusBtn.removeAttr('disabled');
    }
  } else if (model.hasClass('fm-circle')) {
    var minusBtn = container.find('.fm-increment-section .ic-btn-minus'),
      plusBtn = container.find('.fm-increment-section .ic-btn-plus'),
      modelUnits = parseInt(model.attr('data-units')),
      modelMinUnits = parseInt(model.attr('data-min-units')),
      modelMaxUnits = parseInt(model.attr('data-max-units'));

    if (modelUnits <= modelMinUnits) {
      minusBtn.attr('disabled', true);
    } else if (modelUnits > modelMinUnits) {
      minusBtn.removeAttr('disabled');
    }

    if (modelUnits >= modelMaxUnits) {
      plusBtn.attr('disabled', true);
    } else if (modelUnits < modelMaxUnits) {
      plusBtn.removeAttr('disabled');
    }
  }

}


function fmModelController(target) {
  var parent = target.parents('.increment-control'),
    container = target.parents('.response-area-fm'),
    model = container.find('.fm-model'),
    cells = model.find('input'),
    btnMinus = '.ic-btn-minus',
    btnPlus = '.ic-btn-plus',
    numCells = cells.length + 1;

  if (model.hasClass('fm-grid')) {
    var modelCols = model.attr('data-cols'),
      modelRows = model.attr('data-rows');
  } else {
    var modelUnits = model.attr('data-units');
  }

  cells.prop('checked', false);

  if (parent.is('.fm-increment-col')) {
    if (target.is(btnPlus)) {
      modelCols++;
      fmAddCells(modelRows, numCells, model);
    } else if (target.is(btnMinus)) {
      modelCols--;
      fmRemoveCells(modelRows, numCells, model);
    }
  } else if (parent.is('.fm-increment-row')) {
    if (target.is(btnPlus)) {
      modelRows++;
      fmAddCells(modelCols, numCells, model);
    } else if (target.is(btnMinus)) {
      modelRows--;
      fmRemoveCells(modelCols, numCells, model);
    }
  } else if (parent.is('.fm-increment-section')) {
    if (target.is(btnPlus)) {
      modelUnits++;
      fmCreateCells(modelUnits, model);
    } else if (target.is(btnMinus)) {
      modelUnits--;
      fmCreateCells(modelUnits, model);
    }
  }

  if (model.hasClass('fm-grid')) {
    model.css({
        'grid-template-rows': 'repeat(' + modelRows + ', 1fr)',
        'grid-template-columns': 'repeat(' + modelCols + ', 1fr)'
      })
      .attr('data-cols', modelCols)
      .attr('data-rows', modelRows);
  } else if (model.hasClass('fm-circle')) {
    model.attr('data-units', modelUnits);
  }

  fmBtnStateController(container);
}

//Initializes grid models
function fmInitializeGrid(grid, gridCols, gridRows) {
  var cells = gridCols * gridRows,
    container = grid.parents('.response-area-fm');

  grid.css({
    'grid-template-rows': 'repeat(' + gridRows + ', 1fr)',
    'grid-template-columns': 'repeat(' + gridCols + ', 1fr)'
  });
  fmRemoveCells(0, 0, grid);
  fmAddCells(cells, 1, grid);
  fmBtnStateController(container);
}

//Initializes circular models
function fmInitializeCircle(circle, units) {
  var container = circle.parents('.response-area-fm');

  fmCreateCells(units, circle);
  fmBtnStateController(container);
}

//Controls the reset button
function fmResetBtnController(container, param1, param2) {
  var btnReset = container.find('.fm-btn-reset'),
    model = container.find('.fm-model');

  btnReset.click(function() {
    if (model.hasClass('fm-grid')) {
      model.attr('data-cols', param1).attr('data-rows', param2);
      fmInitializeGrid(model, param1, param2);
    } else if (model.hasClass('fm-circle')) {
      model.attr('data-units', param1);
      fmInitializeCircle(model, param1);
    }
  });
}

//Initializes grid models
$('.fm-grid').each(function(i) {
  var grid = $(this),
    container = grid.parents('.response-area-fm'),
    gridCols = grid.attr('data-cols'),
    gridRows = grid.attr('data-rows');

  fmInitializeGrid(grid, gridCols, gridRows);
  fmResetBtnController(container, gridCols, gridRows);
});

//Initializes circular models
$('.fm-circle').each(function(i) {
  var circle = $(this),
    container = circle.parents('.response-area-fm'),
    units = circle.attr('data-units');

  fmInitializeCircle(circle, units);
  fmResetBtnController(container, units);
});

//Runs model controller when a plus or minus button is selected
$('.response-area-fm .ic-btn-plus, .response-area-fm .ic-btn-minus').click(function() {
  var target = $(this);
  fmModelController(target);
});

//Adds a class after cell selection so that default hover states don't appear
$(document).on('change', '.fm-model input', function() {
  var target = $(this),
    parent = target.parents('response-area-fm'),
    targetLabel = target.next('label'),
    labels = parent.find('label'),
    initialClass = 'fm-initial-state';

  labels.removeClass(initialClass);
  targetLabel.addClass(initialClass);
});

//Removes initial selection class from cell on mouseout
$(document).on('mouseout', '.fm-model label', function() {
  $(this).removeClass('fm-initial-state');
});

//Removes initial selection class from cell on blur
$(document).on('blur', '.fm-model input', function() {
  $(this).next('label').removeClass('fm-initial-state');
  $('.fm-model input').removeAttr('tabindex'); // This allows units to be focusable when returning to the model
});

//This allows Tab and Shift Tab to skip other units
$(document).on('focus', '.fm-model input', function() {
  $(this).siblings('input').attr('tabindex', -1);
  $(this).siblings().find('input').attr('tabindex', -1);
  $(this).parents('.fm-wedge-container').siblings('input').attr('tabindex', -1);
});

//Keyboard navigation for grid models
$(document).on('keydown', '.fm-grid input', function(e) {
  var code = (e.keyCode ? e.keyCode : e.which),
    target = $(this),
    targetIndex = $('input').index(this),
    parent = target.parents('.response-area-fm'),
    grid = target.parents('.fm-grid'),
    gridCols = parseInt(grid.attr('data-cols')),
    inputs = grid.find('input'),
    up = inputs.eq(targetIndex - gridCols),
    down = inputs.eq(targetIndex + gridCols),
    left = inputs.eq(targetIndex - 1),
    right = inputs.eq(targetIndex + 1),
    first = inputs.first(),
    last = inputs.last();

  switch (code) {
    case 13: //Enter
      target.trigger('click');
      break;
    case 38: //Up arrow
      e.preventDefault();
      up.focus();
      break;
    case 37: //Left arrow
      e.preventDefault();
      left.focus();
      break;
    case 39: //Right arrow
      e.preventDefault();
      if (target.is(last)) {
        first.focus();
      } else {
        right.focus();
      }
      break;
    case 40: //Down arrow
      e.preventDefault();
      down.focus();
      break;
  }
});

//Keyboard navigation for circle models
$(document).on('keydown', '.fm-circle input', function(e) {
  var code = (e.keyCode ? e.keyCode : e.which),
    target = $(this),
    targetIndex = $('input').index(this),
    parent = target.parents('.response-area-fm'),
    circle = target.parents('.fm-circle'),
    inputs = circle.find('input'),
    prev = inputs.eq(targetIndex - 1),
    next = inputs.eq(targetIndex + 1),
    first = inputs.first(),
    last = inputs.last();

  switch (code) {
    case 13: //Enter
      target.trigger('click');
      break;
    case 37: //Left arrow
    case 38: //Up arrow
      e.preventDefault();
      prev.focus();
      break;
    case 39: //Right arrow
    case 40: //Down arrow
      e.preventDefault();
      if (target.is(last)) {
        first.focus();
      } else {
        next.focus();
      }
      break;
  }
});
