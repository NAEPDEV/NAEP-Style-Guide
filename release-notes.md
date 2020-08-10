# Style Guide for NAEP Assessments

Release notes are now maintained in the `version-history.md` file of each guide section.

## v0.1.1
* Improved alignment of alert message icon for >2 lines of text.
* Context menu specs and demo added to writing editor page.
* Add inverted variant to calls-to-action page.

### Known issues
* Select-in-stimulus variants from Source Container IIC need added; awaiting redesign.
* Keyboard navigation for accordions shouldn't work when TTS is on.

## v0.1.0 — December 17, 2017
* Since versioning is only possible at the global level, rolled back version number to 0.1.0 to allow for additions to non-UX sections.
* Added writing editor specs, except for context menu.
* Added version dropdown menu to guide. (Currently unpopulated since this is the initial version.)
* Added Version History page under "About" section.
* Added placeholders for Media section, Item Development section, and Version Scope page.
* Added demos and specs for ruler, slider, image layers, sortable tables, and selectable tables.
* Added icons for sortable tables to icon font.
* Added max-character limit dialog to Dialogs page.
* Implemented TTS for SIP.
* Added an intro screen variant that includes a task character.
* Back/Next buttons now fully functional.
* Implemented minimum-select behavior (tab darkens, item removed from review tab).
* Keyboard nav added to accordions, with one known issue.
* Bug fixes:
  * Added missing rotate-left icon label on Icons page.
  * Check to see if scroll indicator is needed on tab change.
  * Stroke width for selections in MS zones demo fixed.
  * Add touch support for non-modal dialogs and matching options.
  * Grid table borders now zoom correctly.
  * Various minor fixes to accordion demo.
  * Various minor fixes to writing editor demo.

### Known Issues
* Select-in-stimulus variants from Source Container IIC need added; awaiting redesign.
* Context menu specs and demo need added to writing editor page; awaiting specs from 2019 eNAEP requirements gathering.
* Keyboard navigation for accordions shouldn't work when TTS is on.

## v1.4.7 — November 21, 2017
* Zoom page and demo added.
* Accordion menu demo added.
* Custom element now used for video closed captions to avoid collisions with video controls in full-screen mode.
* Steps in step indicator demo now interactive.
* In full-body task character demo, character name added to top of speech bubble, and spec added indicating that name is optional.
* Keyboard navigation now working for all components except those noted in known issues.
* Specification additions and clarifications:
  * Multimedia behavioral specs from the SBT Production Guide integrated.
  * Language for text entry validation dialogs specified.
  * Behavior of inline-choice menus specified.
  * Behavior of multi-use matching sources clarified.
  * Behavior of task character VO buttons after user returns to previously visited screen clarified.
  * Margins for calls-to-action clarified.
  * Allowable variance in line length clarified.
  * Behavior of short-text pop-ups in TTS mode clarified.
  * Behavior of inline-choice menus in TTS mode specified.
  * States of TTS speakable units specified.
* Bug fixes:
  * Hover state for grid table rows no longer displays when TTS is active.
  * Non-modal dialog now has drop shadow in dark theme.
  * Multimedia now pauses when TTS is activated.
  * Matching sources now get TTS borders in TTS mode.
  * Task character labels can no longer change VO button state in TTS mode.
  * Alert Message TTS focus ring now has correct offset.
  * TTS units in grids no longer take up the full width and height of the parent cell.
  * Clear Answer button for grid items now correctly aligned to left edge of grid table.
  * Distinct style of task character VO button now changes to blue when VO is playing.
  * Selecting a reference button when a non-modal dialog is open now closes the dialog.
  * Writing editor is now fully WCAG color contrast compliant.
  * Border width corrected for "When you are finished" section of Review Screen.
  * Corrected margin between calls-to-action and preceding textareas.
  * Loading indicator is no longer user-selectable.
  * Scrollbar size in Equation Editor demos fixed.
  * Inline-choice menu option states in non-default themes now correct.

### Known Issues
* Select-in-stimulus variants from Source Container IIC need added; awaiting redesign.
* Writing Editor specs need finished.
* TTS needs implemented for select-in-passage.
* Need to add an intro screen variant that includes a task character.
* Add a version dropdown.
* Keyboard navigation needs added to:
  * Tabs
  * Accordion menus


## v1.4.3 — October 29, 2017
* Calls-to-action specs and demo updated after review by NAEP UX team.
* Writing editor demo added.
* Writing editor icons added to icon set.
* Minor fixes:
  * Inline-choice dropdown menus now close when TTS is enabled, per spec.
  * Text-to-speech borders added to character portrait labels.
  * Width of single-column layout in default environment now matches eNAEP.
  * Scroll indicator logic generalized to work across environments.
  * Buttons now retain active state during mousedown, even if cursor is not hovered over button.

### Known Issues
* The multimedia behavioral specs from the SBT Production Guide need integrated.
* Select-in-stimulus variants from Source Container IIC need added.
* Writing Editor specs need added.
* Hover state for grid table rows shouldn't display when TTS is on.
* Various keyboard navigation issues need resolved.
* Selecting a reference button when a non-modal dialog is open should close the dialog.
* Demos for the following pages need added (low priority):
  * Interactive step indicator
  * Progressive disclosure

## v1.4.2 — October 24, 2017
* Added Containers page to SBT section.
* Reference pop-ups renamed "non-modal dialogs" and integrated into Dialogs page.
* Typography section from SBT Production Guide integrated.
* Added circular buttons to Buttons page.
* Added max-character alert to text entry demos.
* Added minus-thin and cross-thin icons to icon set.
* Renamed "Progressive Disclosure" to "Accordion Menus" for clarity.
* Various demos added to guide:
  * Calls to action (in progress)
  * Characters & dialogue
  * Intro & exit screens
  * Look-back buttons
  * Non-modal dialogs
* Revised specs for following pages for clarity and comprehensiveness:
  * Intro & exit screens
  * Characters & dialogue

### Known Issues
* Calls-to-action specs don’t match demo. (Team still ironing out design.)
* The multimedia behavioral specs from the SBT Production Guide need integrated.
* Select-in-stimulus variants from Source Container IIC need added.
* Writing Editor specs and demo need added.
* Hover state for grid table rows shouldn't display when TTS is on.
* Various keyboard navigation issues need resolved.
* Demos for the following pages need added (low priority):
  * Interactive step indicator
  * Progressive disclosure

## v1.4.0 — October 15, 2017
* Various pages added to guide:
  * Alert messages
  * Calls to action
  * Characters & dialogue
  * Element transforms
  * Intro & exit screens
  * Keyboard navigability
  * Look-back buttons
  * Progressive disclosure
  * Reference pop-ups
  * Step indicator
  * Touch targets
* SBT-specific information added to multiple pages:
  * Colors
  * Default environment
  * Dialogs
  * Grid response type
  * Icons
  * Matching response type
  * Multimedia controls
  * Navigation
  * Select-in-passage response type
  * Short-text pop-ups
  * Text entry response type
* Introduction page updated to better match content of expanded guide.
* Review screen, short-text pop-ups, and system toolbar pages moved to Features section.
* Added behavior for text-to-speech:
  * All UI elements now disable when TTS is on.
  * TTS content groupings now focusable.
  * Alignment of TTS content grouping borders fixed in multiple-choice options.
  * MC options no longer change state when a TTS content grouping is selected.
* Fixed specs for when each calculator is used.
* Updated the names of the non-default color themes.
* Added audio variant demo to multimedia controls page.
* Default width for grid option column widths now specified.
* Grid table markup refactored to be more semantic.
* Various bug fixes:
  * Added backgrounds to checkboxes so that checks are the same color as the page background in all themes.
  * Corrected max-width for Extended Text textareas.
  * Scrollbar styles now correctly match those in eNAEP in both full and 67%-size demos.


### Known Issues
* Demos for the following pages need added:
  * Calls to action
  * Characters & dialogue
  * Intro & exit screens
  * Look-back buttons
  * Progressive disclosure
  * Reference pop-ups
* The following sections from the SBT Production Guide need integrated:
  * Containers
  * Multimedia behavioral specs
  * Typography
* Select-in-stimulus variants from Source Container IIC need added.
* Writing Editor specs and demo need added.
* Hover state for grid table rows shouldn't display when TTS is on.
* Various keyboard navigation issues need resolved.

## v1.0.0 — September 5, 2017
 * Updated tab background colors to ensure tab borders and background are distinguishable in the answered state.
 * Added icons for the Equation Editor.
 * Fixed bug allowing multiple inline-choice dropdowns to be open at once.
 * Corrected written spec for text area width.
 * Finished written specs for multimedia control behavior.
 * Added theming for pagination buttons on Navigation page.
 * Added variant of pagination controls demo with locked pages.
 * Added variant of eReader environment demo with stimulus tabs.

### Known Issues
 * Writing Editor specs and demo need added. (Low priority until writing is in the field again.)

## v0.9.5 — August 14, 2017
 * Added pagination controls demo and documentation to Navigation section.
 * Updated eReader environment demo to display at 67% by default. Also now has dummy stimulus.
 * Added eReader environment documentation.
 * Added lock icon to icon font.
 * Various minor editorial fixes.

### Known Issues
 * Multimedia controls documentation needs finished.
 * Equation Editor and Writing Editor icons missing from icon font.
 * Variant of pagination controls demo with locked pages needs added.
 * Variant of eReader environment demo with stimulus tabs needs added.
 * Bug in inline-choice dropdown can cause multiple dropdowns to be open at once.

## v0.9.2 — August 14, 2017
 * Added multimedia controls demo and most of documentation to guide.
 * Added eReader environment demo to guide.

### Known Issues
 * Multimedia controls documentation needs finished.
 * eReader environment documentation needs added.
 * Stimulus pagination controls section needs added to Navigation page.
 * Equation Editor and Writing Editor icons missing from icon font.
 * Bug in inline-choice dropdown can cause multiple dropdowns to be open at once.

## v0.9.0 — August 6, 2017
 * Added Equation Editor to guide.
 * Added calculators to guide.
 * Added full-size versions of demos shown at <100% by default.
 * Select-in-passage
   - Added written specifications for select-in-passage.
   - Added max-selection alert to Select-in-passage demo.
   - Changed content of select-in-passage in-stem directions to adhere to spec for default environment.
 * Added raise-hand icon (for HHOTs instructional screens).
 * Added general description of matching response type.
 * Various minor editing and bug fixes.

### Known Issues
 * Multimedia controls page needs added.
 * eReader environment page needs added.
 * Stimulus pagination controls section need added to Navigation page.
 * Equation Editor and Writing Editor icons missing from icon font.
 * Bug in inline-choice dropdown can cause multiple dropdowns to be open at once.

### Roadmap
 * v1.0: Address all current known issues.
 * v1.5: Integrate SBT Production Guide.
 * v2.0: Integrate IIC mockups.
 * v3.0: Add media section.

## v0.8.7 — July 24, 2017
 * Added Select-in-passage demo.
 * Corrected various icon issues and updated associated demos.

## v0.8.6 — July 21, 2017
 * Added Select-in-passage icon to icon set and fixed chevron icons.

## v0.8.5 — July 5, 2017
 * Various bug fixes.
 * Removed blur from dialog backdrop.
 * Theming guidelines added to Color Theming section.

### Known Issues
 * Various icons missing from icon font.
 * The following sections need added:
  - Multimedia controls
  - eReader environment
  - Select-in-passage item type
  - Pagination controls (specific to eReader)
  - Calculator
  - Equation editor
  - Writing environment

## v0.8.0 — July 4, 2017
 * Numerous sections added and updated.

### Known Issues
 * Various icons missing from icon font.
 * Matching item draggable objects lose styling when placed in drop targets.
 * Next, Scratchwork, and Timer buttons are not disabled when TTS is active.
 * TTS borders on images in Color Themes section are theming.
 * Text entry fields are not disabled when TTS is active.
 * Theming guidelines need added to Color Theming section.
 * The following sections need added:
  - Multimedia controls
  - eReader environment
  - Select-in-passage item type
  - Pagination controls (specific to eReader)
  - Calculator
  - Equation editor
  - Writing environment

### Known changes to existing styles
 * The following elements were updated for WCAG 2.1 color contrast compliance:
  - Loading indicator
  - Warning icon on review screen
  - Text entry field borders (see http://www.glendathegood.com/a11y/lvtf/textinputborder.html)
