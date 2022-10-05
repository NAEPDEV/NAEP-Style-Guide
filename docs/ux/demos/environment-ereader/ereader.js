//Questions Panel Controller

function PanelController() {
  if (state['ereader-panel'] == 'open') {
    updateState('ereader-panel', 'closed');
  } else if (state['ereader-panel'] == 'closed') {
    updateState('ereader-panel', 'open');
  }
}

$('#QuestionsButton').click(function (e) {
  PanelController();
});

$('#mask').click(function (e) {
  PanelController();
});

//Item tab Controller
(function () {
  var ItemTabController, ItemTabGen, StimTabController, StimTabGen;
  (bind = function (fn, me) {
    return function () {
      return fn.apply(me, arguments);
    };
  }),
    (indexOf =
      [].indexOf ||
      function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
          if (i in this && this[i] === item) return i;
        }
        return -1;
      });

  ItemTabController = (function () {
    function ItemTabController(arg) {
      var ref;
      (ref = arg != null ? arg : {}),
        (this.element = ref.element),
        (this.title = ref.title),
        (this.listitem = ref.listitem),
        (this.others = ref.others);
      this.setInactive = bind(this.setInactive, this);
      this.setActive = bind(this.setActive, this);
      this.tab = $("<li class='item'>" + this.title + '</li>');
      this.tab.click(this.setActive);
      $('ul.itemTab').append(this.tab);

      //Creates a list item on the review tab for each item
      this.listitem = $('<li>Question ' + this.title + '</li>');
      $('#list-review').append(this.listitem);
    }

    ItemTabController.prototype.setActive = function () {
      var c, j, len, ref;
      ref = this.others;

      if (this.tab.hasClass('selected')) {
        return false;
      }

      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        c.setInactive();
      }

      $('#enaepEreaderContainer').scrollTop(0);
      if (this.element.hasClass('large')) {
        $('#QuestionsPanel').removeClass('medium');
        $('#QuestionsPanel').addClass('large');
      } else if (this.element.hasClass('medium')) {
        $('#QuestionsPanel').removeClass('large');
        $('#QuestionsPanel').addClass('medium');
      } else {
        $('#QuestionsPanel').removeClass('large');
        $('#QuestionsPanel').removeClass('medium');
      }
      $('#enaepEreaderContainer').fadeOut(0).delay(250).fadeIn(200);

      //Shows selected item
      this.element.show();
      this.tab.addClass('selected');
      this.element.addClass('selected');
      if (typeof MoreBtnController == 'function') {
        MoreBtnController(300);
      } else {
        // console.warn('Missing scroll-indicator.js.');
      }
    };

    ItemTabController.prototype.setInactive = function () {
      this.element.hide();
      this.element.removeClass('selected');
      return this.tab.removeClass('selected');
    };

    return ItemTabController;
  })();

  ItemTabGen = (function () {
    function ItemTabGen() {
      var item, idx, j, len, ref, title;
      this.items = [];
      ref = $('.childItem');
      for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
        item = ref[idx];
        item = $(item);
        title = idx + 1;
        this.items.push(
          new ItemTabController({
            element: item,
            title: title,
            others: this.items,
          })
        );
      }
      $('ul.itemTab li').eq(0).addClass('selected');
      $('ul.itemTab li:last-child').html('Review');

      $('.childItem').hide();
      $('.childItem').eq(0).show();
      $('.childItem').eq(0).addClass('selected');

      $('#list-review li:last-of-type').remove();

      if ($('div.childItem').eq(0).hasClass('large')) {
        $('#QuestionsPanel').addClass('large');
      } else if ($('div.childItem').eq(0).hasClass('medium')) {
        $('#QuestionsPanel').addClass('medium');
      }
    }

    return ItemTabGen;
  })();

  StimTabController = (function () {
    function StimTabController(arg) {
      var ref;
      (ref = arg != null ? arg : {}),
        (this.element = ref.element),
        (this.title = ref.title),
        (this.listitem = ref.listitem),
        (this.others = ref.others);
      this.setInactive = bind(this.setInactive, this);
      this.setActive = bind(this.setActive, this);
      this.tab = $("<li class='stim'>" + this.title + '</li>');
      this.tab.click(this.setActive);
      $('ul.stimTab').append(this.tab);
    }

    StimTabController.prototype.setActive = function () {
      var c, j, len, ref;
      ref = this.others;

      if (this.tab.hasClass('selected')) {
        return false;
      }

      for (j = 0, len = ref.length; j < len; j++) {
        c = ref[j];
        c.setInactive();
      }

      $('.stim-container').fadeOut(0).delay(250).fadeIn(200);

      //Shows selected item
      this.element.show();
      this.tab.addClass('selected');
      this.element.addClass('selected');
    };

    StimTabController.prototype.setInactive = function () {
      this.element.hide();
      this.element.removeClass('selected');
      return this.tab.removeClass('selected');
    };

    return StimTabController;
  })();

  StimTabGen = (function () {
    function StimTabGen() {
      var item, idx, j, len, ref, title;
      this.items = [];
      ref = $('.childStim');
      for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
        item = ref[idx];
        item = $(item);
        title = $(item).data('title');
        this.items.push(
          new StimTabController({
            element: item,
            title: title,
            others: this.items,
          })
        );
      }
      $('ul.stimTab li:first-child').addClass('selected');
      $('.childStim').hide();
      $('.childStim').eq(0).show();
      $('.childStim').eq(0).addClass('selected');
    }

    return StimTabGen;
  })();

  $(function () {
    window.ItemTabGen = new ItemTabGen();
    return (window.StimTabGen = new StimTabGen());
  });
}.call(this));
