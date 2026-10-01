/**
 * Global Fusion 2026 - Main JavaScript
 * Handles global interactions, mobile navigation, toast system, and animations
 */

(function () {
  // Toast notification helper
  function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span style="font-size:1.1rem;">${type === 'success' ? '✨' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Ensure Passport Modal HTML exists on every page
  function injectPassportModal() {
    if (document.getElementById('passport-modal')) return;

    const modalHTML = `
      <div id="passport-modal" class="passport-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="passport-modal-title">
        <div class="passport-booklet">
          <div class="passport-booklet-header">
            <div class="passport-emboss-seal">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
            </div>
            <h3 id="passport-modal-title" style="font-family:var(--font-display); font-size:1.6rem; font-weight:900; letter-spacing:1px; margin-bottom:0.25rem;">
              GLOBAL FUSION PASSPORT
            </h3>
            <p style="font-size:0.85rem; color:#475569; font-weight:600;">
              LBEF &amp; APU Cultural Expedition Edition &bull; 2026
            </p>
            <div class="passport-progress-bar">
              <div id="passport-progress-fill" class="passport-progress-fill" style="width: 16%;"></div>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.82rem; font-weight:700; color:#475569;">
              <span id="passport-progress-text">1 of 6 Cultures Explored</span>
              <span>Target: All 6 Stamps</span>
            </div>
            <div id="passport-challenge-badge" style="display:none; margin-top:0.85rem; padding:0.5rem 1rem; background:linear-gradient(135deg, #10B981, #059669); color:#fff; border-radius:var(--radius-full); font-weight:800; font-size:0.85rem;">
              🏆 GLOBAL EXPLORER &mdash; Passport Challenge Completed!
            </div>
          </div>

          <h4 style="font-family:var(--font-display); font-size:0.95rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.75rem; color:#334155;">
            Cultural Pavilion Visas &amp; Visited Stamps
          </h4>
          <div id="passport-stamps-grid" class="passport-stamps-grid">
            <!-- Dynamic stamps -->
          </div>

          <div style="display:flex; gap:0.75rem; justify-content:flex-end; margin-top:2rem; padding-top:1.25rem; border-top:1px solid #E2E8F0;">
            <a href="cultures.html" class="btn-primary" style="font-size:0.82rem; padding:0.5rem 1.1rem;">
              Explore More Cultures &rarr;
            </a>
            <button id="passport-close-btn" data-close-passport class="btn-secondary" style="font-size:0.82rem; padding:0.5rem 1.1rem; cursor:pointer;">
              Close Passport
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const closeBtn = document.getElementById('passport-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.GFPassport && typeof window.GFPassport.closePassportModal === 'function') {
          window.GFPassport.closePassportModal();
        }
      });
    }
  }

  window.injectPassportModal = injectPassportModal;

  // Animated number statistics
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '+';
          const duration = 1800;
          const start = 0;
          const startTime = performance.now();

          function step(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.floor(start + (target - start) * easeProgress);
            el.textContent = `${current.toLocaleString()}${suffix}`;
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = `${target.toLocaleString()}${suffix}`;
            }
          }

          requestAnimationFrame(step);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => observer.observe(counter));
  }

  // Mobile menu interactions
  function initMobileMenu() {
    const openBtn = document.getElementById('mobile-menu-open-btn');
    const closeBtn = document.getElementById('mobile-menu-close-btn');
    const drawer = document.getElementById('mobile-nav-drawer');

    if (openBtn && drawer) {
      openBtn.addEventListener('click', () => {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  }

  // Header scroll appearance
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Universal Image Fallback Handler (Requirement 1)
  function setupImageFallbacks() {
    // Global capture-phase error listener for all <img> elements
    document.addEventListener('error', function (e) {
      if (e.target && e.target.tagName === 'IMG') {
        const img = e.target;
        if (!img.dataset.hasFallbackTriggered) {
          img.dataset.hasFallbackTriggered = 'true';
          const alt = (img.alt || '').toLowerCase();
          const src = (img.src || '').toLowerCase();
          
          if (alt.includes('food') || alt.includes('momo') || alt.includes('satay') || alt.includes('ramen') || alt.includes('culinary') || alt.includes('taste') || alt.includes('dish') || alt.includes('jollof') || alt.includes('nasi') || alt.includes('biryani')) {
            img.src = '../assets/images/fallbacks/food_fallback.svg';
          } else if (alt.includes('dance') || alt.includes('taiko') || alt.includes('lakhey') || alt.includes('kimono') || alt.includes('sarangi') || alt.includes('kathak') || alt.includes('gamelan') || alt.includes('samba') || alt.includes('djembe') || alt.includes('batik') || alt.includes('culture') || alt.includes('pavilion')) {
            img.src = '../assets/images/fallbacks/cultural_fallback.svg';
          } else {
            img.src = '../assets/images/fallbacks/festival_fallback.svg';
          }
          img.style.objectFit = 'cover';
        }
      }
    }, true);

    // Ensure below-the-fold images have loading="lazy"
    document.querySelectorAll('img').forEach((img, idx) => {
      if (idx > 3 && !img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  // Embedded Festival Trailer (Requirement 5)
  function initTrailerEmbed() {
    const iframe = document.getElementById('festival-trailer-iframe');
    const configuredId = window.FESTIVAL_YOUTUBE_VIDEO_ID || (window.siteConfig && window.siteConfig.youtubeVideoId) || 'hXKCEe167tY';
    const videoId = window.parseYouTubeId ? window.parseYouTubeId(configuredId) : configuredId;
    
    if (iframe && videoId) {
      const targetSrc = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
      if (iframe.getAttribute('src') !== targetSrc) {
        iframe.src = targetSrc;
      }
    }
  }

  // Video trailer modal (for auxiliary trailer buttons)
  function initTrailerModal() {
    document.querySelectorAll('[data-open-trailer]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const configuredId = window.FESTIVAL_YOUTUBE_VIDEO_ID || (window.siteConfig && window.siteConfig.youtubeVideoId) || 'hXKCEe167tY';
        const videoId = window.parseYouTubeId ? window.parseYouTubeId(configuredId) : configuredId;
        openVideoModal(`https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1`, 'Global Fusion 2026 Festival Trailer');
      });
    });
  }

  function openVideoModal(url, title) {
    let modal = document.getElementById('video-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'video-modal';
      modal.className = 'passport-modal-backdrop';
      modal.innerHTML = `
        <div style="background:#070B18; border:1px solid rgba(255,255,255,0.2); border-radius:var(--radius-xl); max-width:850px; width:100%; overflow:hidden; box-shadow:var(--shadow-lg);">
          <div style="display:flex; justify-content:space-between; align-items:center; padding:1rem 1.5rem; border-bottom:1px solid rgba(255,255,255,0.1); color:#fff;">
            <h4 id="video-modal-title" style="font-family:var(--font-display); font-weight:800; font-size:1.1rem;">Global Fusion Festival Preview</h4>
            <button id="video-modal-close" style="color:#CBD5E1; font-size:1.5rem; line-height:1; background:none; border:none; cursor:pointer;">&times;</button>
          </div>
          <div style="position:relative; padding-top:56.25%; background:#000;">
            <iframe id="video-modal-iframe" style="position:absolute; inset:0; width:100%; height:100%; border:none;" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.id === 'video-modal-close') {
          closeVideoModal();
        }
      });
    }

    const iframe = document.getElementById('video-modal-iframe');
    const titleEl = document.getElementById('video-modal-title');
    if (iframe) iframe.src = url;
    if (titleEl && title) titleEl.textContent = title;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    if (modal) {
      const iframe = document.getElementById('video-modal-iframe');
      if (iframe) iframe.src = '';
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupImageFallbacks();
    initTrailerEmbed();
    injectPassportModal();
    initMobileMenu();
    initHeaderScroll();
    initCounters();
    initTrailerModal();
  });

  window.GFUtils = { showToast, openVideoModal, closeVideoModal };
})();
