/**
 * Global Fusion 2026 - Multimedia Gallery & Lightbox
 * Filtering, keyboard-controlled modal lightbox, and video modal trigger
 */

(function () {
  const GALLERY_ITEMS = [
    {
      id: 1,
      category: 'food',
      type: 'image',
      title: 'Artisanal Himalayan Steamed Momos',
      caption: 'Freshly folded chicken and paneer momos served with fiery roasted timur Sichuan tomato achar.',
      thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 2,
      category: 'performances',
      type: 'image',
      title: 'Lakhey Masked Energy & Dhime Drum Reverie',
      caption: 'Traditional Newari demon-dancer Lakhey spinning in trance amidst the evening torchlight.',
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 3,
      category: 'fashion',
      type: 'image',
      title: 'Malaysian Hand-Drawn Terengganu Silk Batik',
      caption: 'Student fashion designers presenting intricate floral canting wax patterns and Songket borders.',
      thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 4,
      category: 'performances',
      type: 'image',
      title: 'Taiko Wadaiko Thunder at Sunset',
      caption: 'Earth-shaking synchronized percussion honoring Japanese matsuri festival traditions.',
      thumbnail: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 5,
      category: 'food',
      type: 'image',
      title: 'Authentic Kyoto Ramen & Crispy Gyoza',
      caption: 'Slow-simmered rich broth topped with chashu, nori, bamboo shoots, and marinated ajitsuke egg.',
      thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 6,
      category: 'cultures',
      type: 'image',
      title: 'Brazilian Capoeira Acrobatics & Samba',
      caption: 'Afro-Brazilian martial artists trading inverted cartwheels and kicks to berimbau chants.',
      thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 7,
      category: 'performances',
      type: 'image',
      title: 'West African Djembe & Dunun Polyphony',
      caption: 'The African Village pavilion echoing with joyous dance steps and infectious percussive beats.',
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 8,
      category: 'food',
      type: 'image',
      title: 'Fragrant Malaysian Nasi Lemak Bungkus',
      caption: 'Coconut rice with spicy sambal ikan bilis, crispy roasted peanuts, hard-boiled egg, and cucumber.',
      thumbnail: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 9,
      category: 'students',
      type: 'image',
      title: 'LBEF & APU Academic Collaborative Teams',
      caption: 'International student organizing committee uniting over 20 campus cultures in Kathmandu.',
      thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 10,
      category: 'fashion',
      type: 'image',
      title: 'Royal Joseon Korean Hanbok Silhouettes',
      caption: 'Graceful pastel silks presented on the Global Fusion outdoor fashion runway.',
      thumbnail: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1400&q=85'
    },
    {
      id: 11,
      category: 'videos',
      type: 'video',
      title: 'Global Fusion 2026: Spirit of Kathmandu (Trailer)',
      caption: 'Official 4K documentary trailer capturing campus pavilion preparations and festival rehearsals.',
      thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      videoUrl: 'https://www.youtube-nocookie.com/embed/kXYiU_JCYtU?autoplay=1'
    },
    {
      id: 12,
      category: 'food',
      type: 'image',
      title: 'Oaxacan Street Tacos with Lime & Coriander',
      caption: 'Handmade masa corn tortillas loaded with slow-roasted pork and fresh avocado salsa.',
      thumbnail: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
      fullImage: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1400&q=85'
    }
  ];

  let activeCategory = 'all';
  let currentLightboxIdx = 0;
  let filteredItems = [...GALLERY_ITEMS];

  function renderGallery() {
    const container = document.getElementById('gallery-grid-container');
    if (!container) return;

    filteredItems = activeCategory === 'all' 
      ? GALLERY_ITEMS 
      : GALLERY_ITEMS.filter(item => item.category === activeCategory);

    if (filteredItems.length === 0) {
      container.innerHTML = `
        <div style="grid-column:1/-1; text-align:center; padding:4rem; color:var(--text-muted);">
          <h3>No media in this category</h3>
        </div>
      `;
      return;
    }

    container.innerHTML = filteredItems.map((item, idx) => `
      <div class="gallery-card" onclick="GFGallery.openLightbox(${idx})" style="position:relative; border-radius:var(--radius-xl); overflow:hidden; background:var(--bg-card); border:1px solid var(--border-medium); cursor:pointer; box-shadow:var(--shadow-sm); aspect-ratio: 4/3;">
        <img src="${item.thumbnail}" alt="${item.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;" loading="lazy" />
        <div style="position:absolute; inset:0; background:linear-gradient(180deg, transparent 40%, rgba(7,11,24,0.85) 100%); display:flex; flex-direction:column; justify-content:flex-end; padding:1.25rem; color:#fff;">
          ${item.type === 'video' ? `
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:52px; height:52px; border-radius:var(--radius-full); background:var(--color-coral); display:flex; align-items:center; justify-content:center; box-shadow:0 0 20px rgba(255,77,109,0.8);">
              ▶
            </div>
          ` : ''}
          <span style="font-size:0.7rem; font-weight:800; text-transform:uppercase; color:var(--color-yellow); letter-spacing:1px; margin-bottom:0.25rem;">
            ${item.category}
          </span>
          <h4 style="font-family:var(--font-display); font-weight:800; font-size:1.05rem; line-height:1.2;">
            ${item.title}
          </h4>
        </div>
      </div>
    `).join('');
  }

  function openLightbox(idx) {
    currentLightboxIdx = idx;
    const item = filteredItems[idx];
    if (!item) return;

    if (item.type === 'video') {
      window.GFUtils && window.GFUtils.openVideoModal(item.videoUrl, item.title);
      return;
    }

    let lightbox = document.getElementById('gallery-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'gallery-lightbox';
      lightbox.className = 'passport-modal-backdrop';
      lightbox.innerHTML = `
        <div style="background:#070B18; border-radius:var(--radius-xl); max-width:980px; width:100%; overflow:hidden; border:1px solid rgba(255,255,255,0.15); box-shadow:var(--shadow-lg); color:#fff; position:relative;">
          <div style="position:relative; max-height:68vh; overflow:hidden; background:#000; display:flex; align-items:center; justify-content:center;">
            <img id="lightbox-img" src="" alt="" style="max-height:68vh; width:auto; max-width:100%; object-fit:contain;" />
            <button id="lightbox-prev-btn" style="position:absolute; left:1rem; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); color:#fff; width:44px; height:44px; border-radius:var(--radius-full); font-size:1.4rem; display:flex; align-items:center; justify-content:center;">&#8249;</button>
            <button id="lightbox-next-btn" style="position:absolute; right:1rem; top:50%; transform:translateY(-50%); background:rgba(0,0,0,0.6); color:#fff; width:44px; height:44px; border-radius:var(--radius-full); font-size:1.4rem; display:flex; align-items:center; justify-content:center;">&#8250;</button>
            <button id="lightbox-close-btn" style="position:absolute; top:1rem; right:1rem; background:rgba(0,0,0,0.6); color:#fff; width:40px; height:40px; border-radius:var(--radius-full); font-size:1.5rem; display:flex; align-items:center; justify-content:center;">&times;</button>
          </div>
          <div style="padding:1.5rem 2rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
              <h3 id="lightbox-title" style="font-family:var(--font-display); font-weight:800; font-size:1.35rem;"></h3>
              <span id="lightbox-counter" style="font-size:0.85rem; color:var(--text-muted); font-weight:700;"></span>
            </div>
            <p id="lightbox-caption" style="font-size:0.95rem; color:#CBD5E1; line-height:1.5;"></p>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);

      document.getElementById('lightbox-close-btn').addEventListener('click', closeLightbox);
      document.getElementById('lightbox-prev-btn').addEventListener('click', prevLightbox);
      document.getElementById('lightbox-next-btn').addEventListener('click', nextLightbox);

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevLightbox();
        if (e.key === 'ArrowRight') nextLightbox();
      });
    }

    updateLightboxContent();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxContent() {
    const item = filteredItems[currentLightboxIdx];
    if (!item) return;

    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const caption = document.getElementById('lightbox-caption');
    const counter = document.getElementById('lightbox-counter');

    if (img) img.src = item.fullImage || item.thumbnail;
    if (title) title.textContent = item.title;
    if (caption) caption.textContent = item.caption;
    if (counter) counter.textContent = `${currentLightboxIdx + 1} of ${filteredItems.length}`;
  }

  function prevLightbox() {
    currentLightboxIdx = (currentLightboxIdx - 1 + filteredItems.length) % filteredItems.length;
    updateLightboxContent();
  }

  function nextLightbox() {
    currentLightboxIdx = (currentLightboxIdx + 1) % filteredItems.length;
    updateLightboxContent();
  }

  function closeLightbox() {
    const lightbox = document.getElementById('gallery-lightbox');
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gallery-grid-container');
    if (container) {
      renderGallery();

      document.querySelectorAll('[data-gallery-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('[data-gallery-filter]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeCategory = btn.getAttribute('data-gallery-filter');
          renderGallery();
        });
      });
    }
  });

  window.GFGallery = { GALLERY_ITEMS, renderGallery, openLightbox, closeLightbox };
})();
