// Fetch the list of available voices
function loadVoices() {
  var voices = speechSynthesis.getVoices();
}

// Check for browser support
if ('speechSynthesis' in window) {
  // Execute loadVoices
  loadVoices();
  // Chrome loads voices asynchronously
  window.speechSynthesis.onvoiceschanged = function(e) {
    loadVoices();
  };

  // Create a new utterance for the selected TTS speakable unit and add it to the queue
  function speak(text) {
    // Create a new instance of SpeechSynthesisUtterance
    var msg = new SpeechSynthesisUtterance();
    // Set the voice
    msg.voice = speechSynthesis.getVoices().filter(function(voice) {
      return voice.name == 'Google US English';
    })[0];
    // Set the text
    msg.text = text;
    // Queue this utterance
    window.speechSynthesis.speak(msg);
  }

  // Delegated event listener for when a TTS speakable unit is selected
  $('body').on('click', '.tts-active', function() {
    window.speechSynthesis.cancel();
    var target = $(this),
      text;
    if (target.is('.standalone-image')) {
      text = $(this).attr('title');
      speak(text);
    } else if (target.is('tr')) {
      text = $(this).find('[class*="-content"]').text();
      speak(text);
    } else {
      text = $(this).text();
      speak(text);
    }
  });

} else {
  console.warn('Web speech synthesis is not supported by this browser.')
}
