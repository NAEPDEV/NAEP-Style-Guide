@page colors.md Colors
@parent ux.basics

## Palette

The eNAEP user interface (UI) predominantly uses shades of gray to establish a visual hierarchy. Interactivity is most commonly indicated by shades of eNAEP blue `hue: 210°` <span class="callout-swatch" style="background-color:#2478cc"></span>, though other colors are also used.

Text and other visual indications (e.g., icons) should accompany the use of color so that its meaning is clear both to typically sighted test takers and to test takers who cannot perceive color differences.

### SBT Considerations <img src="static/img/icon-asterisk.svg"/>

SBTs often have custom color palettes to establish a look and feel appropriate to the context of the task. When departing from NAEP’s typical colors, SBT designers must be mindful of the connotations that American users commonly associate with various colors (e.g., red is often used to connote danger) and must ensure that all visual elements are contrast compliant (see below).

## Contrast

To increase the likelihood that content will be perceivable to low-vision test takers, NAEP complies with the <a href="https://www.w3.org/TR/WCAG21/#non-text-contrast" target="_blank">WCAG 2.1 criterion for non-text contrast</a>, which specifies that the essential visual information conveyed by UI elements “have a contrast ratio of at least 3:1 against adjacent color(s).”

WCAG defines <a href="https://www.w3.org/TR/WCAG21/#dfn-essential" target="_blank">essential information</a> as any information that, “if removed, would fundamentally change the information or functionality of the content” and that “cannot be achieved in another way.” Determining what is essential requires judgment, but the following guidelines are useful:

- Element content (e.g., labels, icons) is generally essential. (A counter-example: a button has both an icon and a label. Only the label would likely be considered essential.)
- Element boundaries are essential. (For example, a button’s fill must be compliant with respect to the surrounding background.)
- Indicators of non-transitory states (e.g., focus, selection) are essential. (A hover state is an example of a transitory state. Hover states generally don’t need to be perceived to successfully interact with a UI component.)

Additional clarification and examples of compliant and non-compliant UI components can be found <a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html" target="_blank">here</a>. <a href="https://developer.paciellogroup.com/resources/contrastanalyser/" target="_blank">This tool</a> can be used to check contrast compliance. Color specifications for individual UI elements can be found on their respective pages.
