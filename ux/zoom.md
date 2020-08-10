@page zoom.md Zoom
@parent ux.features

As a universal design feature, eNAEP offers four zoom levels: 100% (default), 133%, 167%, and 200%.

Test takers may shift between zoom levels by using the __Zoom In__ and __Zoom Out__ buttons on the [system-toolbar.css]. When at the default zoom level, the __Zoom Out__ button is disabled. When at the maximum zoom level, the __Zoom In__ button is disabled.

The content area (i.e., the area below the system toolbar and the item tabs, if present) zooms isometrically; that is, it zooms as a single unit. At higher zoom levels, scrollbars and the scroll indicator appear based on the conditions described in the [navigation.css] and [indicators.css] pages, respectively.

The following elements do not increase in size at higher zoom levels.
* [calculators.css]
* [equation-editor.css]
* Item and stimulus tab bars (see [navigation.css] page)
* Loading indicator (see [indicators.css] page)
* Scroll indicator (see [indicators.css] page)
* Scrollbars (see [navigation.css] page)
* Show Questions button (see [environment-ereader.css] page)
* [system-toolbar.css]
* [writing-editor.css] panel divider, editor toolbar, info flags, and dialogs (spell check, spell check options, and thesaurus)

_Demo is shown at 50% actual size. To see a full-size demo, click <a href="demos/full-demos/default-environment-demo.html" target="_blank">here</a>._
@iframe ux/demos/zoom/zoom.html 510
