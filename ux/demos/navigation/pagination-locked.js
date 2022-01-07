(function () {
  var bind = function (fn, me) {
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

  var PageController, idx, par, parents;

  PageController = (function () {
    function PageController(pageParent, myId) {
      var $navigator,
        checkEnabled,
        idx,
        j,
        k,
        l,
        len,
        margin,
        mkHandler,
        navFn,
        pageHeight,
        ref,
        ref1,
        tb;

      this.pageParent = pageParent;
      this.myId = myId;
      this.previous = bind(this.previous, this);
      this.next = bind(this.next, this);
      this.moveTo = bind(this.moveTo, this);
      this.disablePage = bind(this.disablePage, this);
      this.enablePage = bind(this.enablePage, this);
      this._setNextBackButtonEnabled = bind(
        this._setNextBackButtonEnabled,
        this
      );
      this.positionNavigator = bind(this.positionNavigator, this);
      this.getPageScale = bind(this.getPageScale, this);
      this.getName = bind(this.getName, this);
      this.pages = this.pageParent.find(".card");
      this.pageTops = function () {
        var j, len, ref, results;
        ref = this.pages;
        results = [];
        for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
          p = ref[idx];
          results.push($(p).outerHeight() * idx);
        }
        return results;
      }.call(this);
      this.pageContainer = $('<div class="page-container"></div>');
      this.pageParent.append(this.pageContainer);
      this.pages.detach().appendTo(this.pageContainer);
      this.pageParent.append('<div class="page-mask"></div>');
      margin = parseInt(this.pageParent.css("margin-top"));
      this.pageParent.find(".page-mask").css("top", pageHeight + margin + "px");
      $navigator = $('<div class="page-nav"></div>');
      this.pageParent.append($navigator);
      $navigator.append('<div class="page-btn-scrim"></div>');
      $navigator.append(
        $(
          '<button class="btn-page-previous" title="Previous Page. Goes back one page."></button>'
        )
      );
      for (
        idx = j = 1, ref = this.pages.length;
        1 <= ref ? j <= ref : j >= ref;
        idx = 1 <= ref ? ++j : --j
      ) {
        $navigator.append(
          $(
            "<button id='btn-page-" +
              idx +
              "' class='btn-page-num' title='Page Number. Use these to move between pages.'>" +
              idx +
              "</button>"
          )
        );
      }
      $navigator.append(
        $(
          "<button class='btn-page-next' title='Next Page. Moves to the next page.'></button>"
        )
      );
      this.disablePage(3);
      checkEnabled = (function (_this) {
        return function (evt) {
          return !(
            _this.turnDisabled ||
            $(evt.target).attr("disabled") ||
            $(evt.currentTarget).attr("disabled")
          );
        };
      })(this);

      $("#btn-enable-page").click(
        (function (_this) {
          return function (evt) {
            _this.enablePage(3);
            $("#btn-enable-page").attr("disabled", true);
          };
        })(this)
      );

      $navigator.find(".btn-page-previous").click(
        (function (_this) {
          return function (evt) {
            if (checkEnabled(evt)) {
              return _this.previous("nextBack");
            }
          };
        })(this)
      );
      this.pageParent.find(".btn-page-next").click(
        (function (_this) {
          return function (evt) {
            if (checkEnabled(evt)) {
              return _this.next("nextBack");
            }
          };
        })(this)
      );
      navFn = (function (_this) {
        return function (i) {
          return function (evt) {
            if (checkEnabled(evt)) {
              return _this.moveTo(i, "pageButton");
            }
          };
        };
      })(this);
      for (
        idx = k = 0, ref1 = this.pages.length;
        0 <= ref1 ? k < ref1 : k > ref1;
        idx = 0 <= ref1 ? ++k : --k
      ) {
        this.pageParent.find("#btn-page-" + (idx + 1)).click(navFn(idx));
      }
      $navigator.bind(
        "keydown",
        (function (_this) {
          return function (evt) {
            var $btn;
            switch (evt.keyCode) {
              case 37:
              case 38:
                evt.preventDefault();
                if (_this.activePage === 0) {
                  return;
                }
                $btn = $navigator.find("#btn-page-" + _this.activePage);
                if (
                  checkEnabled({
                    target: $btn[0],
                  })
                ) {
                  _this.previous("arrowKeys");
                  return $btn.focus();
                }
                break;
              case 39:
              case 40:
                evt.preventDefault();
                if (_this.activePage === _this.pages.length - 1) {
                  return;
                }
                $btn = $navigator.find("#btn-page-" + (_this.activePage + 2));
                if (
                  checkEnabled({
                    target: $btn[0],
                  })
                ) {
                  _this.next("arrowKeys");
                  return $btn.focus();
                }
            }
          };
        })(this)
      );

      document.addEventListener(
        "updatePageButtons",
        (function (_this) {
          return function (evt) {
            var state = evt.detail.state;
            if (state == "disable") {
              _this.turnDisabled = true;
              return _this.pageParent
                .find(".page-nav button")
                .each(function () {
                  if (!$(this).hasClass("page-active")) {
                    return $(this).attr("disabled", true);
                  }
                });
            } else {
              var l, pageNum, ref2;
              _this.__disabledPages || (_this.__disabledPages = {});
              _this.turnDisabled = false;
              for (
                pageNum = l = 1, ref2 = _this.pages.length;
                1 <= ref2 ? l <= ref2 : l >= ref2;
                pageNum = 1 <= ref2 ? ++l : --l
              ) {
                if (!_this.__disabledPages[pageNum]) {
                  _this.pageParent
                    .find("#btn-page-" + pageNum)
                    .removeAttr("disabled");
                }
              }
              return _this._setNextBackButtonEnabled();
            }
          };
        })(this)
      );

      pageHeight = $(this.pages[0]).outerHeight();

      this.moveTo(0);
      return this.positionNavigator();
    }

    PageController.prototype.getName = function () {
      return "pageController" + this.myId;
    };

    PageController.prototype.getPageScale = function () {
      var getScale;
      getScale = function (el) {
        var matches, style, txRx;
        style = window.getComputedStyle(el);
        if (style.transform === "none") {
          return 1.0;
        }
        if (style.transformOrigin !== "0px 0px") {
          console.warn(
            el.nodeName +
              "#" +
              el.id +
              " has a transform-origin property of " +
              style.transformOrigin +
              ". Values other than '0px 0px' may cause bugs in page button placement."
          );
        }
        txRx = /matrix\((\d+\.?\d*),\s*0,\s*0,\s*(\d+\.?\d*),\s*0,\s*0\)/;
        matches = txRx.exec(style.transform);
        if (matches != null && matches[1] === matches[2]) {
          return parseFloat(matches[1]);
        } else {
          console.warn(
            el.nodeName +
              "#" +
              el.id +
              " has a CSS transform that doesn't look like a 2D scale transform. This may cause bugs in page button placement."
          );
          return 1.0;
        }
      };
      return getScale(this.pages[0]) * getScale(this.pageContainer[0]);
    };

    PageController.prototype.positionNavigator = function () {
      var setTop;
      return (setTop = (function (_this) {
        var $navigator, pageHeight, ypos;
        $navigator = _this.pageParent.find(".page-nav");
        pageHeight = $(_this.pages[0]).outerHeight() * _this.getPageScale();
        ypos =
          pageHeight / 2 -
          $navigator.outerHeight() / 2 +
          _this.pageParent.offset().top;
        return $navigator.css("top", ypos + "px");
      })(this));
    };

    PageController.prototype._setNextBackButtonEnabled = function () {
      var idx, j, k, ref, ref1;
      for (
        idx = j = 1, ref = this.pages.length;
        1 <= ref ? j <= ref : j >= ref;
        idx = 1 <= ref ? ++j : --j
      ) {
        if (!this.pageParent.find("#btn-page-" + idx).attr("disabled")) {
          break;
        }
      }
      if (this.activePage === idx - 1) {
        this.pageParent.find(".btn-page-previous").attr("disabled", true);
        this.pageParent.find(".btn-page-next").focus();
      } else if (!this.turnDisabled) {
        this.pageParent.find(".btn-page-previous").removeAttr("disabled");
      }
      for (
        idx = k = ref1 = this.pages.length;
        ref1 <= 1 ? k <= 1 : k >= 1;
        idx = ref1 <= 1 ? ++k : --k
      ) {
        if (!this.pageParent.find("#btn-page-" + idx).attr("disabled")) {
          break;
        }
      }
      if (this.activePage === idx - 1) {
        this.pageParent.find(".btn-page-next").attr("disabled", true);
        return this.pageParent.find(".btn-page-previous").focus();
      } else if (!this.turnDisabled) {
        return this.pageParent.find(".btn-page-next").removeAttr("disabled");
      }
    };

    PageController.prototype.enablePage = function (pageNum) {
      this.__disabledPages || (this.__disabledPages = {});
      this.__disabledPages[pageNum] = false;
      if (this.turnDisabled) {
        return;
      }
      pageNum = parseInt(pageNum, 10);
      this.pageParent
        .find("#btn-page-" + pageNum)
        .removeClass("locked")
        .removeAttr("disabled");
      return this._setNextBackButtonEnabled();
    };

    PageController.prototype.disablePage = function (pageNum) {
      var goBack, idx, j, k, ref, ref1, ref2;
      this.__disabledPages || (this.__disabledPages = {});
      this.__disabledPages[pageNum] = true;
      pageNum = parseInt(pageNum, 10);
      this.pageParent
        .find("#btn-page-" + pageNum)
        .attr("disabled", true)
        .addClass("locked");
      if (this.activePage === pageNum - 1) {
        idx = null;
        goBack = true;
        if (pageNum < this.pages.length) {
          for (
            idx = j = ref = pageNum + 1, ref1 = this.pages.length;
            ref <= ref1 ? j <= ref1 : j >= ref1;
            idx = ref <= ref1 ? ++j : --j
          ) {
            if (!this.__disabledPages[idx]) {
              this.moveTo(idx - 1, "auto", false);
              goBack = false;
              break;
            }
          }
        }
        if (goBack && pageNum > 1) {
          for (
            idx = k = ref2 = pageNum - 1;
            ref2 <= 1 ? k <= 1 : k >= 1;
            idx = ref2 <= 1 ? ++k : --k
          ) {
            if (!this.__disabledPages[idx]) {
              this.moveTo(idx - 1, "auto", false);
              break;
            }
          }
        }
      }
      return this._setNextBackButtonEnabled();
    };

    PageController.prototype.moveTo = function (idx, method, quickTurn) {
      var distance, fn, hide, newP, oldP, p, ref, ref1, ref2, ref3, time;
      if (!(idx >= 0 && idx < this.pages.length && idx !== this.activePage)) {
        return;
      }
      oldP =
        this.activePage != null
          ? this.myTabTitle + "page-" + (this.activePage + 1)
          : null;
      newP = this.myTabTitle + "page-" + (idx + 1);
      if (this.activePage != null) {
        document.dispatchEvent(
          new CustomEvent("beforePageTurn", {
            detail: {
              from: oldP,
              to: newP,
            },
          })
        );
      }

      this.pages.css("visibility", "visible");
      this.pageParent
        .find(".btn-page-num")
        .removeClass("page-active")
        .removeAttr("tabindex");
      this.pageParent
        .find("#btn-page-" + (idx + 1))
        .addClass("page-active")
        .attr("tabindex", -1);
      if (this.activePage != null) {
        distance =
          idx > this.activePage ? idx - this.activePage : this.activePage - idx;
      } else {
        distance = 0;
      }
      this.activePage = idx;
      this._setNextBackButtonEnabled();
      if (distance === 1) {
        time = 0.25;
      } else {
        time = 0.25 * (distance / 1.5);
      }
      if (method === "auto") {
        time = time * 2;
      }
      if (quickTurn) {
        time = 0;
      }
      this.pageContainer.css({
        "transition-duration": time + "s",
        "margin-top": "-" + this.pageTops[idx] + "px",
      });
      hide = (function (_this) {
        return function () {
          var j, len, ref4, results;
          ref4 = _this.pages;
          results = [];
          for (idx = j = 0, len = ref4.length; j < len; idx = ++j) {
            p = ref4[idx];
            if (idx !== _this.activePage) {
              results.push($(p).css("visibility", "hidden"));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
      })(this);
      setTimeout(hide, time * 1000 + 500);
      fn = (function (_this) {
        return function () {
          return document.dispatchEvent(
            new CustomEvent("afterPageTurn", {
              detail: {
                from: oldP,
                to: newP,
              },
            })
          );
        };
      })(this);
      return setTimeout(fn, time * 1000);
    };

    PageController.prototype.next = function (method) {
      var idx, j, ref, ref1;
      if (this.activePage > this.pages.length - 1) {
        return;
      }
      this.__disabledPages || (this.__disabledPages = {});
      for (
        idx = j = ref = this.activePage + 2, ref1 = this.pages.length;
        ref <= ref1 ? j <= ref1 : j >= ref1;
        idx = ref <= ref1 ? ++j : --j
      ) {
        if (!this.__disabledPages[idx]) {
          this.moveTo(idx - 1, method);
          return;
        }
      }
    };

    PageController.prototype.previous = function (method) {
      var idx, j, ref;
      if (!(this.activePage > 0)) {
        return;
      }
      this.__disabledPages || (this.__disabledPages = {});
      for (
        idx = j = ref = this.activePage;
        ref <= 1 ? j <= 1 : j >= 1;
        idx = ref <= 1 ? ++j : --j
      ) {
        if (!this.__disabledPages[idx]) {
          this.moveTo(idx - 1, method);
          return;
        }
      }
    };

    return PageController;
  })();
  parents = $(".card").parent();
  return (function () {
    var j, len, results;
    results = [];
    for (idx = j = 0, len = parents.length; j < len; idx = ++j) {
      par = parents[idx];
      results.push(new PageController($(par), idx));
    }
    return results;
  })();
}.call(this));
