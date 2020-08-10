@page version-scope.md Version Scope
@parent ux.overview

This table indicates the version of the UX section applicable to each product (i.e., each chunk of content rendered using a single code library). You can use the _Columns_ menu to change which columns are displayed.

<div class="tablesorter-container">

  <div class="dropdown-wrapper">
    <button class="btn btn-secondary dropdown-toggle">Columns</button>
    <div id="tablesorter-column-selector" class="dropdown-menu tablesorter-column-selector">
      <!-- this div is where the column selector is added -->
    </div>
  </div>

  <div class="dropdown-wrapper tablesorter-download-wrapper">
    <button class="btn btn-secondary dropdown-toggle">Export</button>
    <div class="dropdown-menu dropdown-full-justify" role="menu">
      <label for="output-headers">
        <span>Include headers</span>
        <input type="checkbox" id="output-headers" checked="" tabindex="-1" />
        <span></span>
      </label>
      <label for="output-filter" class="output-filter-all">
        <span>Only include visible rows</span>
        <input type="checkbox" id="output-filter" checked="" tabindex="-1" />
        <span></span>
      </label>
      <hr />
      <label for="output-filename">
        <span>Save as:</span>
        <input id="output-filename" type="text" size="18" value="ux-version-scope.csv" tabindex="-1" />
      </label>
      <button id="tablesorter-download" class="btn dropdown-submit" tabindex="-1">Export</button>
    </div>
  </div>

  <button class="btn btn-secondary tablesorter-reset">Reset</button>

  <div id="version-scope-table"></div>

</div>
