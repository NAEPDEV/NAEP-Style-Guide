(function() {
  var container = $('.response-area-soe'),
    inputs = container.find('.control-group input'),
    sections = $('.dl-section'),
    linePrimary = $('.dl-primary-stroke'),
    lineSecondary = $('.dl-secondary-stroke'),
    activeClass = 'active',
    dashedClass = 'dl-dashed-stroke',
    initialClass = 'dl-initial-state';

  function dlChangeLineStyle(value) {
    if (value == 'line-1-solid') {
      linePrimary.removeClass(dashedClass);
    } else if (value == 'line-1-dashed') {
      linePrimary.addClass(dashedClass);
    } else if (value == 'line-2-solid') {
      lineSecondary.removeClass(dashedClass);
    } else if (value == 'line-2-dashed') {
      lineSecondary.addClass(dashedClass);
    }
  }

  //Selects section and adds a class so that default focus state doesn't appear on keyboard focus
  function dlSectionUpdate(target) {
    sections.removeClass(initialClass);
    target.addClass(initialClass).toggleClass(activeClass);
  }

  inputs.click(function() {
    var value = $(this).val();
    dlChangeLineStyle(value);
  });

  sections.click(function() {
    var target = $(this);
    dlSectionUpdate(target);
  });

  sections.keydown(function(e) {
    var target = $(this);

    switch (e.which) {
      case 13: //Enter
      case 32: //Space
        dlSectionUpdate(target);
        break;
    }
  });

  //Removes initial selection class from section on blur
  sections.blur(function() {
    $(this).removeClass(initialClass);
  });

})();
