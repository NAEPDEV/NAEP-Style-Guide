//Add unique ID to each grid table
addUniqueID($(".grid"), "grid-");

//Add unique ID to each grid row
$(".grid").each(function () {
  var target = $(this),
    id = target.attr("id");

  addUniqueID(target.find("tr"), id + "-");
});

//Assign unique name to all inputs in each row (supports keyboard nav in single-select grids)
$(".grid tr").each(function () {
  var target = $(this),
    inputs = target.find("input"),
    targetId = target.attr("id");

  inputs.attr("name", targetId);
});

(function () {
  var GridController,
    bind = function (fn, me) {
      return function () {
        return fn.apply(me, arguments);
      };
    },
    indexOf =
      [].indexOf ||
      function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
          if (i in this && this[i] === item) return i;
        }
        return -1;
      };

  GridController = (function () {
    function GridController() {
      var ansFn,
        elim,
        fn,
        index,
        j,
        k,
        l,
        len,
        len1,
        len2,
        len3,
        len4,
        len5,
        len6,
        len7,
        len8,
        m,
        n,
        numRows,
        numSelected,
        o,
        option,
        p,
        q,
        r,
        radioSet,
        radioSet1,
        ref,
        ref1,
        ref2,
        ref3,
        ref4,
        ref5,
        ref6,
        ref7,
        ref8,
        selSet,
        selSetInput;

      ref = $(".response-area-grid");
      for (j = 0, len = ref.length; j < len; j++) {
        option = ref[j];
        fn = function (e) {
          return function () {
            e.find("input").prop("checked", false);
            e.find("table.grid tr").removeClass("grid-row-selected");
            if (typeof deAnswerItem == "function") {
              return deAnswerItem($(this));
            } else {
              console.warn("Missing tabs.js.");
            }
          };
        };
        $(option)
          .find(".btn-clear-answer")
          .click(fn($(option)));
      }

      ref2 = $("table.grid.grid-multiple-select input");
      for (l = 0, len2 = ref2.length; l < len2; l++) {
        option = ref2[l];
        fn = function (e) {
          return function () {
            selSet = e
              .parents("td")
              .siblings("td")
              .find("input:checked").length;
            e.focus();
            if (e.prop("checked") == false) {
              e.prop("checked", true);
              e.parents("tr").addClass("grid-row-selected");
            } else {
              e.prop("checked", false);
              if (selSet <= 0) {
                e.parents("tr").removeClass("grid-row-selected");
              }
            }
            numSelected = e
              .parents("table.grid")
              .find(".grid-row-selected").length;
            numRows = e.parents("table.grid").find("tr").length - 1;
            if (typeof answerItem == "function") {
              if (numRows == numSelected) {
                answerItem(e);
              }
              if (numSelected < numRows) {
                deAnswerItem(e);
              }
            } else {
              console.warn("Missing tabs.js.");
            }
          };
        };
        $(option)
          .parents("td")
          .click(fn($(option)));
      }
      ref3 = $("table.grid.grid-single-select tr");
      for (m = 0, len3 = ref3.length; m < len3; m++) {
        radioSet = ref3[m];
        ref4 = $(radioSet).find("input");
        for (n = 0, len4 = ref4.length; n < len4; n++) {
          option = ref4[n];
          fn = function (e) {
            return function () {
              e.parents("tr").addClass("grid-row-selected");
              e.prop("checked", true);
              e.focus();
              e.parents("td")
                .siblings("td")
                .find("input")
                .prop("checked", false);
              numSelected = e
                .parents("table.grid")
                .find(".grid-row-selected").length;
              numRows = e.parents("table.grid").find("tr").length - 1;
              if (typeof answerItem == "function") {
                if (numRows == numSelected) {
                  answerItem(e);
                }
                if (numSelected < numRows) {
                  deAnswerItem(e);
                }
              } else {
                console.warn("Missing tabs.js.");
              }
            };
          };
          $(option)
            .parents("td")
            .click(fn($(option)));
        }
      }
    }

    return GridController;
  })();

  $(function () {
    return (window.GridController = new GridController());
  });
}.call(this));

//Keyboard navigation handler for grid items
$("table.grid-multiple-select input").keydown(function (e) {
  var target = $(this),
    container = target.parents(".response-area-grid"),
    clearAnswer = container.find(".btn-clear-answer"),
    table = target.parents("table"),
    first = table.find("tr:first-of-type"),
    last = table.find("tr:last-of-type"),
    parentTd = target.parents("td"),
    parentTr = target.parents("tr"),
    prev = parentTr.prev(),
    next = parentTr.next();

  switch (e.which) {
    case 13: //Enter
    case 32: //Space
      e.preventDefault();
      parentTd.trigger("click");
      break;
    case 37: //Left arrow
      e.preventDefault();
      if (parentTd.is("td:first-of-type")) {
        parentTd.siblings("td:last-of-type").find("input").focus();
      } else {
        parentTd.prev().find("input").focus();
      }
      break;
    case 38: //Up arrow
      e.preventDefault();
      var idx = parentTd.index() - 1;
      if (parentTr.is("tr:first-of-type")) {
        last.find("td").eq(idx).find("input").focus();
      } else {
        prev.find("td").eq(idx).find("input").focus();
      }
      break;
    case 39: //Right arrow
      e.preventDefault();
      if (parentTd.is("td:last-of-type")) {
        parentTd.siblings("td:first-of-type").find("input").focus();
      } else {
        parentTd.next().find("input").focus();
      }
      break;
    case 40: //Down arrow
      e.preventDefault();
      var idx = parentTd.index() - 1;
      if (parentTr.is("tr:last-of-type")) {
        first.find("td").eq(idx).find("input").focus();
      } else {
        next.find("td").eq(idx).find("input").focus();
      }
      break;
  }
});
