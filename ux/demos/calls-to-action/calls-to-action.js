// Open submit warning modal when Submit button is selected
$(".cta-submit-wrapper").children().click(function() {
  if (!$(this).hasClass('tts-active')) {
    $(this).parent().find('.btn').addClass('dialog-originator');

    if (typeof openDialog == 'function') {
      openDialog('SbtSubmit', $(this));
    } else {
      console.warn('Missing dialogs.js.');
    }
  }
});

//TODO: The following won't work if CTA is put in a multi-item context.
//Need to get index of selected item and pass that as nth-child selector to updateState.
updateState('.childItem.selected .btn-submit', 'disabled');
