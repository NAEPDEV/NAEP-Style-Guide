//Displays alert if guide is opened in a browser other than Chrome
(function() {
  if (navigator.userAgent.search("Chrome") >= 0) {
    return;
  } else {
    $('.browser-alert').removeClass('hidden');
  }
})();

//Version scope table configuration. See https://mottie.github.io/tablesorter/ for more info.
if ($('#version-scope-table').length) {
  $("#version-scope-table").tablesorter({
    widthFixed: false,
    headerTemplate: '{content} {icon}', // Add icon for various themes
    sortList: [[0,1],[2,0],[3,0],[1,0]], // Initial sort in descending order on 1st column, then ascending order on 3rd, 4th, then 2nd columns
    sortRestart : true, // Resets the sort direction so that clicking on an unsorted column will sort in the sortInitialOrder direction
    sortLocaleCompare: true, // Convert accented characters to their equivalents to ensure correct sorting
    headers : {
      0 : { sortInitialOrder: 'desc' },
      1 : { sortInitialOrder: 'asc' },
      2 : { sortInitialOrder: 'asc' },
      3 : { sortInitialOrder: 'asc' },
      4 : { sortInitialOrder: 'desc' }
    },

    widgets: ['zebra', 'columnSelector', 'stickyHeaders', 'filter', 'output'],

    widgetOptions: {
      build_type      : 'csv',
      build_source    : { url: 'version-scope.csv', dataType: 'text' },
      build_headers : {
        widths  : [ '6em', '14em', '9em', '10em', '10em' ] // set header cell widths
      },
      // target the column selector markup
      columnSelector_container : $('#tablesorter-column-selector'),
      // column selector container layout
      columnSelector_layout : '<label><input type="checkbox"  tabindex="-1" /><span></span><span>{name}</span></label>',
      // set media query display priorities for non-critical columns
      // columnSelector_layoutCustomizer: function($cell, name, index) {
      //   if (name === 'Subject') {
      //     $cell.parent().attr('data-priority',2);
      //   } else if (name === 'Product Type') {
      //     $cell.parent().attr('data-priority',1);
      //   }
      //   return name;
      // },
      // remove critical columns (Product and Section Version) from column selector dropdown
      columnSelector_columns : {
        0 : "disable", /* remove column 1 from selector */
        1 : "disable", /* remove column 2 from selector */
        4 : "disable" /* remove column 4 from selector */
      },
      columnSelector_mediaquery : false,
      // column selector toggle checkbox name
      // columnSelector_mediaqueryName: 'Auto',
      // responsive table hides columns with priority 1-6 at these breakpoints
      // columnSelector_breakpoints : [ '715px', '880px', '40em', '50em', '60em', '70em' ],
      // trigger "resize" event on headers
      stickyHeaders_addResizeEvent: true,
      // jQuery selector or object to attach sticky header to
      stickyHeaders_attachTo: 'body',
      // scroll table top into view after filtering
      stickyHeaders_filteredToTop: true,

      filter_reset: '.tablesorter-reset',
      filter_placeholder: {
        search: 'Filter',
        select: ''
      },

      // set output to download
      output_delivery: 'd'
    }
  });

  var tblContainer = $('.tablesorter-container'),
    btnToggle = '.dropdown-toggle',
    menu = '.dropdown-menu, .dropdown-menu *',
    menuWrapper = '.dropdown-wrapper',
    toggledClass = 'dropdown-toggled',
    btnReset = tblContainer.find('.tablesorter-reset'),
    $table = tblContainer.find('table'),
    wo = $table[0].config.widgetOptions;

  // clicking the download button triggers an "output" event on the table
  tblContainer.find('#tablesorter-download').click(function() {
    var val = tblContainer.find('.output-filter-all :checked').attr('id');

    wo.output_saveRows = val === 'output-filter' ? 'f' : 'a';

    wo.output_saveFileName = tblContainer.find('#output-filename').val();

    wo.output_includeHeader = tblContainer.find('#output-headers').is(':checked');
    wo.output_headerRows = tblContainer.find('#output-headers').is(':checked');

    $table.trigger('outputTable');
    return false;
  });

  btnReset.click(function(e) {
    $table.trigger( 'sorton', [ [[0,1],[2,0],[3,0],[1,0]] ] ).trigger('refreshColumnSelector', [ [2,3] ]);
  });

  //Closes all dropdown menus
  function closeMenus() {
    $(menuWrapper).removeClass(toggledClass);
    $('.dropdown-menu').find('input, button').attr('tabindex', -1);
  }

  //Dropdown menu controller
  $(document).click(function(e) {
    var target = $(e.target),
      parent = target.closest(menuWrapper),
      menuItems = target.siblings('.dropdown-menu').find('input, button');

    if (target.is(btnToggle) && !parent.hasClass(toggledClass)) {
      closeMenus()
      parent.addClass(toggledClass);
      menuItems.attr('tabindex', 0);
    } else if (target.is(menu)) {
      return;
    } else {
      closeMenus();
    }
  });
}

(function() {
  var toggle = $("#btn-menu-toggle"),
    backdrop = $("#menu-backdrop"),
    btnTheme = $("#btn-theme"),
    btnTts = $("#btn-tts"),
    btnTop = $("#top-button"),
    sidebar = $('#sidebar'),
    body = $('body'),
    frames = window.frames,
    ttsState;

  function toggleMenu() {
    sidebar.toggleClass("hidden");
    backdrop.toggleClass("hidden");
  }

  function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop == to) return;
      scrollTo(element, to, duration - 10);
    }, 10);
  }

  //Toggle menu controller
  toggle.click(function() {
    toggleMenu();
  });

  //Toggle menu via backdrop
  backdrop.click(function() {
    toggleMenu();
  });

  state = {
    'theme': 'default',
    'tts': 'off'
  }

  // addEventListener support for IE8
  function bindEvent(element, eventName, eventHandler) {
    if (element.addEventListener) {
      element.addEventListener(eventName, eventHandler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, eventHandler);
    }
  }

  // Send a message to the child iframe
  var sendMessage = function(msg) {
    // Make sure you are sending a string, and to stringify JSON

    for (var i = 0; i < frames.length; i++) {
      frames[i].window.postMessage(msg, '*');
    }
  };

  // Listen to message from child window
  bindEvent(window, 'message', function(e) {
    var arr = e.data.split(',');

    updateState(arr[0], arr[1], 'iframe');
  });

  // Update state
  function updateState(k, v, source) {
    state[k] = v;

    //Theme
    if (k == 'theme' && source != 'iframe') {
      if (state['theme'] == 'default') {
        sendMessage('theme,default');
      } else if (state['theme'] == 'beige') {
        sendMessage('theme,beige');
      } else if (state['theme'] == 'dark') {
        sendMessage('theme,dark');
      }
  }

    //TTS
    if (state['tts'] == 'on') {
      if (source != 'iframe') {
        sendMessage('tts,on');
      }
      btnTts.addClass('active');
    } else if (state['tts'] == 'off') {
      if (source != 'iframe') {
        sendMessage('tts,off');
      }
      btnTts.removeClass('active');
    }
  }

  //Change theme controller
  btnTheme.click(function() {
    if (state['theme'] == 'default') {
      updateState('theme', 'beige');
    } else if (state['theme'] == 'beige') {
      updateState('theme', 'dark');
    } else if (state['theme'] == 'dark') {
      updateState('theme', 'default');
    }
  });

  //Text-to-speech indicator controller
  btnTts.click(function() {
    if (state['tts'] == 'on') {
      updateState('tts', 'off', 'guide');
    } else if (state['tts'] == 'off') {
      updateState('tts', 'on', 'guide');
    }
  });

  //Scroll-to-top button controller
  btnTop.click(function() {
    scrollTo(document.body, 0, 500);
  });

  body.scroll(function() {
    if (body.scrollTop() > 300) {
      btnTop.removeClass('hidden');
    } else {
      btnTop.addClass('hidden');
    }
  });


})();
