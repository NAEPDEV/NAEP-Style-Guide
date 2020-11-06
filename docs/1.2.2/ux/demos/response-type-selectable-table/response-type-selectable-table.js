//Toggle selection when associated row is clicked
function tableToggleSelected(target) {
  var numSelected,
    table = target.parents('.response-area-selectable-table'),
    minSelect = parseInt(table.data('minSelections'));

  if (target.hasClass('tts-active')) {
    return;
  }
  target.toggleClass('selected');

  numSelected = table.find('.selected').length;
  if (typeof answerItem == 'function') {
    if (minSelect == numSelected || Number.isNaN(minSelect)) {
      answerItem(target);
    }
    if (numSelected < minSelect) {
      deAnswerItem(target);
    }
  } else {
    console.warn('Missing tabs.js.');
  }
}

//Clear all selections in table
function tableClearAnswer(target) {
  var container = target.parents('.response-area-selectable-table'),
    rows = container.find('tr'),
    checkboxes = container.find('input[type="checkbox"]');

  rows.removeClass('selected');
  checkboxes.prop('checked', false);

  if (typeof deAnswerItem == 'function') {
    return deAnswerItem($(this));
  } else {
    console.warn('Missing tabs.js.');
  }
}

$('.response-area-selectable-table tbody tr').click(function() {
  var target = $(this),
    checkbox = target.find('input');

  if (!target.is('input')) {
    checkbox.trigger('click');
    checkbox.focus();
  }
});

$('.stim-table input').on('click', function(e) {
  var target = $(this).parents('tr');
  tableToggleSelected(target);
  console.log($(this).prop('checked'));
});

//Clear responses when Clear Answer button is selected
$('.response-area-selectable-table .btn-clear-answer').click(function() {
  var target = $(this);
  tableClearAnswer(target);
});
