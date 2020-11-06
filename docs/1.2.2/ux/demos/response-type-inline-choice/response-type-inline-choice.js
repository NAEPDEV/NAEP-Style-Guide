//Calculate maximum height for dropdown list
function calcListHeight(dropdown) {
  var items = dropdown.find('li'),
    itemCount = items.length,
    itemHeight = items.outerHeight(),
    listHeight = (itemHeight * itemCount) + 3;
  return listHeight;
}

//Set maximum height for dropdown list based on height of list items
function setListHeight(dropdown) {
  dropdown.children('ul').css({
    "max-height": calcListHeight(dropdown) + "px"
  });
}

//Drop list up if too close to bottom of viewport
function dropDirection(dropdown) {
  var windowHeight = $(window).height(),
    spanHeight = dropdown.children('span').outerHeight(),
    dropPosition = dropdown.offset().top,
    dropBottom = dropPosition + spanHeight + calcListHeight(dropdown);

  if (dropBottom >= windowHeight) {
    dropdown.addClass('drop-up');
  } else {
    dropdown.removeClass('drop-up');
  }
}

//Close all open dropdowns
function closeDropdowns() {
  $('.inline-choice').removeClass('active');
  $('.inline-choice').children('ul').css({
    "max-height": "0"
  });
  $('.inline-choice').find('li').attr('tabindex', -1);
}

//Click handler for dropdown span
$(document).click(function(event) {
  var dropdown = $(event.target).closest('.inline-choice');
  if (dropdown.length && !dropdown.hasClass('active')) {
    closeDropdowns();
    setListHeight(dropdown);
    dropDirection(dropdown);
    dropdown.addClass('active');
    dropdown.find('li').attr('tabindex', 0);
  } else {
    closeDropdowns();
  }
});

//Click handler for Clear Answer button
$('.response-area-ic .btn-clear-answer').click(function() {
  var responseArea = $(this).parents('.response-area-ic');
  responseArea.find('.inline-choice').children('span').html('');
  responseArea.find('.inline-choice li').removeClass('selected');
  responseArea.find('.inline-choice li:first-of-type').addClass('selected');
  if (typeof deAnswerItem == 'function') {
    deAnswerItem($(this));
  } else {
    console.warn('Missing tabs.js.');
  }
});

//Click handler for dropdown items
$('.inline-choice li').click(function() {
  $(this).siblings().removeClass('selected');
  $(this).addClass('selected');
  value = $(this).html();
  $(this).parents('.inline-choice').children('span').html(value).focus();

  //Determine whether response component has been completed
  if (typeof answerItem == 'function') {

    if (value.length) {
      $(this).parents('.inline-choice').attr('answered', true);
    } else {
      $(this).parents('.inline-choice').attr('answered', false);
    }

    var count = $(this).parents('.response-area-ic').find('.inline-choice').length,
      countAns = $(this).parents('.response-area-ic').find('.inline-choice').filter(function() {
        return $(this).attr("answered") == "true";
      });

    if (countAns.length >= count) {
      answerItem($(this));
    } else {
      deAnswerItem($(this));
    }
  } else {
    console.warn('Missing tabs.js.');
  }

});

//Keyboard navigation handler for dropdown span
$('.inline-choice span').keydown(function(e) {
  switch (e.which) {
    case 13: //Enter
    case 32: //Space
      e.preventDefault();
      $(this).trigger('click');
      $(this).siblings('ul').find('.selected').focus();
      break;
  }
});

//Keyboard navigation handler for dropdown items
$('.inline-choice li').keydown(function(e) {
  e.preventDefault();
  switch (e.which) {
    case 9: //Tab
    case 27: //Escape
      closeDropdowns();
      $(this).parents('.inline-choice').children('span').focus();
      break;
    case 13: //Enter
    case 32: //Space
      $(this).trigger('click');
      break;
    case 33: //Page up
    case 36: //Home
      $(this).siblings('li:first-of-type').focus();
      break;
    case 34: //Page down
    case 35: //End
      $(this).siblings('li:last-of-type').focus();
      break;
    case 38: //Up arrow
      $(this).prev().focus();
      break;
    case 40: //Down arrow
      $(this).next().focus();
      break;
    default:
      return false;
  }
});
