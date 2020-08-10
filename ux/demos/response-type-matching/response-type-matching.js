//Matching item controller
$(function() {

  // Makes source tray options draggable
  $(".match-option").draggable({
    revert: function(valid) {
      if (!valid) {
        $(this).delay(400).queue(function(next) {
          $(this).removeClass("hidden");
          next();
        });
        return "invalid";
      }
    },
    revertDuration: 400,
    containment: ".childItem.selected .response-area-match",
    helper: "clone",
    scroll: true,
    start: function() {
      var maxUses = $(this).data('maxUses');
      if (maxUses == 1) {
        $(this).addClass("hidden");
      } else if (maxUses > 1) {
        //TODO
      }
    }
  });

  // Makes drop targets droppable
  $('.match-drop-target').droppable({
    hoverClass: "draghover",
    activeClass: "dragactive",
    accept: function(d) {
      var optionGroup = d.data('matchGroup'),
        targetGroup = $(this).data('matchGroup');
      if (optionGroup === targetGroup) {
        return "true";
      }

    },
    drop: function(event, ui) {
      var activeGroup, currentSelections, currentSelectionsEach, droppedOption, emptyGroupMembers, fullDropTargets, maxSelections, maxSelectionsEach, minSelections, minSelectionsEach, totalDropTargets;
      minSelections = $(this).data('minSelections');
      maxSelections = $(this).data('maxSelections');
      activeGroup = $(this).data('matchGroup');
      emptyGroupMembers = 0;
      fullDropTargets = 0;
      totalDropTargets = $(this).parents('.response-area-match').find('.match-drop-target').length;

      //If target isn't reusable, restore previously dropped option to source tray and clear target.
      if (maxSelections == "1" && $(this).html().length) {
        droppedOption = $(this).find('.match-option').text();
        $(this).parents('.response-area-match').find('.match-source-tray').find('.match-option:contains("' + droppedOption + '")').removeClass('hidden');
        $(this).empty();
      }

      //Append newly dropped option to target and count how many options the target contains.
      $("<div class='match-option match-option-text' data-match-group=" + activeGroup + "></div>").html(ui.draggable.html()).appendTo(this);
      currentSelections = $(this).find(".match-option").length;
      // If target is reusable, and its max-selection has been reached,
      // disable the target, and check whether other targets in its group have reached max-selection.
      if (currentSelections >= maxSelections && maxSelections > "1") {
        $(this).droppable("disable");
        $('.childItem.selected .match-drop-target[data-match-group="' + activeGroup + '"]').each(function() {
          currentSelectionsEach = $(this).find(".match-option").length;
          maxSelectionsEach = $(this).data('maxSelections');
          if (currentSelectionsEach < maxSelectionsEach) {
            emptyGroupMembers++;
          }
        });

        // If all targets in a group have reached max-selection, disable options in the same group. Deprecated per NCES.
        //if (emptyGroupMembers == 0) {
        //	$('.childItem.selected .match-source-tray').find('.match-option[data-match-group="'+activeGroup+'"]').addClass('inactive');
        //}
      }

      //If target's min-selection has been reached, check if other targets' min-selections
      // have also been reached. Change answered state of item accordingly.
      if (currentSelections >= minSelections) {
        $(this).parents('.response-area-match').find('.match-drop-target').each(function() {
          currentSelectionsEach = $(this).find(".match-option").length;
          minSelectionsEach = $(this).data('minSelections');
          if (currentSelectionsEach >= minSelectionsEach) {
            fullDropTargets++;
          }
        });
        if (typeof answerItem == 'function') {
          if (fullDropTargets < totalDropTargets) {
            deAnswerItem($(this));
          } else {
            answerItem($(this));
          }
        } else {
          console.warn('Missing tabs.js.');
        }
      }

      //Run draggable on newly created option
      $(".match-drop-target .match-option").draggable({
        revert: function(valid) {
          if (!valid) {
            $(this).delay(400).queue(function(next) {
              $(this).removeClass("hidden");
              next();
            });
            return "invalid";
          } else {
            activeGroup = $(this).parent().data('matchGroup');
            $(this).closest(".match-drop-target").droppable("enable");
            $(this).remove();
            $('.childItem.selected .match-source-tray').find('.match-option[data-match-group="' + activeGroup + '"]').removeClass('inactive');
          }
        },
        revertDuration: 400,
        containment: ".childItem.selected .response-area-match",
        helper: "clone",
        scroll: true,
        start: function() {
          $(this).addClass("hidden");
        }
      });
    }
  });

  // Makes source tray droppable, accepting dropzone items
  $(".match-source-tray").droppable({
    accept: ".match-drop-target .match-option",
    drop: function(event, ui) {
      $('.match-option').each(function() {
        var draggable = ui.draggable.text();
        if ($(this).text() == draggable) {
          $(this).removeClass("hidden");
        }
      });
      if (typeof deAnswerItem == 'function') {
        return deAnswerItem($(this));
      } else {
        console.warn('Missing tabs.js.');
      }
    }
  });

  //Clear Answer controller
  $(".response-area-match .btn-clear-answer").click(function(e) {
    $(this).parents('.response-area-match').find(".match-source-tray .match-option").removeClass("hidden");
    $(this).parents('.response-area-match').find(".match-drop-target .match-option").remove();
    $(this).parents('.response-area-match').find(".match-drop-target").droppable("enable");
    $(this).parents('.response-area-match').find('.match-option').removeClass('inactive');
    if (typeof deAnswerItem == 'function') {
      return deAnswerItem($(this));
    } else {
      console.warn('Missing tabs.js.');
    }
  });

});
