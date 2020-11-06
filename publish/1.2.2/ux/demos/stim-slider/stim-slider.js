//Create a slider tick for each image and label it using the image's data-label attribute
function createSliderTicks(target, i) {
  var id = target.attr('id'),
      imageId = id+'-'+(i+1),
      image = target.find('#'+imageId),
      label = image.data('label'),
      tickParent = target.find('.slider-labels'),
      dotParent = target.find('.slider-dots'),
      tickTemplate = '<div class="slider-label-tick enabled" id="'+imageId+'-label"><span>'+label+'</span></div>',
      dotTemplate = '<div id="'+imageId+'-dot" class="slider-dot enabled"></div>';

  tickParent.append(tickTemplate);
  dotParent.append(dotTemplate);
}

//Determine whether slider is within specified range of a tick
function evalSliderPosition(sliderValues, activeRadius, val) {
  var output;
  $.each(sliderValues, function(i, v) {
    var lowerBound = v - activeRadius,
        upperBound = v + activeRadius;

    if (val >= lowerBound && val <= upperBound) {
      output = v;
    }
  });
  return output;
}

function updateSlider(target, newVal) {
  var parent = target.parents('.slider-wrapper'),
      images = parent.find('.slider-img'),
      id = parent.attr('id'),
      imageId = '#'+id+'-'+(newVal+1),
      image = $(imageId),
      ticks = parent.find('.slider-label-tick'),
      tick = $(imageId+'-label'),
      dots = parent.find('.slider-dot'),
      dot = $(imageId+'-dot'),
      hiddenClass = 'hidden',
      activeClass = 'active',
      closestClass = 'closest';

    images.addClass(hiddenClass);
    image.removeClass(hiddenClass);
    ticks.removeClass(activeClass);
    tick.addClass(activeClass);
    dots.removeClass(closestClass);
    dot.addClass(closestClass);
}

function initializeSlider(target) {
  var i,
      newVal = 0,
      id = target.attr('id'),
      slider = target.find('.slider'),
      images = target.find('.slider-img'),
      numImages = images.length - 1,
      hiddenClass = 'hidden',
      activeClass = 'active',
      activeRadius = 0.5,
      sliderValues = [];

  addUniqueID(images, id+"-");
  images.addClass(hiddenClass);
  images.eq(0).removeClass(hiddenClass);

  for (i = 0; i <= numImages; i++) {
    sliderValues.push(i);
    createSliderTicks(target, i);
  }
  $('.slider-label-tick').eq(0).addClass('active');
  $('.slider-dot').eq(0).addClass('closest');

  slider.attr('max', numImages);

  slider.on('input', function() {
    var target = $(this),
        val = target.val(),
        newVal = evalSliderPosition(sliderValues, activeRadius, val);

    updateSlider(target, newVal);
  });

  slider.change(function() {
    var target = $(this),
        val = target.val(),
        newVal = evalSliderPosition(sliderValues, activeRadius, val);

    target.val(newVal);
  });

  slider.keydown(function(e) {
    var target = $(this),
        val = parseInt(target.val()),
        min = target.attr('min'),
        max = target.attr('max');

    switch (e.which) {
      case 37: // Left arrow
      case 38: // Up arrow
        e.preventDefault();
        if (val > min) {
          val = val - 1;
          target.val(val);
          newVal = evalSliderPosition(sliderValues, activeRadius, val);
          updateSlider(target, newVal);
        }
        break;
      case 39: // Right arrow
      case 40: // Down arrow
        e.preventDefault();
        if (val < max) {
          val = val + 1;
          target.val(val);
          newVal = evalSliderPosition(sliderValues, activeRadius, val);
          updateSlider(target, newVal);
        }
        break;
    }
  });
}

$('.slider-wrapper').each(function() {
  var target = $(this);

  addUniqueID(target, 'slider-');
  initializeSlider(target);
});
