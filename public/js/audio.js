/**
 * Global Fusion 2026 - Sounds of the Globe Audio Player
 * Fully functional HTML5 Audio player with real playable audio sources,
 * volume, scrubbing progress, visualizer animation, error handling, and track switching.
 */

(function () {
  const TRACKS = [
    {
      id: 'nepal_sarangi',
      country: 'Nepal',
      title: 'Nepali Sarangi Reverie',
      genre: 'Himalayan Folk Heritage',
      duration: 145,
      photo: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=300&q=80',
      src: './assets/audio/nepal_sarangi.mp3',
      fallbackSrc: './assets/audio/nepal_sarangi.wav'
    },
    {
      id: 'malaysia_gamelan',
      country: 'Malaysia',
      title: 'Terengganu Gamelan & Gong',
      genre: 'Traditional Malay Palace Orchestra',
      duration: 168,
      photo: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=300&q=80',
      src: './assets/audio/malaysia_gamelan.mp3',
      fallbackSrc: './assets/audio/malaysia_gamelan.wav'
    },
    {
      id: 'africa_djembe',
      country: 'West Africa',
      title: 'Djembe & Dunun Heartbeat',
      genre: 'Ancestral Rhythms & Polyphony',
      duration: 180,
      photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=300&q=80',
      src: './assets/audio/africa_djembe.mp3',
      fallbackSrc: './assets/audio/africa_djembe.wav'
    },
    {
      id: 'japan_taiko',
      country: 'Japan',
      title: 'Taiko Wadaiko Spirit Thunder',
      genre: 'Matsuri Festival Percussion',
      duration: 155,
      photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=300&q=80',
      src: './assets/audio/japan_taiko.mp3',
      fallbackSrc: './assets/audio/japan_taiko.wav'
    }
  ];

  let currentTrackIdx = 0;
  let isSeeking = false;
  let audioElement = null;
  let hasAttemptedFallback = false;

  function initAudioElement() {
    if (!audioElement) {
      audioElement = document.getElementById('gf-audio-element');
      if (!audioElement) {
        audioElement = document.createElement('audio');
        audioElement.id = 'gf-audio-element';
        audioElement.preload = 'metadata';
        document.body.appendChild(audioElement);
      }

      // Event listeners
      audioElement.addEventListener('loadedmetadata', onLoadedMetadata);
      audioElement.addEventListener('timeupdate', onTimeUpdate);
      audioElement.addEventListener('ended', onEnded);
      audioElement.addEventListener('error', onError);
      audioElement.addEventListener('play', onPlay);
      audioElement.addEventListener('pause', onPause);

      // Load initial track without playing (NO AUTOPLAY on page load)
      loadTrack(currentTrackIdx, false);
    }
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function loadTrack(idx, autoPlayAfterLoad = false) {
    if (idx < 0 || idx >= TRACKS.length) return;
    currentTrackIdx = idx;
    hasAttemptedFallback = false;
    const track = TRACKS[currentTrackIdx];

    // Reset status UI
    showAudioStatus('');

    // Ensure audio element exists
    if (!audioElement) {
      initAudioElement();
    }

    // 1. Pause currently playing audio before switching
    if (audioElement) {
      audioElement.pause();
      // 2. Load the new audio source
      audioElement.src = track.src;
      audioElement.currentTime = 0;
      audioElement.load();
    }

    // 3. Update title
    // 4. Update country/category
    // 5. Update artwork
    // 6. Reset/update progress
    updateTrackMetadataUI(track);

    // 7. Play when requested
    if (autoPlayAfterLoad && audioElement) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          updatePlayButtonUI(true);
          showAudioStatus('');
        }).catch((err) => {
          console.warn('Initial playback failed, attempting fallback format:', err);
          if (track.fallbackSrc && !hasAttemptedFallback) {
            hasAttemptedFallback = true;
            audioElement.src = track.fallbackSrc;
            audioElement.load();
            audioElement.play().catch(() => {
              showAudioStatus('Audio unavailable — please try another track.');
              updatePlayButtonUI(false);
            });
          } else {
            showAudioStatus('Audio unavailable — please try another track.');
            updatePlayButtonUI(false);
          }
        });
      }
    } else {
      updatePlayButtonUI(false);
    }
  }

  function updateTrackMetadataUI(track) {
    const artwork = document.getElementById('now-playing-art');
    const titleEl = document.getElementById('now-playing-title');
    const subtitleEl = document.getElementById('now-playing-subtitle');
    const progressSlider = document.getElementById('audio-progress-slider');
    const timeDisplay = document.getElementById('audio-time-display');

    if (artwork) {
      artwork.src = track.photo;
      artwork.alt = track.title;
    }
    if (titleEl) titleEl.textContent = track.title;
    if (subtitleEl) subtitleEl.textContent = `${track.country} • ${track.genre}`;

    if (progressSlider) {
      progressSlider.value = 0;
      progressSlider.max = track.duration;
    }

    if (timeDisplay) {
      timeDisplay.textContent = `0:00 / ${formatTime(track.duration)}`;
    }

    // Update track buttons active state
    document.querySelectorAll('.track-item-btn').forEach((btn, idx) => {
      if (idx === currentTrackIdx) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });
  }

  function updatePlayButtonUI(isPlaying) {
    const playBtn = document.getElementById('audio-play-toggle-btn');
    const playerWidget = document.getElementById('audio-player-widget');

    if (playBtn) {
      playBtn.setAttribute('aria-label', isPlaying ? 'Pause Audio' : 'Play Audio');
      playBtn.innerHTML = isPlaying ? `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <rect x="6" y="4" width="4" height="16" rx="1"></rect>
          <rect x="14" y="4" width="4" height="16" rx="1"></rect>
        </svg>
      ` : `
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="margin-left:3px;">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg>
      `;
    }

    if (playerWidget) {
      if (isPlaying) {
        playerWidget.classList.add('is-playing');
      } else {
        playerWidget.classList.remove('is-playing');
      }
    }
  }

  function showAudioStatus(msg) {
    let statusEl = document.getElementById('audio-player-status');
    if (!statusEl) {
      const playerWidget = document.getElementById('audio-player-widget');
      if (playerWidget) {
        statusEl = document.createElement('div');
        statusEl.id = 'audio-player-status';
        statusEl.style.cssText = 'color:var(--color-coral); font-size:0.8rem; font-weight:700; margin-top:0.5rem; text-align:center; min-height:1.2rem;';
        playerWidget.appendChild(statusEl);
      }
    }
    if (statusEl) {
      statusEl.textContent = msg;
    }
  }

  function onPlay() {
    updatePlayButtonUI(true);
    showAudioStatus('');
  }

  function onPause() {
    updatePlayButtonUI(false);
  }

  function onLoadedMetadata() {
    const progressSlider = document.getElementById('audio-progress-slider');
    const timeDisplay = document.getElementById('audio-time-display');
    const track = TRACKS[currentTrackIdx];
    const duration = audioElement && audioElement.duration && !isNaN(audioElement.duration) && isFinite(audioElement.duration)
      ? audioElement.duration
      : track.duration;

    if (progressSlider) {
      progressSlider.max = Math.floor(duration);
    }
    if (timeDisplay && audioElement) {
      timeDisplay.textContent = `${formatTime(audioElement.currentTime)} / ${formatTime(duration)}`;
    }
  }

  function onTimeUpdate() {
    if (isSeeking || !audioElement) return;
    const progressSlider = document.getElementById('audio-progress-slider');
    const timeDisplay = document.getElementById('audio-time-display');
    const current = audioElement.currentTime;
    const track = TRACKS[currentTrackIdx];
    const duration = audioElement.duration && !isNaN(audioElement.duration) && isFinite(audioElement.duration)
      ? audioElement.duration
      : track.duration;

    if (progressSlider) {
      progressSlider.value = Math.floor(current);
    }
    if (timeDisplay) {
      timeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    }
  }

  function onEnded() {
    updatePlayButtonUI(false);
    // Move to next track seamlessly
    const nextIdx = (currentTrackIdx + 1) % TRACKS.length;
    loadTrack(nextIdx, true);
  }

  function onError(e) {
    console.error('Audio playback error:', e);
    const track = TRACKS[currentTrackIdx];
    if (track && track.fallbackSrc && !hasAttemptedFallback && audioElement) {
      hasAttemptedFallback = true;
      audioElement.src = track.fallbackSrc;
      audioElement.load();
      audioElement.play().catch(() => {
        showAudioStatus('Audio unavailable — please try another track.');
        updatePlayButtonUI(false);
      });
      return;
    }
    showAudioStatus('Audio unavailable — please try another track.');
    updatePlayButtonUI(false);
  }

  function togglePlay() {
    initAudioElement();
    if (!audioElement) return;

    if (audioElement.paused) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          updatePlayButtonUI(true);
          showAudioStatus('');
        }).catch((err) => {
          console.warn('Audio play error:', err);
          showAudioStatus('Audio unavailable — please try another track.');
          updatePlayButtonUI(false);
        });
      }
    } else {
      audioElement.pause();
    }
  }

  function selectTrack(idx) {
    initAudioElement();
    if (idx === currentTrackIdx && audioElement) {
      if (!audioElement.paused) {
        audioElement.pause();
      } else {
        audioElement.play().catch((err) => {
          console.warn('Play error:', err);
          showAudioStatus('Audio unavailable — please try another track.');
        });
      }
      return;
    }
    loadTrack(idx, true);
  }

  function setVolume(val) {
    if (!audioElement) initAudioElement();
    if (audioElement) {
      audioElement.volume = Math.max(0, Math.min(1, val));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAudioElement();

    const playBtn = document.getElementById('audio-play-toggle-btn');
    if (playBtn) {
      playBtn.addEventListener('click', togglePlay);
    }

    const progressSlider = document.getElementById('audio-progress-slider');
    if (progressSlider) {
      const startSeeking = () => { isSeeking = true; };
      const stopSeeking = (e) => {
        isSeeking = false;
        if (audioElement) {
          audioElement.currentTime = parseFloat(e.target.value);
        }
      };

      progressSlider.addEventListener('mousedown', startSeeking);
      progressSlider.addEventListener('touchstart', startSeeking, { passive: true });

      progressSlider.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        const timeDisplay = document.getElementById('audio-time-display');
        const track = TRACKS[currentTrackIdx];
        const duration = audioElement && audioElement.duration ? audioElement.duration : track.duration;
        if (timeDisplay) {
          timeDisplay.textContent = `${formatTime(val)} / ${formatTime(duration)}`;
        }
      });

      progressSlider.addEventListener('change', stopSeeking);
      progressSlider.addEventListener('mouseup', stopSeeking);
      progressSlider.addEventListener('touchend', stopSeeking);
    }

    // Volume Slider support
    const volumeSlider = document.getElementById('audio-volume-slider');
    if (volumeSlider) {
      volumeSlider.addEventListener('input', (e) => {
        setVolume(parseFloat(e.target.value));
      });
      // Initial volume
      setVolume(parseFloat(volumeSlider.value));
    }

    // Track buttons in playlist
    const trackBtns = document.querySelectorAll('.track-item-btn');
    trackBtns.forEach((btn, idx) => {
      btn.addEventListener('click', () => selectTrack(idx));
    });

    updateTrackMetadataUI(TRACKS[0]);
  });

  window.GFAudio = {
    TRACKS,
    togglePlay,
    selectTrack,
    setVolume,
    loadTrack
  };
})();
