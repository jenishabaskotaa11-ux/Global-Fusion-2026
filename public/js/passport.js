/**
 * Global Fusion 2026 - Digital Passport Signature Feature
 * Handles collecting cultural stamps, persistence in localStorage, and passport modal
 */

(function () {
  const PASSPORT_KEY = 'gf_passport_stamps';

  const PASSPORT_CULTURES = [
    { id: 'nepal', name: 'Nepal', flag: '🇳🇵', icon: '🏔️', pavilion: 'South Asian & Himalayan', color: '#FF4D6D' },
    { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾', icon: '🌺', pavilion: 'ASEAN & Malay World', color: '#00CFC8' },
    { id: 'japan', name: 'Japan', flag: '🇯🇵', icon: '🌸', pavilion: 'East Asian Cultural', color: '#FFD60A' },
    { id: 'brazil', name: 'Brazil', flag: '🇧🇷', icon: '🎭', pavilion: 'Global Diaspora', color: '#22C55E' },
    { id: 'nigeria', name: 'Nigeria', flag: '🇳🇬', icon: '🥁', pavilion: 'African Village', color: '#8B5CF6' },
    { id: 'mexico', name: 'Mexico', flag: '🇲🇽', icon: '🌮', pavilion: 'Latin American', color: '#FF7A00' }
  ];

  function getStamps() {
    try {
      const data = localStorage.getItem(PASSPORT_KEY);
      return data ? JSON.parse(data) : ['nepal']; // Default starter stamp
    } catch (e) {
      return ['nepal'];
    }
  }

  function saveStamps(stamps) {
    try {
      localStorage.setItem(PASSPORT_KEY, JSON.stringify(stamps));
      updatePassportCounters();
    } catch (e) {
      console.error('Failed to save passport stamps', e);
    }
  }

  function addStamp(cultureId) {
    const stamps = getStamps();
    if (!stamps.includes(cultureId)) {
      stamps.push(cultureId);
      saveStamps(stamps);
      
      const culture = PASSPORT_CULTURES.find(c => c.id === cultureId) || { name: cultureId, flag: '✨' };
      window.GFUtils && window.GFUtils.showToast(`Passport Stamped! ${culture.flag} You explored ${culture.name}.`, 'success');

      // Refresh passport UI if open
      renderPassportUI();
      return true;
    }
    return false;
  }

  function updatePassportCounters() {
    const stamps = getStamps();
    const count = stamps.length;
    const total = PASSPORT_CULTURES.length;

    document.querySelectorAll('.passport-stamp-counter').forEach(el => {
      el.textContent = `${count}/${total}`;
    });

    const progressFill = document.getElementById('passport-progress-fill');
    if (progressFill) {
      const pct = Math.min(100, Math.round((count / total) * 100));
      progressFill.style.width = `${pct}%`;
    }

    const progressText = document.getElementById('passport-progress-text');
    if (progressText) {
      progressText.textContent = `${count} of ${total} Cultures Explored`;
    }

    const challengeBadge = document.getElementById('passport-challenge-badge');
    if (challengeBadge) {
      if (count >= total) {
        challengeBadge.style.display = 'block';
      } else {
        challengeBadge.style.display = 'none';
      }
    }
  }

  function renderPassportUI() {
    const container = document.getElementById('passport-stamps-grid');
    if (!container) return;

    const stamps = getStamps();

    container.innerHTML = PASSPORT_CULTURES.map(c => {
      const isStamped = stamps.includes(c.id);
      return `
        <div class="passport-stamp-slot ${isStamped ? 'stamped' : ''}">
          ${isStamped ? `
            <div class="stamp-mark animate-stamp" style="border-color:${c.color}; color:${c.color};">
              <span style="font-size:1.4rem;">${c.flag}</span>
              <div>${c.name}</div>
              <small style="font-size:0.65rem; opacity:0.8; letter-spacing:0.5px;">VISITED • 2026</small>
            </div>
          ` : `
            <div style="opacity:0.45; text-align:center;">
              <div style="font-size:1.6rem; filter:grayscale(1);">${c.icon}</div>
              <strong style="font-size:0.85rem; display:block; margin-top:0.25rem;">${c.name}</strong>
              <small style="font-size:0.7rem; color:var(--text-muted);">Unexplored</small>
            </div>
          `}
        </div>
      `;
    }).join('');

    updatePassportCounters();
  }

  function openPassportModal() {
    let modal = document.getElementById('passport-modal');
    if (!modal && typeof window.injectPassportModal === 'function') {
      window.injectPassportModal();
      modal = document.getElementById('passport-modal');
    }
    if (modal) {
      renderPassportUI();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      const closeBtn = document.getElementById('passport-close-btn');
      if (closeBtn && !closeBtn._hasPassportCloseListener) {
        closeBtn._hasPassportCloseListener = true;
        closeBtn.addEventListener('click', (e) => {
          e.preventDefault();
          closePassportModal();
        });
      }
    }
  }

  function closePassportModal() {
    const modal = document.getElementById('passport-modal');
    if (modal) {
      modal.classList.remove('open');
      // If another modal (such as culture-detail-modal) is still open in background, keep scroll locked
      const cultureModal = document.getElementById('culture-detail-modal');
      if (cultureModal && cultureModal.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  }

  // Delegated click handler on document to capture Close Passport, View In Passport, or any passport triggers
  document.addEventListener('click', (e) => {
    // 1. Close Passport clicked
    const closeBtn = e.target.closest('#passport-close-btn, [data-close-passport]');
    if (closeBtn) {
      e.preventDefault();
      closePassportModal();
      return;
    }

    // 2. Backdrop click on passport modal
    const modal = document.getElementById('passport-modal');
    if (modal && e.target === modal) {
      closePassportModal();
      return;
    }

    // 3. Open passport triggers (View In Passport button or data-open-passport elements)
    const openBtn = e.target.closest('[data-open-passport], #view-in-passport-btn');
    if (openBtn) {
      e.preventDefault();
      openPassportModal();
      return;
    }
  });

  // Escape key handler: only close passport modal if it is currently open
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('passport-modal');
      if (modal && modal.classList.contains('open')) {
        e.preventDefault();
        e.stopPropagation();
        closePassportModal();
      }
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updatePassportCounters();

    // Attach click handlers to any passport trigger button
    document.querySelectorAll('[data-open-passport]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPassportModal();
      });
    });

    const closeBtn = document.getElementById('passport-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', closePassportModal);

    const modal = document.getElementById('passport-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closePassportModal();
      });
    }
  });

  window.GFPassport = {
    getStamps,
    addStamp,
    openPassportModal,
    closePassportModal,
    renderPassportUI,
    PASSPORT_CULTURES
  };
})();
