function initializeMediaControls(mediaContainer) {

  // Set up custom controls
  var media = mediaContainer.querySelector('.media'),
    mediaControls = mediaContainer.querySelector('.media-controls'),
    tracks = media.textTracks[0],
    customTrack = mediaContainer.querySelector('.video-custom-track'),
    customTrackWrapper = mediaContainer.querySelector('.video-custom-track-wrapper'),
    progressContainer = mediaContainer.querySelector('.media-progress-container'),
    tooltipSeek = mediaContainer.querySelector('.media-tooltip-seek'),
    hover = mediaContainer.querySelector('.media-hover'),
    progress = mediaContainer.querySelector('.media-progress'),
    seek = mediaContainer.querySelector('.media-seek'),
    heroplay = mediaContainer.querySelector('.video-hero-play'),
    play = mediaContainer.querySelector('.media-btn-playpause'),
    tooltipPlay = mediaContainer.querySelector('.media-btn-playpause-tooltip'),
    timeCurrent = mediaContainer.querySelector('.media-time-current'),
    timeDuration = mediaContainer.querySelector('.media-time-duration'),
    mute = mediaContainer.querySelector('.media-btn-mute'),
    tooltipMute = mediaContainer.querySelector('.media-btn-mute-tooltip'),
    volume = mediaContainer.querySelector('.media-volume'),
    volumeProgress = mediaContainer.querySelector('.media-volume-progress'),
    volValue = volume.value,
    cc = mediaContainer.querySelector('.video-btn-cc'),
    tooltipCC = mediaContainer.querySelector('.video-btn-cc-tooltip'),
    fullscreen = mediaContainer.querySelector('.video-btn-fs'),
    tooltipFS = mediaContainer.querySelector('.video-btn-fs-tooltip');

  // Format time values
  function formatTime(timeVal) {
    var seconds = Math.round(timeVal),
      minutes = Math.floor(timeVal / 60);
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

  // Get position of object relative to root
  function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
      } while (obj = obj.offsetParent);
      return curleft;
    }
  }

  // Set up play-pause
  function playPause() {
    if (media.paused) {
      media.play();
      play.classList.remove('icon-play');
      play.classList.add('icon-pause');
      heroplay.classList.add('paused');
      tooltipPlay.innerHTML = 'Pause';
    } else {
      media.pause();
      play.classList.remove('icon-pause');
      play.classList.add('icon-play');
      heroplay.classList.remove('paused');
      tooltipPlay.innerHTML = 'Play';
    }
  }

  // Set up control and cursor hiding in fullscreen mode
  function fadeInControls() {
    if (media.paused) {
      mediaContainer.classList.remove('fadeout');
      heroplay.style.cursor = 'pointer';
      clearTimeout(fadeOut);
    } else {
      mediaContainer.classList.remove('fadeout');
      heroplay.style.cursor = 'pointer';
      clearTimeout(fadeOut);
      fadeOut = setTimeout(function() {
        mediaContainer.classList.add('fadeout');
        heroplay.style.cursor = 'none';
      }, 3000);
    }
  }

  // Handle behavior for exiting fullscreen mode
  function exitFullScreen() {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    isFullscreen = false;
    mediaContainer.classList.remove('full-screen');
    fullscreen.classList.remove('icon-fullscreen-exit');
    fullscreen.classList.add('icon-fullscreen');
    tooltipFS.innerHTML = "Full&nbsp;screen";
  }

  // Listen for fullscreen events and run exitFullScreen() on exit
  function fullScreenListen() {
    var state = document.fullScreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
    if (!state) {
      exitFullScreen();
    }
  }

  // Hide the default controls
  media.controls = false;
  mediaControls.classList.remove('hidden');

  // Reset position of seek and volume sliders on load (FireFox retains slider values after refresh.)
  seek.value = 0;
  volume.value = 1;

  // Set up time values
  var i = setInterval(function() {
    if (media.readyState > 0) {
      // Set max value for progress and seek bars
      seek.setAttribute('max', media.duration * 10);
      progress.setAttribute('max', media.duration * 10);

      // Put the formatted duration in the display
      timeDuration.innerHTML = formatTime(media.duration);
      clearInterval(i);
    }
  }, 200);

  // Change media time when seek changes
  seek.addEventListener('input', function() {
    media.currentTime = seek.value / 10;
  }, false);

  // Change seek and progress bar positions and current time as media plays
  media.addEventListener('timeupdate', function() {
    if (media.currentTime >= progress.value / 10) {
      progress.value = media.currentTime * 10;
    }
    seek.value = media.currentTime * 10;
    timeCurrent.innerHTML = formatTime(media.currentTime);
  }, false);

  // Set up hover effects for scrub bar

  //    Show tooltip and hover progress on mouseover
  progressContainer.addEventListener('mouseover', function(e) {
    hover.classList.remove('hidden');
    tooltipSeek.classList.remove('hidden');
  });
  //    Position tooltip and set width of hover progress on mousemove within progress container
  progressContainer.addEventListener('mousemove', function(e) {
    var mouseX = e.clientX,
      left = findPosX(progressContainer),
      width = progressContainer.offsetWidth,
      right = left + width,
      percent = (mouseX - left) / width,
      hoverVal = formatTime(media.duration * percent);
    if (percent <= 1 && percent >= 0) {
      hover.style.transform = "scaleX(" + percent + ")";
      tooltipSeek.style.left = "calc(" + percent * 100 + "% - 0.15em)"; //Fixes minor misalignment with cursor
      tooltipSeek.innerHTML = hoverVal;
    } else if (percent < 0) {
      hover.style.transform = "scaleX(" + 0 + ")";
      tooltipSeek.style.left = "0%";
    } else {
      hover.style.transform = "scaleX(" + 1 + ")";
      tooltipSeek.style.left = "100%";
    }
  });
  //    Hide tooltip and hover progress on mouseout
  progressContainer.addEventListener('mouseout', function(e) {
    hover.classList.add('hidden');
    tooltipSeek.classList.add('hidden');
  });
  //   Scale seek bar on mouse down
  progressContainer.addEventListener('mousedown', function(e) {
    progressContainer.classList.add('hover');
  });
  //   De-scale seek bar on mouse-up
  progressContainer.addEventListener('mouseup', function(e) {
    progressContainer.classList.remove('hover');
  });

  // Play/pause media on play or media click
  play.addEventListener('click', playPause, false);
  heroplay.addEventListener('click', playPause, false);

  // Set up mute
  mute.addEventListener('click', function(e) {
    if (media.muted && volValue == 0) {
      media.muted = false;
      volumeProgress.value = 1;
      volume.value = 1;
      mute.classList.remove('icon-volume-mute');
      mute.classList.add('icon-volume-up');
      tooltipMute.innerHTML = "Mute";
    } else if (media.muted && volValue >= 0 && volValue < .51) {
      media.muted = false;
      volume.value = volValue;
      volumeProgress.value = volValue;
      mute.classList.remove('icon-volume-mute');
      mute.classList.add('icon-volume-down');
      tooltipMute.innerHTML = "Mute";
    } else if (media.muted && volValue >= .51) {
      media.muted = false;
      volume.value = volValue;
      volumeProgress.value = volValue;
      mute.classList.remove('icon-volume-mute');
      mute.classList.add('icon-volume-up');
      tooltipMute.innerHTML = "Mute";
    } else {
      media.muted = true;
      volume.value = 0;
      volumeProgress.value = 0;
      mute.classList.remove('icon-volume-down');
      mute.classList.remove('icon-volume-up');
      mute.classList.add('icon-volume-mute');
      tooltipMute.innerHTML = "Unmute";
    }
  });

  // Set up volume control
  volume.addEventListener("input", function() {
    media.volume = this.value;
    volumeProgress.value = this.value;
    volValue = this.value;
    if (this.value == 0) {
      media.muted = true;
      mute.classList.remove('icon-volume-down');
      mute.classList.remove('icon-volume-up');
      mute.classList.add('icon-volume-mute');
      tooltipMute.innerHTML = "Unmute";
    } else if (this.value > 0 && this.value < .51) {
      media.muted = false;
      mute.classList.remove('icon-volume-mute');
      mute.classList.remove('icon-volume-up');
      mute.classList.add('icon-volume-down');
      tooltipMute.innerHTML = "Mute";
    } else {
      media.muted = false;
      mute.classList.remove('icon-volume-mute');
      mute.classList.remove('icon-volume-down');
      mute.classList.add('icon-volume-up');
      tooltipMute.innerHTML = "Mute";
    }
  }, false);
  //   Scale seek bar on mouse down
  volume.addEventListener('mousedown', function(e) {
    volume.classList.add('hover');
  });
  //   De-scale seek bar on mouse-up
  volume.addEventListener('mouseup', function(e) {
    volume.classList.remove('hover');
  });

  // Set up closed captions
  if (media.textTracks.length) {
    tracks.mode = "hidden";
    var cues = tracks.cues, // must occur before cues is retrieved
      ccState = 0;

    var cueEnter = function() {
        var string = this.text.replace(/(\r\n|\r|\n)/g, "&#160;<br/>&#160;");
        customTrack.innerHTML = "&#160;" + string + "&#160;";
        customTrack.classList.remove('hidden');
      },

      cueExit = function() {
        customTrack.classList.add('hidden');
      };

    media.addEventListener('loadedmetadata', function(e) {
      for (var i = 0; i < cues.length; i++) {
        var cue = cues[i];
        cue.onenter = cueEnter;
        cue.onexit = cueExit;
      }
    });

    cc.style.display = 'inline-block';
    cc.addEventListener("click", function() {
      if (ccState == 0) {
        customTrackWrapper.classList.remove('hidden');
        cc.classList.remove('icon-cc-off');
        cc.classList.add('icon-cc-on');
        ccState = 1;
      } else {
        customTrackWrapper.classList.add('hidden');
        cc.classList.remove('icon-cc-on');
        cc.classList.add('icon-cc-off');
        ccState = 0;
      }
    });
  }

  // Set up full-screen
  var isFullscreen = false,
    fadeOut;

  //    Exit/enter fullscreen mode on click of fullscreen button
  fullscreen.addEventListener('click', function() {
    if (!isFullscreen) {
      if (mediaContainer.requestFullscreen) {
        mediaContainer.requestFullscreen();
      } else if (mediaContainer.mozRequestFullScreen) {
        mediaContainer.mozRequestFullScreen(); // Firefox
      } else if (mediaContainer.webkitRequestFullscreen) {
        mediaContainer.webkitRequestFullscreen(); // Chrome and Safari
      }
      isFullscreen = true;
      mediaContainer.classList.add('full-screen');
      fullscreen.classList.remove('icon-fullscreen');
      fullscreen.classList.add('icon-fullscreen-exit');
      tooltipFS.innerHTML = "Exit&nbsp;full&nbspscreen";
      heroplay.focus();
      fadeInControls();
    } else {
      exitFullScreen();
    }
  }, false);
  //    Remove fullscreen styles on escape
  document.addEventListener('fullscreenchange', function(e) {
    fullScreenListen();
  });
  document.addEventListener('webkitfullscreenchange', function(e) {
    fullScreenListen();
  });
  document.addEventListener('mozfullscreenchange', function(e) {
    fullScreenListen();
  });
  document.addEventListener('MSFullscreenChange', function(e) {
    fullScreenListen();
  });

  document.addEventListener('mousemove', function(e) {
    fadeInControls();
  });
  document.addEventListener('click', function(e) {
    fadeInControls();
  });
  document.addEventListener('keydown', function(e) {
    fadeInControls();
  });
  document.addEventListener('touchmove', function(e) {
    fadeInControls();
  });


  // Reset media to start when playback complete
  media.addEventListener('ended', function() {
    media.pause();
    play.classList.remove('icon-pause');
    play.classList.add('icon-play');
    heroplay.classList.remove('paused');
    mediaContainer.classList.remove('fadeout');
    tooltipPlay.innerHTML = 'Play';
    media.currentTime = 0;
  });
}

//Check if video element is supported
(function() {
  var supportsVideo = !!document.createElement('video').canPlayType,
    chkVideo = document.getElementsByTagName('video'),
    chkAudio = document.getElementsByTagName('audio');

  if (supportsVideo && chkVideo || supportsVideo && chkAudio) {
    var mediaEls = document.querySelectorAll('.media-container');
    for (var i = 0, len = mediaEls.length; i < len; i++) {
      initializeMediaControls(mediaEls[i]);
    }
  }
})();
