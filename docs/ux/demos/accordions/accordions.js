//On page load, open all submenus, set font-weight to bold, calculate and set width, and then reset all styles to defaults
  $('.accordion').each(function(i) {
    $(this).css('font-weight', 'bold');
    $(this).find('ul').css('display', 'block');
    var width = $(this).outerWidth();
    $(this).css({
      'min-width': width,
      'font-weight': ''
    });
    $(this).find('ul').css('display', '');
  });

//On option hover, show caret if option has a submenu
$('.accordion span').hover(function() {
  var sib = $(this).siblings('ul');
  if (sib.length) {
    $(this).toggleClass('hover');
  }
});

//On option click, set option to active, open submenu if present, and close all other submenus
$('.accordion span').click(function() {
  var parentSib = $(this).parents('li').siblings('li'),
    sib = $(this).siblings('ul');

  $(this).toggleClass('active');
  if (sib.length) { //If target will open a dropdown
    $(this).toggleClass('dropdown');
    sib.slideToggle('fast');
    if ($(this).hasClass('active')) {
      sib.children('li').children('span').attr('tabindex', 0);
    } else {
      sib.children('li').children('span').attr('tabindex', -1);
    }
  } else { //If target will NOT open a dropdown
    if ($(this).hasClass('active')) {
      parentSib.find('span').removeClass('active').attr('tabindex', 0);
      $('.accordion').find('span').eq(0).focus();
      $(this).attr('tabindex', -1);
    }
  }
  parentSib.find('span.dropdown').removeClass('active dropdown');
  parentSib.find('ul').slideUp('fast');
});

//Keyboard navigation handler
$('.accordion span').keydown(function(e) {
  var target = $(this),
    container = target.parents('.accordion'),
    items = container.find('span:not([tabindex=-1])'),
    targetIdx = items.index(target),
    prev = items.eq(targetIdx - 1),
    next = items.eq(targetIdx + 1),
    first = items.first(),
    last = items.last();

  switch (e.which) {
    case 13: //Enter
    case 32: //Space
      e.preventDefault();
      $(this).trigger('click');
      break;
    case 38: //Up arrow
      e.preventDefault();
      prev.focus();
      break;
    case 40: //Down arrow
      e.preventDefault();
      if (target.is(last)) {
        first.focus()
      } else {
        next.focus();
      }
      break;
    case 36: //Home
      e.preventDefault();
      first.focus();
      break;
    case 35: //End
      e.preventDefault();
      last.focus();
      break;
  }
});
