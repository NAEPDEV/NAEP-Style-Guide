$(document).ready(function() {
  $('.stim-table').tablesorter({
    cancelSelection: false,
    headers: {
      0: {
        sorter: false
      },
      1: {
        sorter: false
      }
    }
  });

  //Keyboard navigation
  $('th.header').keydown(function(e) {
    switch (e.which) {
      case 13: //Enter
      case 32: //Space
        e.preventDefault();
        $(this).trigger('click');
        break;
    }
  });
});
