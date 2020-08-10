@page keyboard-navigability.md Keyboard Navigability
@parent ux.basics

To comply with <a href="https://www.w3.org/TR/WCAG21/#keyboard" target="_blank">WCAG 2.1 success criterion 2.1.1</a>, all interactive elements should be keyboard navigable unless their operation “depends on the path of the user’s movement.” (For example, the scratchwork tool is not keyboard navigable because the shape of scratchwork marks depends on the path of the user’s stylus, mouse, or finger.)

In some cases, keyboard navigation for a particular interactive element is technically feasible, but it may be unduly burdensome to ask low-mobility users to interact with the element. For example, the [response-type-matching.css] response type can include numerous sources that must be placed in drop targets; this interaction takes considerably more effort when attempted via the keyboard. Care should be taken when including such interactions in low-mobility forms.

Additional information about accessible support for keyboard navigation can be found in the <a href="https://www.w3.org/TR/wai-aria-practices-1.1/" target="_blank">WAI-ARIA Authoring Practices 1.1</a>.

## Focus
When an interactive element has focus, it can be activated with the keyboard by hitting Space or Enter. As a user navigates through elements with a typical keyboard (by hitting Tab) or keyboard alternative, focus moves from one element to another. A visual indicator is provided to inform sighted users which element currently has focus. (See the [indicators.css] page for information about the styling of eNAEP’s focus indicator.)

## Tab Order
The order in which users navigate through interactive elements should be logical. In most cases, tab order should match the reading order for typically sighted speakers of left-to-right languages (i.e., top to bottom and left to right). Different tab orders may be more appropriate for special cases (e.g., a clockwise tab order may be more intuitive for interactive elements laid out in a circle).

## Dialogs
When a dialog is opened, focus should be given to the first interactive element (e.g., a button) in the dialog.

While a modal dialog is open, focus is restricted to interactive elements inside the dialog and to tools in the eNAEP system toolbar. That is, no elements behind the dialog’s backdrop should be focusable. (See the [dialogs.css] page for information about the difference between modal and non-modal dialogs.)

When a dialog is closed, focus should usually return to the element that opened the dialog.
