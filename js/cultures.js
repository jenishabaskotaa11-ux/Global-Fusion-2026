/**
 * Global Fusion 2026 - Cultures Explorer
 * Complete data & interactive modal system for 12 featured cultures
 */

(function () {
  const CULTURES_DATA = [
    {
      id: 'nepal',
      name: 'Nepal',
      nativeName: 'नेपाल',
      flag: '🇳🇵',
      region: 'south-asia',
      pavilion: 'South Asian & Himalayan Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      tagline: 'Land of the Himalayas & Living Traditions',
      intro: 'Nestled between snow-capped peaks and lush valleys, Nepal is a mosaic of over 140 ethnic groups, timeless pagoda architecture, living goddesses, and sacred artistic craftsmanship.',
      language: 'Nepali (नेपाली), Newari, Maithili',
      foodHighlight: 'Steamed Himalayan Buff/Veg Momos with Timur Achar, Sel Roti, and Newari Samay Baji feasts.',
      attireHighlight: 'Daura Suruwal with Dhaka Topi for men; Gunyo Cholo and crimson silk Pote necklaces for women.',
      facts: [
        'Home to 8 of the world\'s 10 tallest peaks, including Mt. Sagarmatha (Everest).',
        'Birthplace of Siddhartha Gautama (Lord Buddha) in Lumbini.',
        'The only sovereign national flag that is non-quadrilateral in shape.'
      ],
      relatedEvents: [
        'Himalayan Masked Lakhey Reverie (Day 1 - 18:00)',
        'Momo Championship & Tasting Workshop (Day 2 - 13:00)'
      ]
    },
    {
      id: 'malaysia',
      name: 'Malaysia',
      nativeName: 'مليسيا',
      flag: '🇲🇾',
      region: 'asean',
      pavilion: 'ASEAN & Malay World Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80',
      tagline: 'Truly Asia: Heritage of Harmony & Spice',
      intro: 'Malaysia showcases a dynamic crossroads of Malay, Chinese, Indian, and indigenous Bornean cultures, where modern architectural wonders rise above ancient rainforests and bustling night markets.',
      language: 'Bahasa Melayu, English, Mandarin, Tamil',
      foodHighlight: 'Fragrant Nasi Lemak wrapped in banana leaf, charcoal-grilled Satay skewers with peanut gravy, and Roti Canai.',
      attireHighlight: 'Baju Kurung and Baju Melayu paired with hand-drawn Terengganu Batik and gold-threaded Songket.',
      facts: [
        'Home to the iconic 451-meter Petronas Twin Towers, designed with Islamic geometric motifs.',
        'Host to Taman Negara, one of the oldest deciduous rainforests on Earth (130 million years old).',
        'Asia Pacific University (APU) campus in Kuala Lumpur hosts students from over 130 nations!'
      ],
      relatedEvents: [
        'Malaysian Batik Waxing Masterclass (Day 2 - 11:30)',
        'Gamelan & Zapin Folk Showcase (Day 3 - 16:30)'
      ]
    },
    {
      id: 'japan',
      name: 'Japan',
      nativeName: '日本',
      flag: '🇯🇵',
      region: 'east-asia',
      pavilion: 'East Asian Cultural Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=600&q=80',
      tagline: 'Harmony of Ancient Zen & Hyper-Modern Innovation',
      intro: 'Japan presents a profound balance between timeless aesthetics like wabi-sabi and cutting-edge robotics, celebrated through seasonal matsuri festivals, serene tea ceremonies, and cinematic percussion.',
      language: 'Japanese (日本語)',
      foodHighlight: 'Artisanal Tonkotsu & Miso Ramen, crispy pan-fried Gyoza, fresh Sushi, and Matcha wagashi.',
      attireHighlight: 'Hand-dyed silk Kimono and cotton Yukata bound with intricate Obi sashes and wooden Geta sandals.',
      facts: [
        'Japan comprises an archipelago of 6,852 islands.',
        'Kyoto alone has over 1,600 historic Buddhist temples and 400 Shinto shrines.',
        'Taiko drumming originated in ancient battlefields and spiritual fertility rites.'
      ],
      relatedEvents: [
        'Wadaiko Drumming Thunder (Day 1 - 20:00)',
        'Origami & Tea Philosophy Workshop (Day 3 - 14:00)'
      ]
    },
    {
      id: 'india',
      name: 'India',
      nativeName: 'भारत',
      flag: '🇮🇳',
      region: 'south-asia',
      pavilion: 'South Asian & Himalayan Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
      tagline: 'A Subcontinent of Vibrant Colors & Epic Epics',
      intro: 'From classical Bharatanatyam rhythms to royal Mughal architecture, India is a kaleidoscopic civilization boasting ancient philosophies, vibrant spice bazaars, and celebratory unity in diversity.',
      language: 'Hindi, English, Bengali, Tamil, Telugu, and 22 recognized languages',
      foodHighlight: 'Fragrant Hyderabadi Dum Biryani, crispy Masala Dosas, Butter Chicken, and Gulab Jamun.',
      attireHighlight: 'Zari-embroidered Kanjivaram & Banarasi Sarees, Sherwanis, and colorful Kurtas.',
      facts: [
        'Chess was invented in ancient India under the name Chaturanga.',
        'Holi, the Festival of Colors, marks the victory of good over evil and the arrival of spring.',
        'India produces the largest volume of films globally through Bollywood and regional industries.'
      ],
      relatedEvents: [
        'Kathak Classical Dance Odyssey (Day 1 - 15:30)',
        'Royal Spice Tasting & Chai Bar (Day 2 - 14:30)'
      ]
    },
    {
      id: 'brazil',
      name: 'Brazil',
      nativeName: 'Brasil',
      flag: '🇧🇷',
      region: 'americas',
      pavilion: 'Global Diaspora & African Village',
      heroImg: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      tagline: 'Rhythms of Samba, Rainforest & Carnival Energy',
      intro: 'Brazil pulses with electric enthusiasm, famous for the magnificent Rio Carnival, Afro-Brazilian martial art Capoeira, and the untamed expanse of the Amazon River basin.',
      language: 'Portuguese (Português)',
      foodHighlight: 'Slow-simmered Feijoada black bean stew, Pão de Queijo cheese bread, and Açaí bowls.',
      attireHighlight: 'Dazzling feathered Carnival Samba costumes and traditional Baiana lace dresses.',
      facts: [
        'Brazil is the fifth largest country in the world both by area and population.',
        'The Amazon Rainforest contains roughly 10% of the world\'s known biodiversity.',
        'Capoeira was created by enslaved Africans in Brazil as a martial art disguised as dance.'
      ],
      relatedEvents: [
        'Capoeira Acrobatics & Batucada (Day 2 - 17:00)',
        'Samba Carnival Street Parade (Day 3 - 19:30)'
      ]
    },
    {
      id: 'nigeria',
      name: 'Nigeria',
      nativeName: 'Nàìjíríà',
      flag: '🇳🇬',
      region: 'africa',
      pavilion: 'African Village',
      heroImg: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?auto=format&fit=crop&w=600&q=80',
      tagline: 'The Giant of Africa: Nollywood, Beats & Royal Ankara',
      intro: 'Nigeria is a powerhouse of African arts and innovation, pulsating with Afrobeats, vibrant royal Agbada garments, over 250 ethnic groups, and profound oral storytelling traditions.',
      language: 'English, Hausa, Yoruba, Igbo, Nigerian Pidgin',
      foodHighlight: 'Smoky party Jollof Rice, peppery Suya beef skewers, and Pounded Yam with Egusi soup.',
      attireHighlight: 'Magnificent Gele head-ties, bespoke Ankara wax prints, and flowing embroidered Agbada.',
      facts: [
        'Nollywood is one of the largest film industries in the world by film volume.',
        'Afrobeats has become one of the fastest-growing global music genres.',
        'Nigeria is home to the ancient Benin Bronzes, celebrated worldwide for intricate metallurgical skill.'
      ],
      relatedEvents: [
        'Djembe & Talking Drum Masterclass (Day 1 - 16:00)',
        'Afrobeats Campus Dance Clash (Day 2 - 20:30)'
      ]
    },
    {
      id: 'south-korea',
      name: 'South Korea',
      nativeName: '대한민국',
      flag: '🇰🇷',
      region: 'east-asia',
      pavilion: 'East Asian Cultural Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      tagline: 'The Hallyu Wave: From Joseon Royalty to K-Pop',
      intro: 'South Korea merges millennial Joseon dynasties with contemporary design, celebrated for its global music, cinema, vibrant night markets, and deep respect for ancestral harmony.',
      language: 'Korean (한국어)',
      foodHighlight: 'Spicy Tteokbokki rice cakes, Bibimbap with Gochujang, and Korean Fried Chicken.',
      attireHighlight: 'Graceful silk Hanbok characterized by vibrant lines, billowing Chima skirts, and Jeogori jackets.',
      facts: [
        'Hangul, the Korean alphabet, was scientifically invented by King Sejong the Great in 1443.',
        'Over 200 distinct varieties of traditional Kimchi are preserved across Korea.',
        'Seoul is one of the most digitally wired smart cities in the world.'
      ],
      relatedEvents: [
        'K-Pop Random Dance Challenge (Day 1 - 19:00)',
        'Traditional Samulnori Percussion (Day 2 - 15:00)'
      ]
    },
    {
      id: 'mexico',
      name: 'Mexico',
      nativeName: 'México',
      flag: '🇲🇽',
      region: 'americas',
      pavilion: 'Global Diaspora Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      tagline: 'Ancient Mesoamerica, Mariachi & Folkloric Passion',
      intro: 'Rich with Mayan and Aztec heritage, Spanish baroque colonial plazas, and passionate mariachi brass, Mexico is an unforgettable sensory feast of flavor, color, and heartfelt celebration.',
      language: 'Spanish (Español), Nahuatl, Maya',
      foodHighlight: 'Handmade Corn Tortilla Tacos Al Pastor, Guacamole, Churros with Dulce de Leche.',
      attireHighlight: 'Embroidered China Poblana dresses, broad Charro sombreros, and Huipil tunics.',
      facts: [
        'Mexican gastronomy is designated as an Intangible Cultural Heritage of Humanity by UNESCO.',
        'The Great Pyramid of Cholula has the largest base of any pyramid known on Earth.',
        'Día de los Muertos celebrates ancestors through radiant Marigold flowers and sugar skulls.'
      ],
      relatedEvents: [
        'Mariachi Fiesta Showcase (Day 2 - 18:30)',
        'Salsa & Guacamole Cook-Off (Day 3 - 13:00)'
      ]
    },
    {
      id: 'china',
      name: 'China',
      nativeName: '中国',
      flag: '🇨🇳',
      region: 'east-asia',
      pavilion: 'East Asian Cultural Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      tagline: '5,000 Years of Dynastic Grandeur & Philosophy',
      intro: 'Home to the Silk Road, Great Wall, and calligraphy arts, China’s philosophical roots in Taoism, Confucianism, and Buddhism have shaped Asia’s cultural landscape for millennia.',
      language: 'Mandarin (普通话), Cantonese, Shanghainese',
      foodHighlight: 'Handmade Dim Sum dumplings, Peking Duck, Sichuan Spicy Noodles, and Spring Rolls.',
      attireHighlight: 'Hanfu robes with flowing sleeves and modern Cheongsam (Qipao) silk dresses.',
      facts: [
        'The Great Wall of China is over 21,000 kilometers long.',
        'Paper, printing, gunpowder, and the compass all originated in ancient China.',
        'Tea culture has been practiced and refined in China for over 4,000 years.'
      ],
      relatedEvents: [
        'Lion & Dragon Dance Spectacular (Day 1 - 10:30)',
        'Calligraphy & Tea Ceremony (Day 2 - 14:00)'
      ]
    },
    {
      id: 'indonesia',
      name: 'Indonesia',
      nativeName: 'Indonesia',
      flag: '🇮🇩',
      region: 'asean',
      pavilion: 'ASEAN & Malay World Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=600&q=80',
      tagline: 'The Emerald Archipelago: 17,000 Islands of Wonder',
      intro: 'Indonesia stretches across volcanoes and coral reefs, renowned for the Kecak fire dances of Bali, Borobudur stupas, exquisite master batik textiles, and warm hospitality.',
      language: 'Bahasa Indonesia, Javanese, Sundanese, Balinese',
      foodHighlight: 'Beef Rendang slow-cooked in coconut milk, Nasi Goreng, and Gado-Gado peanut salad.',
      attireHighlight: 'UNESCO-inscribed Indonesian Batik, Kebaya blouses, and traditional woven Ikat sarongs.',
      facts: [
        'Indonesia has the world\'s largest island count for any sovereign state (over 17,500).',
        'Komodo Island is the exclusive native habitat of the giant Komodo Dragon.',
        'Borobudur in Central Java is the world\'s largest Buddhist monument.'
      ],
      relatedEvents: [
        'Balinese Kecak Chanting Workshop (Day 1 - 17:00)',
        'Indonesian Rendang Masterclass (Day 2 - 12:00)'
      ]
    },
    {
      id: 'france',
      name: 'France',
      nativeName: 'France',
      flag: '🇫🇷',
      region: 'europe',
      pavilion: 'Global Diaspora Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      tagline: 'Haute Couture, Impressionism & Culinary Elegance',
      intro: 'From Parisian cafe terraces to the lavender fields of Provence, France epitomizes intellectual salon debate, literary brilliance, cinema, and unmatched culinary refinement.',
      language: 'French (Français)',
      foodHighlight: 'Freshly baked Baguettes, artisan Cheeses, French Crepes, Macarons, and Ratatouille.',
      attireHighlight: 'Chic Parisian haute couture silhouettes, sailor Marinière stripes, and Basque berets.',
      facts: [
        'France is historically the world\'s most visited tourist destination.',
        'The Louvre in Paris is the largest art museum on Earth.',
        'French cuisine was the first national gastronomy recognized by UNESCO.'
      ],
      relatedEvents: [
        'Parisian Fashion & Textile Runway (Day 2 - 19:00)',
        'Crepe Making & French Chanson Concert (Day 3 - 15:00)'
      ]
    },
    {
      id: 'egypt',
      name: 'Egypt',
      nativeName: 'مصر',
      flag: '🇪🇬',
      region: 'africa',
      pavilion: 'African & Mediterranean Pavilion',
      heroImg: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85',
      foodImg: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
      attireImg: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80',
      tagline: 'Cradle of Civilizations on the Sacred Nile',
      intro: 'With over 5,000 years of recorded history, Egypt captivates the world with its monumental pyramids, hieroglyphic temples, soulful Nubian oud ballads, and bustling Khan el-Khalili souks.',
      language: 'Arabic (العربية), Egyptian Arabic',
      foodHighlight: 'Koshari (comfort dish of rice, lentils, and crispy onions), Taameya falafel, and Baklava.',
      attireHighlight: 'Breezy linen Galabeya robes, gold filigree collars, and patterned bedouin scarves.',
      facts: [
        'The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years.',
        'The River Nile is considered the lifeline of Egyptian agriculture and civilization.',
        'Ancient Egyptians invented one of the earliest forms of paper from papyrus reeds.'
      ],
      relatedEvents: [
        'Oud Rhythms & Middle Eastern Strings (Day 1 - 18:30)',
        'Papyrus & Hieroglyphic Art Guild (Day 3 - 11:00)'
      ]
    }
  ];

  function renderCultureCards(filterRegion = 'all', searchQuery = '') {
    const container = document.getElementById('cultures-grid');
    if (!container) return;

    const filtered = CULTURES_DATA.filter(c => {
      const matchRegion = filterRegion === 'all' || c.region === filterRegion;
      const matchSearch = searchQuery === '' || 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.pavilion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 4rem 1rem; color:var(--text-muted);">
          <div style="font-size:2.5rem; margin-bottom:1rem;">🌍</div>
          <h3>No matching cultures found</h3>
          <p>Try adjusting your search terms or filter selection.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(c => `
      <article class="pavilion-card" style="cursor:pointer;" onclick="GFCultures.openCultureModal('${c.id}')">
        <div class="pavilion-img-wrap">
          <img src="${c.heroImg}" alt="${c.name} culture preview" class="pavilion-img" loading="lazy" />
          <span class="pavilion-badge-tag" style="background:var(--color-navy); border:1px solid rgba(255,255,255,0.2);">
            ${c.flag} ${c.name}
          </span>
        </div>
        <div class="pavilion-card-body">
          <span style="font-size:0.75rem; font-weight:700; color:var(--color-coral); text-transform:uppercase; letter-spacing:0.5px;">
            ${c.pavilion}
          </span>
          <h3 class="pavilion-card-title" style="margin-top:0.35rem;">
            ${c.name} <span style="font-size:0.9rem; font-weight:400; opacity:0.7;">(${c.nativeName})</span>
          </h3>
          <p class="pavilion-card-desc">${c.tagline}</p>
          <div class="pavilion-card-footer">
            <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">
              📍 Pavilion Exhibit
            </span>
            <span class="pavilion-explore-btn">
              Explore Culture &rarr;
            </span>
          </div>
        </div>
      </article>
    `).join('');
  }

  function openCultureModal(id) {
    const item = CULTURES_DATA.find(c => c.id === id);
    if (!item) return;

    let modal = document.getElementById('culture-detail-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'culture-detail-modal';
      modal.className = 'passport-modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);
    }

    // Automatically stamp user's passport when they explore!
    if (window.GFPassport) {
      window.GFPassport.addStamp(item.id);
    }

    modal.innerHTML = `
      <div style="background:var(--bg-card); color:var(--text-primary); border-radius:var(--radius-xl); max-width:880px; width:100%; max-height:92vh; overflow-y:auto; border:1px solid var(--border-medium); box-shadow:var(--shadow-lg); position:relative;">
        <div style="position:relative; height:320px; overflow:hidden;">
          <img src="${item.heroImg}" alt="${item.name} hero" style="width:100%; height:100%; object-fit:cover;" />
          <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(7,11,24,0.2) 0%, rgba(7,11,24,0.85) 100%);"></div>
          <button id="close-culture-modal" style="position:absolute; top:1.25rem; right:1.25rem; background:rgba(0,0,0,0.6); color:#fff; width:38px; height:38px; border-radius:var(--radius-full); font-size:1.4rem; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(4px); z-index:10;">
            &times;
          </button>
          <div style="position:absolute; bottom:1.5rem; left:2rem; right:2rem; color:#fff;">
            <div style="display:inline-flex; align-items:center; gap:0.5rem; background:rgba(255,255,255,0.15); backdrop-filter:blur(8px); padding:0.3rem 0.8rem; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; margin-bottom:0.5rem;">
              <span>${item.flag}</span>
              <span>${item.pavilion}</span>
            </div>
            <h2 style="font-family:var(--font-display); font-size:2.4rem; font-weight:900; line-height:1.1;">
              ${item.name} <span style="font-size:1.3rem; font-weight:500; opacity:0.85;">(${item.nativeName})</span>
            </h2>
            <p style="color:#E2E8F0; font-size:1rem; font-weight:600;">${item.tagline}</p>
          </div>
        </div>

        <div style="padding:2rem;">
          <div style="margin-bottom:1.75rem;">
            <h4 style="font-size:0.85rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--color-coral); margin-bottom:0.5rem;">
              Overview &amp; Heritage
            </h4>
            <p style="font-size:1rem; line-height:1.6; color:var(--text-secondary);">${item.intro}</p>
            <div style="margin-top:0.75rem; font-size:0.85rem; font-weight:600; color:var(--text-muted);">
              🗣️ <strong>Language:</strong> ${item.language}
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:2rem;">
            <div style="background:var(--bg-secondary); border-radius:var(--radius-lg); overflow:hidden; border:1px solid var(--border-light);">
              <img src="${item.foodImg}" alt="${item.name} Cuisine" style="height:160px; width:100%; object-fit:cover;" />
              <div style="padding:1rem;">
                <h5 style="font-family:var(--font-display); font-weight:800; font-size:0.95rem; margin-bottom:0.35rem; color:var(--color-orange);">
                  🍲 Signature Flavors
                </h5>
                <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.45;">${item.foodHighlight}</p>
              </div>
            </div>

            <div style="background:var(--bg-secondary); border-radius:var(--radius-lg); overflow:hidden; border:1px solid var(--border-light);">
              <img src="${item.attireImg}" alt="${item.name} Traditional Attire" style="height:160px; width:100%; object-fit:cover;" />
              <div style="padding:1rem;">
                <h5 style="font-family:var(--font-display); font-weight:800; font-size:0.95rem; margin-bottom:0.35rem; color:var(--color-turquoise);">
                  👘 Traditional Attire &amp; Art
                </h5>
                <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.45;">${item.attireHighlight}</p>
              </div>
            </div>
          </div>

          <div style="background:var(--bg-secondary); border-left:4px solid var(--color-yellow); padding:1.25rem; border-radius:var(--radius-md); margin-bottom:1.75rem;">
            <h5 style="font-weight:800; font-size:0.9rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:0.6rem; color:var(--text-primary);">
              💡 Fascinating Cultural Facts
            </h5>
            <ul style="list-style:disc; margin-left:1.25rem; font-size:0.88rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:0.4rem;">
              ${item.facts.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; padding-top:1.25rem; border-top:1px solid var(--border-light);">
            <div style="font-size:0.85rem; font-weight:700; color:var(--color-green);">
              ✅ Passport Stamp Acquired!
            </div>
            <div style="display:flex; gap:0.75rem;">
              <button id="view-in-passport-btn" data-open-passport class="btn-secondary" style="font-size:0.82rem; padding:0.5rem 1rem; cursor:pointer;">
                View In Passport
              </button>
              <a href="schedule.html" class="btn-primary" style="font-size:0.82rem; padding:0.5rem 1rem;">
                Festival Schedule &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    document.getElementById('close-culture-modal').addEventListener('click', closeCultureModal);
    const viewPassportBtn = document.getElementById('view-in-passport-btn');
    if (viewPassportBtn) {
      viewPassportBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.GFPassport && typeof window.GFPassport.openPassportModal === 'function') {
          window.GFPassport.openPassportModal();
        }
      });
    }
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCultureModal();
    });
  }

  function closeCultureModal() {
    const modal = document.getElementById('culture-detail-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Check if on cultures page
    const container = document.getElementById('cultures-grid');
    if (container) {
      renderCultureCards();

      // Region filter buttons
      document.querySelectorAll('[data-culture-filter]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('[data-culture-filter]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const region = btn.getAttribute('data-culture-filter');
          const searchVal = document.getElementById('culture-search-input') ? document.getElementById('culture-search-input').value : '';
          renderCultureCards(region, searchVal);
        });
      });

      // Search input
      const searchInput = document.getElementById('culture-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const activeFilterBtn = document.querySelector('[data-culture-filter].active');
          const region = activeFilterBtn ? activeFilterBtn.getAttribute('data-culture-filter') : 'all';
          renderCultureCards(region, e.target.value);
        });
      }
    }
  });

  window.GFCultures = { CULTURES_DATA, renderCultureCards, openCultureModal, closeCultureModal };
})();
