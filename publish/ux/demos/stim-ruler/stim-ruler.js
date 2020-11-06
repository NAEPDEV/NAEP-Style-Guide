$(function() {
  // Prepare extra handles
  var left = $("<div>", {
    class: "ui-rotatable-handle"
  });
  var right = left.clone();

  //Get dimensions of draggable object and hdndle
  var target = $('.ruler-draggable'),
    offset = target.offset().top,
    height = target.outerHeight(),
    rotOffsetX = target.outerWidth() / 2,
    handle = $('.ruler-drag-handle'),
    handleOffset = handle.offset().top,
    handleHeight = handle.outerHeight() / 2,
    handleDiff = handleOffset - (offset + height),
    rotOffsetY = height + handleDiff + handleHeight,
    wrapperOffset = $('.ruler-wrapper').offset().top;

  // Assign draggable object
  $('.ruler-draggable-outer').draggable({
    cancel: ".ui-rotatable-handle",
    handle: ".ruler-drag-handle, .ruler-draggable"
  });

  // Assign Rotatable
  $('.ruler-draggable').rotatable({
    rotationCenterOffset: {
      top: rotOffsetY,
      left: rotOffsetX
    }
  });

  // Assign position and styling classes to handles
  $('.ruler-draggable .ui-rotatable-handle').addClass("btn btn-circular icon- ui-rotatable-handle-left");
  right.addClass("btn btn-circular icon- ui-rotatable-handle-right");

  // Append right handle to draggable element
  $(".ruler-draggable").append(right);

  // Assigning bindings for rotation event
  $(".ruler-draggable div[class*='ui-rotatable-handle-']").bind("mousedown", function(e) {
    $('.ruler-draggable').rotatable("instance").startRotate(e);
  });

  //Reset button controller
  $('.btn-reset').click(function(e) {
    $(this).siblings('.ruler-draggable-outer').css({
      left: 0,
      top: offset - wrapperOffset
    });
    $('.ruler-draggable').data('uiRotatable').angle(0);
  });
});
