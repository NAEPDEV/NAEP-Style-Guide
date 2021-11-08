@page color-themes.md Change Themes
@parent ux.features

Test takers with atypical vision may prefer or need color schemes that would be less than ideal for typically sighted people. To support such test takers and to adhere to the <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum" target="_blank">WCAG 2.1 minimum contrast criterion</a>, eNAEP can present content in three color themes.

- **Default**. Initially shown to all test takers. This theme features black text on a white background.
- **Beige**. Similar to the default theme, but applies a beige background to slightly reduce contrast and brightness. The backgrounds of user interface (UI) components may be shifted to shades of beige to align with the theme, but foreground colors generally remain the same as in the default theme.
- **Dark**. Inverts the colors of the default theme to reduce brightness while retaining high contrast. UI components are darkened/lightened to align with the theme.

Changing themes is a universal design feature, so all test takers can change the theme as they wish.

Use the <img src="static/img/icon-theme.svg" style="max-height: 1.75em; max-width: 1.75em;" />**Change Theme** button at the top of the page to see how theming affects demo content throughout the style guide.

## Image Theming

Images are authored to be compliant with the <a href="https://www.w3.org/TR/WCAG21/#non-text-contrast" target="_blank">WCAG 2.1 non-text contrast criterion</a> whenever content requirements allow, so theming images is not required to achieve an accessible contrast ratio. However, it is still desirable to theme images when possible so that they have a brightness similar to the rest of the screen.

- In the beige theme, themed images behave similarly to text: their backgrounds change to beige, but their foregrounds do not change.
- In the dark theme, themed images are typically converted to grayscale and then converted to negative (though there is greater flexibility in scenario-based tasks to use different manipulations to achieve the theme’s goal of low-brightness, high-contrast).

Item developers determine whether an image should theme by evaluating whether theming would cause a loss of visual information essential to understanding the item. If essential information would be lost, the image cannot theme.

- Tables, charts, and diagrams typically **can** be themed without loss of essential information.
- Photographs typically **cannot** be themed.

## Theming Tags

By default, eNAEP themes images based on file type. Images with the `.PNG` extension theme, while images with the `.JPG` extension do not. The characteristics of the two file types are beyond the scope of this guide, but the most salient difference is that `.PNG` files can have transparent backgrounds, while `.JPG` files cannot. This means that images without backgrounds theme by default in eNAEP.

The following demo presents eNAEP's image theming behavior.
@iframe ux/demos/color-themes/color-themes-default.html 230
<span style="font-size:13px;display:block;margin-top:-30px">To view alternative presentations and styling, use the Change Theme <img src="static/img/icon-theme.svg" style="max-height: 1.75em; max-width: 1.75em;" /> and Read Aloud <img src="static/img/icon-tts.svg" style="max-height: 1.75em; max-width: 1.75em;" /> buttons in the upper-right of the screen.</span>

Note that, because it has a transparent background, the image of the otter themes even though theming causes a loss of visual information.

To avoid such situations, images can be tagged with `theme` and `no-theme` to override the default theming behavior. The demos below show what the five images would look like with each tag. (Note that these demos show what theming behavior is _possible_, not necessarily what is _desirable_.)

Tagged with `theme`:
@iframe ux/demos/color-themes/color-themes-theme.html 230
<span style="font-size:13px;display:block;margin-top:-30px">To view alternative presentations and styling, use the Change Theme <img src="static/img/icon-theme.svg" style="max-height: 1.75em; max-width: 1.75em;" /> and Read Aloud <img src="static/img/icon-tts.svg" style="max-height: 1.75em; max-width: 1.75em;" /> buttons in the upper-right of the screen.</span>

Tagged with `no-theme`:
@iframe ux/demos/color-themes/color-themes-no-theme.html 230
<span style="font-size:13px;display:block;margin-top:-30px">To view alternative presentations and styling, use the Change Theme <img src="static/img/icon-theme.svg" style="max-height: 1.75em; max-width: 1.75em;" /> and Read Aloud <img src="static/img/icon-tts.svg" style="max-height: 1.75em; max-width: 1.75em;" /> buttons in the upper-right of the screen.</span>

Finally, the following demo shows the desired theming behavior for all images: the line art bicycle and the pie chart theme, while the photographs do not.
@iframe ux/demos/color-themes/color-themes-desired.html 230

<span style="font-size:13px;display:block;margin-top:-30px">To view alternative presentations and styling, use the Change Theme <img src="static/img/icon-theme.svg" style="max-height: 1.75em; max-width: 1.75em;" /> and Read Aloud <img src="static/img/icon-tts.svg" style="max-height: 1.75em; max-width: 1.75em;" /> buttons in the upper-right of the screen.</span>

## Exceptions

The following elements do not theme.

- Video content
- [equation-editor.css]
- [calculators.css]
- Scratchwork markings
- Tooltips
