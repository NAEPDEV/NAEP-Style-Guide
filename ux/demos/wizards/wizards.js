(function() {

  var i,
    backdrop = $('.wizard-backdrop'),
    cardWrapper = $('.wizard'),
    cards = $('.wizard-content'),
    count = cards.length,
    dots,
    backBtn = $('#btn-back-wizard'),
    nextBtn = $('#btn-next-wizard'),
    navWrapper = $('.wizard-nav-wrapper'),
    navArray = $('.wizard-nav-array'),
    themeBtn = $('#theme-btn'),
    scratchworkBtn = $('#scratchwork-btn'),
    systemNextBtn = $('#next-btn'),
    cardActiveClass = 'wizard-active',
    cardViewedClass = 'wizard-viewed',
    dotActiveClass = 'wizard-active',
    backdropHiddenClass = 'wizard-hidden',
    navBtnHiddenClass = 'hidden';

  function initializeWizard() {
    updateState('wizard', 'open');
    for (i = 0; i < count; i++) {
      navArray.append('<div class="wizard-nav-dot"></div>');
    }
    dots = $('.wizard-nav-dot');
    dots.eq(0).addClass(dotActiveClass);
  }

  function cardNav(trigger) {
    var active = $('.wizard-content.wizard-active'),
      idx = cards.index(active);

    updateState('tts', 'off');

    if (trigger == 1) {
      idx++;
    } else {
      idx--;
    }
    setActiveCard(idx);

    if (idx == count) {
      backdrop.addClass(backdropHiddenClass);
      backBtn.attr('tabindex', -1);
      nextBtn.attr('tabindex', -1);
      updateState('wizard', 'closed');
      systemNextBtn.focus();
    }

    if (idx == 1) {
      backBtn.removeClass(navBtnHiddenClass);
    } else if (idx == 0) {
      backBtn.addClass(navBtnHiddenClass);
      nextBtn.focus();
    }
  }

  function setActiveCard(idx, trigger) {
    var card = cards.eq(idx),
      cardSize = card.data('cardSize'),
      prevCard = cards.eq(idx - 1),
      activeCard = $('.wizard-content.wizard-active'),
      activeCardSize = activeCard.data('cardSize'),
      dot = dots.eq(idx),
      largeClass = 'large';

    if (idx < count) {
      setInactiveCard();
    }

    if (idx - 1 >= 0 && idx < count) {
      prevCard.addClass(cardViewedClass);
    }

    if (cardSize == largeClass) {
      cardWrapper.addClass(largeClass);
    } else {
      cardWrapper.removeClass(largeClass);
    }

    if (cardSize == largeClass && activeCardSize != largeClass) {
      cards.fadeOut(0).delay(250).fadeIn(200);
    } else if (cardSize != largeClass && activeCardSize == largeClass) {
      cards.fadeOut(0).delay(250).fadeIn(200);
    }

    if (card.data('customNextLabel')) {
      customNextLabel(card);
    } else {
      defaultNextLabel();
    }

    card.addClass(cardActiveClass).removeClass(cardViewedClass);
    dot.addClass(dotActiveClass);

    card.find('.wizard-animation').show();
    setTimeout(function() {
      var imgSrc = card.find('.wizard-animation').data('source');
      card.find('.wizard-animation').attr('src', imgSrc);
    }, 10);

  }

  function setInactiveCard() {
    cards.removeClass(cardActiveClass);
    dots.removeClass(dotActiveClass);
    cards.find('.wizard-animation').hide();
  }

  function customNextLabel(card) {
    var label = card.data('customNextLabel'),
      title = card.data('customNextTitle');
    setNextLabel(label, title);
  }

  function defaultNextLabel() {
    var label = nextBtn.data('label'),
      title = nextBtn.data('title');
    setNextLabel(label, title);
  }

  function setNextLabel(label, title) {
    nextBtn.find('span').html(label);
    nextBtn.attr('title', title);
  }

  function restartWizard() {
    backdrop.removeClass(backdropHiddenClass);
    cards.removeClass(cardActiveClass).removeClass(cardViewedClass);
    dots.removeClass(dotActiveClass);
    cards.eq(0).addClass(cardActiveClass);
    dots.eq(0).addClass(cardActiveClass);
    backBtn.addClass(navBtnHiddenClass).removeAttr('tabindex');
    nextBtn.removeAttr('tabindex');
    defaultNextLabel();
    updateState('wizard', 'open');
  }

  initializeWizard();

  backBtn.click(function() {
    cardNav(0);
  });

  nextBtn.click(function() {
    cardNav(1);
  });

  $('#btn-wizard-restart').click(function() {
    restartWizard();
    nextBtn.focus();
  });

})();
