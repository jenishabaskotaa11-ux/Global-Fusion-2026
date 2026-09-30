/**
 * Global Fusion 2026 - Schedule & Itinerary Manager
 * 3-Day Multi-Category Event Schedule with Client-Side Filters & localStorage Persistence
 */

(function () {
  const SCHEDULE_STORAGE_KEY = 'gf_saved_schedule';

  const SCHEDULE_EVENTS = [
    // Day 1: 3 December 2026
    {
      id: 'd1_inaugural',
      day: 1,
      date: '3 Dec 2026',
      time: '09:30 - 11:30',
      title: 'Grand Inaugural & Diplomatic Flag Parade',
      category: 'culture',
      venue: 'Main Arena Amphitheater',
      desc: 'The official campus opening ceremony featuring a 20+ nation flag march, dignitary addresses by LBEF and APU academic leaders, and international peace anthems.',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      speaker: 'Vice Chancellors & Global Ambassadors'
    },
    {
      id: 'd1_culinary_odyssey',
      day: 1,
      date: '3 Dec 2026',
      time: '12:00 - 14:30',
      title: 'Global Street Food Tasting Odyssey',
      category: 'food',
      venue: 'Global Food Street & Pavilion',
      desc: 'Embark on an epic culinary journey across 50 stalls. Sample Himalayan Momos, Malaysian Nasi Lemak, Kyoto Gyoza, and Nigerian Suya.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      speaker: 'International Student Culinary Guilds'
    },
    {
      id: 'd1_kathak',
      day: 1,
      date: '3 Dec 2026',
      time: '15:00 - 16:30',
      title: 'Kathak Classical & Himalayan Folklore Dance',
      category: 'dance',
      venue: 'Cultural Heritage Stage',
      desc: 'Mesmerizing rapid pirouettes, footwork with brass bells (Ghungroo), and soulful storytelling through South Asian classical rhythms.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      speaker: 'South Asian Student Cultural Ensemble'
    },
    {
      id: 'd1_djembe_workshop',
      day: 1,
      date: '3 Dec 2026',
      time: '16:45 - 18:00',
      title: 'West African Djembe & Polyrhythm Workshop',
      category: 'workshop',
      venue: 'West Lawn Pavilion',
      desc: 'Hands-on interactive drumming masterclass exploring traditional Malinke and Yoruba polyrhythmic patterns with master percussionists.',
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      speaker: 'African Diaspora Student Society'
    },
    {
      id: 'd1_lakhey_night',
      day: 1,
      date: '3 Dec 2026',
      time: '18:30 - 20:30',
      title: 'Newari Lakhey Masked Energy & Fire Revelry',
      category: 'culture',
      venue: 'Main Arena Amphitheater',
      desc: 'Electrifying ancient demon-god dance of the Kathmandu Valley, accompanied by roaring Dhime drums, Bhusyah cymbals, and torchlit procession.',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      speaker: 'LBEF Indigenous Heritage Guild'
    },

    // Day 2: 4 December 2026
    {
      id: 'd2_batik_workshop',
      day: 1,
      day: 2,
      date: '4 Dec 2026',
      time: '10:00 - 11:45',
      title: 'Malaysian Batik Waxing & Canting Guild',
      category: 'workshop',
      venue: 'Creative Arts Studio',
      desc: 'Learn the ancient art of wax-resist fabric dyeing using copper canting pens, floral natural dyes, and pure silk textures.',
      image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      speaker: 'APU Malaysia Cultural Delegation'
    },
    {
      id: 'd2_culinary_clash',
      day: 2,
      date: '4 Dec 2026',
      time: '12:00 - 14:30',
      title: 'Global Culinary Clash (Competition Round 1)',
      category: 'competition',
      venue: 'Culinary Arena Stage',
      desc: 'Top student chef duos face off with secret mystery ingredients to cook a 3-course cross-cultural fusion banquet judged by guest chefs.',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
      speaker: 'Celebrity Chef Jury Panel'
    },
    {
      id: 'd2_uiux_hackathon',
      day: 2,
      date: '4 Dec 2026',
      time: '14:30 - 17:00',
      title: 'Cultural UI/UX Hackathon Presentation & Demos',
      category: 'competition',
      venue: 'APU Innovation Lab (Hall 3)',
      desc: 'Student technologists present immersive digital preservation tools, accessibility platforms, and multilingual cultural interfaces.',
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
      speaker: 'LBEF IT Faculty & APU Tech Leads'
    },
    {
      id: 'd2_capoeira_samba',
      day: 2,
      date: '4 Dec 2026',
      time: '17:30 - 19:30',
      title: 'Brazilian Capoeira Roda & Samba Batucada',
      category: 'dance',
      venue: 'Festival Central Plaza',
      desc: 'High-flying acrobatic martial arts disguised as dance inside a musical roda, followed by exuberant Rio Carnival samba percussion.',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      speaker: 'Latin American Cultural Society'
    },
    {
      id: 'd2_world_music_gala',
      day: 2,
      date: '4 Dec 2026',
      time: '20:00 - 22:30',
      title: 'Sounds of the Globe World Music Gala Concert',
      category: 'music',
      venue: 'Main Arena Amphitheater',
      desc: 'Live fusion concert blending Nepali Bansuri, Malaysian Gamelan gongs, West African Kora, Celtic fiddles, and electronic synth beats.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80',
      speaker: 'Global Fusion All-Star Ensemble'
    },

    // Day 3: 5 December 2026
    {
      id: 'd3_language_exchange',
      day: 3,
      date: '5 Dec 2026',
      time: '10:00 - 11:30',
      title: 'Polyglot Cafe & International Language Exchange',
      category: 'networking',
      venue: 'Global Village Lounge',
      desc: 'Interactive conversation tables covering Nepali, Japanese, Bahasa Melayu, Spanish, French, Korean, Arabic, and Mandarin.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
      speaker: 'International Student Ambassadors'
    },
    {
      id: 'd3_fashion_runway',
      day: 3,
      date: '5 Dec 2026',
      time: '12:30 - 14:30',
      title: 'International Cultural Runway & Royal Attire Gala',
      category: 'culture',
      venue: 'Fashion Showcase Runway',
      desc: 'Spectacular parade of traditional royal garments: Kimonos, Hanboks, Sarees, Agbadas, Baju Kurungs, and modern eco-fusion couture.',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      speaker: 'Design & Textile Guild'
    },
    {
      id: 'd3_talent_finals',
      day: 3,
      date: '5 Dec 2026',
      time: '15:00 - 17:30',
      title: 'World Talent Showcase & Folk Dance Finals',
      category: 'competition',
      venue: 'Main Arena Amphitheater',
      desc: 'The grand finale of campus competitive performances, featuring top student finalists in dance, instrumental mastery, and vocal harmony.',
      image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80',
      speaker: 'Global Fusion Competition Judges'
    },
    {
      id: 'd3_awards_closing',
      day: 3,
      date: '5 Dec 2026',
      time: '18:00 - 21:00',
      title: 'Grand Awards Gala, Lantern Ceremony & Lantern Release',
      category: 'networking',
      venue: 'Campus Grounds & Sky Pavilion',
      desc: 'Celebration of winners, NRs 350,000 prize distribution, unity torch passing, and an ethereal floating lantern release over the campus skies.',
      image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80',
      speaker: 'LBEF & APU Academic Dignitaries'
    }
  ];

  function getSavedSchedule() {
    try {
      const data = localStorage.getItem(SCHEDULE_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSchedule(items) {
    try {
      localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(items));
      updateSavedCount();
    } catch (e) {
      console.error(e);
    }
  }

  function isEventSaved(eventId) {
    const saved = getSavedSchedule();
    return saved.some(item => item.id === eventId);
  }

  function toggleSaveEvent(eventId) {
    const saved = getSavedSchedule();
    const event = SCHEDULE_EVENTS.find(e => e.id === eventId);
    if (!event) return;

    const exists = saved.some(e => e.id === eventId);
    let updated;
    if (exists) {
      updated = saved.filter(e => e.id !== eventId);
      window.GFUtils && window.GFUtils.showToast(`Removed "${event.title}" from your schedule.`, 'info');
    } else {
      updated = [...saved, event];
      window.GFUtils && window.GFUtils.showToast(`Added "${event.title}" to your schedule!`, 'success');
    }

    saveSchedule(updated);
    renderSchedule();
    return !exists;
  }

  function clearAllSaved() {
    localStorage.removeItem(SCHEDULE_STORAGE_KEY);
    updateSavedCount();
    window.GFUtils && window.GFUtils.showToast('Your personal schedule has been cleared.', 'info');
  }

  function updateSavedCount() {
    const saved = getSavedSchedule();
    document.querySelectorAll('.saved-schedule-counter').forEach(el => {
      el.textContent = saved.length;
    });
  }

  let activeDay = 1;
  let activeCategory = 'all';
  let activeVenue = 'all';
  let searchKeyword = '';

  function renderSchedule() {
    const container = document.getElementById('schedule-events-container');
    if (!container) return;

    const filtered = SCHEDULE_EVENTS.filter(e => {
      const matchDay = e.day === activeDay;
      const matchCategory = activeCategory === 'all' || e.category === activeCategory;
      const matchVenue = activeVenue === 'all' || e.venue === activeVenue;
      const matchSearch = searchKeyword === '' || 
        e.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        e.desc.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        e.speaker.toLowerCase().includes(searchKeyword.toLowerCase());

      return matchDay && matchCategory && matchVenue && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:4rem 1.5rem; background:var(--bg-card); border-radius:var(--radius-xl); border:1px solid var(--border-medium); color:var(--text-muted); grid-column:1/-1;">
          <div style="font-size:2.5rem; margin-bottom:0.75rem;">📅</div>
          <h3 style="font-size:1.25rem; font-weight:800; color:var(--text-primary); margin-bottom:0.35rem;">No Events Scheduled For This Filter</h3>
          <p>Try switching day tabs or clearing the category and venue filters.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(e => {
      const isSaved = isEventSaved(e.id);
      return `
        <article class="schedule-event-card" style="background:var(--bg-card); border:1px solid var(--border-medium); border-radius:var(--radius-xl); overflow:hidden; box-shadow:var(--shadow-sm); display:grid; grid-template-columns: 240px 1fr; margin-bottom:1.5rem; transition:transform 0.2s ease, box-shadow 0.2s ease;">
          <div style="position:relative; overflow:hidden; background:#101A3A;">
            <img src="${e.image}" alt="${e.title}" style="width:100%; height:100%; object-fit:cover;" loading="lazy" />
            <span style="position:absolute; top:0.75rem; left:0.75rem; background:var(--color-navy); color:#fff; font-size:0.7rem; font-weight:800; padding:0.25rem 0.65rem; border-radius:var(--radius-full); text-transform:uppercase; border:1px solid rgba(255,255,255,0.2);">
              ${e.category}
            </span>
          </div>

          <div style="padding:1.5rem 1.75rem; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
                <span style="font-family:var(--font-mono); font-weight:800; font-size:0.88rem; color:var(--color-orange); display:flex; align-items:center; gap:0.4rem;">
                  🕒 ${e.time}
                </span>
                <div style="display:flex; align-items:center; gap:0.5rem; flex-wrap:wrap;">
                  <span style="font-size:0.82rem; font-weight:700; color:var(--text-muted); display:flex; align-items:center; gap:0.35rem;">
                    📍 ${e.venue}
                  </span>
                  <a href="contact.html#getting-here" class="venue-badge-link" title="View LBEF College Venue on Map" style="display:inline-flex; align-items:center; gap:0.25rem; font-size:0.72rem; font-weight:700; color:var(--color-turquoise); border:1px solid rgba(0,207,200,0.3); background:rgba(0,207,200,0.08); padding:0.18rem 0.55rem; border-radius:var(--radius-full); text-decoration:none; transition:all 0.2s ease;">
                    🗺️ VIEW VENUE &rarr;
                  </a>
                </div>
              </div>

              <h3 style="font-family:var(--font-display); font-weight:800; font-size:1.35rem; line-height:1.25; margin-bottom:0.6rem; color:var(--text-primary);">
                ${e.title}
              </h3>

              <p style="font-size:0.9rem; color:var(--text-secondary); line-height:1.55; margin-bottom:1rem;">
                ${e.desc}
              </p>

              <div style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">
                👥 <strong>Hosts/Performers:</strong> ${e.speaker}
              </div>
            </div>

            <div style="display:flex; align-items:center; justify-content:space-between; padding-top:1.25rem; border-top:1px solid var(--border-light); margin-top:1.25rem;">
              <span style="font-size:0.78rem; font-weight:700; color:var(--color-turquoise); text-transform:uppercase;">
                Day ${e.day} • ${e.date}
              </span>
              <button onclick="GFSchedule.toggleSaveEvent('${e.id}')" class="${isSaved ? 'btn-secondary' : 'btn-primary'}" style="font-size:0.82rem; padding:0.45rem 1.1rem;">
                ${isSaved ? '✓ Added To Schedule' : '+ Add To My Schedule'}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateSavedCount();

    // Check if on schedule page
    const container = document.getElementById('schedule-events-container');
    if (container) {
      renderSchedule();

      // Day tabs
      document.querySelectorAll('[data-schedule-day]').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('[data-schedule-day]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeDay = parseInt(btn.getAttribute('data-schedule-day'), 10);
          renderSchedule();
        });
      });

      // Category filters
      document.querySelectorAll('[data-schedule-category]').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('[data-schedule-category]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeCategory = btn.getAttribute('data-schedule-category');
          renderSchedule();
        });
      });

      // Venue selector
      const venueSelect = document.getElementById('schedule-venue-filter');
      if (venueSelect) {
        venueSelect.addEventListener('change', (e) => {
          activeVenue = e.target.value;
          renderSchedule();
        });
      }

      // Search input
      const searchInput = document.getElementById('schedule-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          searchKeyword = e.target.value;
          renderSchedule();
        });
      }
    }
  });

  window.GFSchedule = {
    SCHEDULE_EVENTS,
    getSavedSchedule,
    toggleSaveEvent,
    clearAllSaved,
    renderSchedule
  };
})();
