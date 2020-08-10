function Footnote(el) {
  this.ft = el;
  this.initEvents();
}
Footnote.prototype = {
  initEvents: function() {
    var obj, footnoteID, noteHeight, noteLeft, noteTop, noteWidth, triggerPosition, triggerWidth;
    obj = this;

    obj.ft.on('click', function(event) {
      footnoteID = '#' + $(this).attr('id').concat("-content");
      triggerPosition = $(this).position();
      triggerWidth = $(this).outerWidth();
      noteHeight = $(footnoteID).outerHeight();
      noteWidth = $(footnoteID).outerWidth();
      noteTop = triggerPosition.top - noteHeight - 11;
      noteLeft = triggerPosition.left - noteWidth * 0.5 + triggerWidth * 0.5 + 3;

      //Assign class to button so focus can be restored on popup close
      $(this).addClass('footnote-originator');

      //Positions and pops footnote and hides any others currently open
      $(footnoteID).css({
        top: noteTop,
        left: noteLeft
      });
      $(footnoteID).toggleClass('active');
      $(footnoteID).siblings(".footnote-content").removeClass('active');
      $(footnoteID).children('.footnote-close').focus();
      event.stopPropagation();
    });
  }
}
$(function() {
  var ft = new Footnote($(".footnote-btn"));
  $(".footnote-close").click(function(e) {
    $('.footnote-originator').focus();
    $('.footnote-originator').removeClass('footnote-originator');
    $('.footnote-content').removeClass('active');
  });
});
