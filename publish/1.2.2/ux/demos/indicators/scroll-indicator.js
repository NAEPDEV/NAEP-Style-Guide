var scrollBtnKilled = 0;

function MoreBtnController(delay) {
  var scrollIndicator = $('.scroll-indicator'),
    parent = scrollIndicator.parent();

  setTimeout(function() {
    var ref = parent[0].clientHeight,
      ref1 = parent[0].scrollHeight;

    if (ref < ref1) {
      if (scrollBtnKilled == 0 || scrollBtnKilled == 2) {
        scrollIndicator.removeClass('top hidden').addClass('more').attr('tabindex', 0);
        scrollBtnKilled = 0;
      } else if (scrollBtnKilled == 1) {
        if (parent.scrollTop() >= parent[0].scrollHeight - parent[0].clientHeight - 3) {
          return;
        } else {
          $('.scroll-indicator').removeClass('more hidden').addClass('top').attr('tabindex', 0);
          scrollBtnKilled = 0;
        }
      }
    } else {
      scrollIndicator.addClass('hidden').attr('tabindex', -1);
    }
  }, delay);
}

MoreBtnController(200);


//Run scroll indicator controller on window resize/zoom
$(window).resize(function() {
  MoreBtnController(200);
});

//Click More button auto-scrolls to bottom of taskpane
$('.scroll-indicator').click(function(e) {
  var scrollIndicator = $(this),
    parent = scrollIndicator.parent();

  if (scrollIndicator.hasClass('more')) {
    parent.animate({
      scrollTop: parent[0].scrollHeight
    }, 1000);
    scrollIndicator.removeClass('more').addClass('top');
    scrollBtnKilled = 1;
  } else {
    parent.animate({
      scrollTop: 0
    }, 300);
  }
});

//Scrolling to top or bottom of taskpane changes state of scroll indicator
$('.scroll-indicator').parent().on('scroll', function() {
  var parent = $(this),
    scrollIndicator = $('.scroll-indicator');

  if (parent.scrollTop() == 0) {
    if (scrollIndicator.hasClass('top')) {
      scrollIndicator.addClass('hidden').attr('tabindex', -1);
    } else {
      return;
    }
    return scrollBtnKilled = 2;
  } else if (parent.scrollTop() >= parent[0].scrollHeight - parent[0].clientHeight - 3) {
    if (scrollBtnKilled == 0) {
      scrollIndicator.removeClass('more').addClass('top');
      scrollBtnKilled = 1;
    }
  }
});
