/**
 * Global Fusion 2026 - FAQ Interactive Accordion & Search Filter
 * 16 comprehensive FAQs across 7 categories with keyboard accessibility
 */

(function () {
  const FAQ_DATA = [
    {
      id: 1,
      category: 'general',
      question: 'What is Global Fusion 2026 and who is organizing it?',
      answer: 'Global Fusion 2026 is an ambitious academic student cultural festival organized by LBEF College (Lord Buddha Education Foundation) in academic collaboration with Asia Pacific University of Technology & Innovation (APU). It brings together over 20 cultures, 50 street food stalls, and 15 stage performances to celebrate unity in diversity across our student body.'
    },
    {
      id: 2,
      category: 'general',
      question: 'When and where will Global Fusion 2026 take place?',
      answer: 'The festival runs from 3 December to 5 December 2026. The primary venue is the LBEF Campus Grounds and Floating Pavilion in Kathmandu, Nepal, with live virtual broadcasts and academic tech streams connecting to APU Malaysia.'
    },
    {
      id: 3,
      category: 'tickets',
      question: 'Is admission free for students and delegates?',
      answer: 'Yes! Standard Student and General Delegate Passes are 100% complimentary upon registration. Your pass provides general grounds entry, pavilion access, music stage concerts, and workshop attendance. Optional food tasting tokens can be purchased at street food stalls.'
    },
    {
      id: 4,
      category: 'registration',
      question: 'How do I obtain my Digital Festival Pass?',
      answer: 'Navigate to our Registration page (or click "Get Your Pass" anywhere on the site) and complete the 5-step form. Once submitted, your simulated pass with a unique Pass ID (e.g. GF26-1044) and QR code will be generated instantly and stored in your Participant Dashboard.'
    },
    {
      id: 5,
      category: 'registration',
      question: 'Can students from other colleges or international visitors attend?',
      answer: 'Absolutely. Global Fusion welcomes students from across Nepal, international exchange delegates, and community guests. Select "International Visitor / External Delegate" on the registration form.'
    },
    {
      id: 6,
      category: 'competitions',
      question: 'What competitions are featured and what are the prizes?',
      answer: 'We host four flagship competitions with a total prize pool of NRs 350,000: Global Culinary Clash (NRs 75,000), Folk Dance Championship (NRs 100,000), Cultural UI/UX Hackathon (NRs 85,000), and World Heritage Film & Poetry (NRs 90,000).'
    },
    {
      id: 7,
      category: 'competitions',
      question: 'Can I participate in more than one competition?',
      answer: 'Students can register for up to one performance/culinary competition and additionally enter the Cultural UI/UX Hackathon or Film & Poetry challenge, provided the stage rehearsal schedules do not overlap.'
    },
    {
      id: 8,
      category: 'activities',
      question: 'What is the Global Fusion Digital Passport challenge?',
      answer: 'The Digital Passport is our signature interactive feature! As you explore our 6 Cultural Pavilions and culture exhibits, you earn digital cultural visa stamps. When you collect all 6 stamps, you unlock the "Global Explorer" completion badge on your dashboard!'
    },
    {
      id: 9,
      category: 'activities',
      question: 'How do the workshops work? Do I need prior experience?',
      answer: 'No prior experience is necessary. Workshops like Malaysian Batik Waxing, West African Djembe Polyrhythms, and Origami are designed for beginner learners, led by enthusiastic student cultural ambassadors and master craftsmen.'
    },
    {
      id: 10,
      category: 'activities',
      question: 'Are the food stalls Halal and Vegetarian-friendly?',
      answer: 'Yes! Every food stall clearly displays dietary markers including 100% Halal, Pure Vegetarian, Vegan, Gluten-Free, and spicy levels (Mild, Medium, Fiery).'
    },
    {
      id: 11,
      category: 'venue',
      question: 'Where can I park or how do I reach the festival venue?',
      answer: 'Designated parking is available at LBEF Main Gate and the adjacent student sports ground. Free eco-shuttle vans will run continuously every 15 minutes connecting central Kathmandu transit hubs to the campus.'
    },
    {
      id: 12,
      category: 'venue',
      question: 'Will there be secure lockers for performance costumes and props?',
      answer: 'Yes, registered performers and competition teams have access to secure backstage changing rooms and lockers in the Main Arena backstage annex.'
    },
    {
      id: 13,
      category: 'accessibility',
      question: 'Is the festival accessible for attendees with mobility challenges?',
      answer: 'All pavilions, stages, and main food street concourses feature level wheelchair ramps, accessible restrooms, dedicated front-row stage seating, and trained volunteer guides.'
    },
    {
      id: 14,
      category: 'accessibility',
      question: 'Are sensory-friendly or quiet zones available during loud concerts?',
      answer: 'Yes. The Campus Library Serenity Lounge serves as an air-conditioned quiet sanctuary with low ambient lighting, complimentary herbal tea, and noise-reducing earplugs available upon request.'
    },
    {
      id: 15,
      category: 'tickets',
      question: 'What if I lose my digital pass?',
      answer: 'Your pass is saved locally in your browser! Simply visit the Participant Dashboard on this website from your phone to present your Pass ID and QR code to gate security at any time.'
    },
    {
      id: 16,
      category: 'general',
      question: 'How can I volunteer to join the organizing crew?',
      answer: 'We welcome passionate volunteers! Download the Volunteer Guide from our Resources page or submit an inquiry through our Contact page under the "Volunteer Application" topic.'
    }
  ];

  let activeCategory = 'all';
  let searchKeyword = '';

  function renderFAQs() {
    const container = document.getElementById('faq-accordion-container');
    if (!container) return;

    const filtered = FAQ_DATA.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = searchKeyword === '' ||
        item.question.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:3.5rem; background:var(--bg-card); border-radius:var(--radius-xl); border:1px solid var(--border-medium); color:var(--text-muted);">
          <div style="font-size:2.2rem; margin-bottom:0.75rem;">🔍</div>
          <h4>No matching questions found</h4>
          <p>Try searching with another keyword or explore all categories.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(item => `
      <div class="faq-item" style="margin-bottom:1rem; border:1px solid var(--border-medium); border-radius:var(--radius-lg); background:var(--bg-card); overflow:hidden;">
        <button class="faq-question-btn" onclick="GFFAQ.toggleFAQ(${item.id})" aria-expanded="false" style="width:100%; padding:1.25rem 1.5rem; text-align:left; font-family:var(--font-display); font-weight:800; font-size:1.05rem; color:var(--text-primary); display:flex; justify-content:space-between; align-items:center; gap:1rem;">
          <span>${item.question}</span>
          <span class="faq-chevron" id="faq-chevron-${item.id}" style="color:var(--color-coral); font-size:1.3rem; transition:transform 0.25s ease; flex-shrink:0;">+</span>
        </button>
        <div class="faq-answer-wrap accordion-content" id="faq-answer-${item.id}">
          <div class="accordion-inner" style="padding:0 1.5rem 1.25rem; font-size:0.95rem; color:var(--text-secondary); line-height:1.6; border-top:1px dashed var(--border-light);">
            <div style="padding-top:0.75rem;">${item.answer}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function toggleFAQ(id) {
    const answerWrap = document.getElementById(`faq-answer-${id}`);
    const chevron = document.getElementById(`faq-chevron-${id}`);
    if (!answerWrap || !chevron) return;

    const isOpen = answerWrap.classList.contains('expanded');
    if (isOpen) {
      answerWrap.classList.remove('expanded');
      chevron.textContent = '+';
      chevron.style.transform = 'rotate(0deg)';
    } else {
      answerWrap.classList.add('expanded');
      chevron.textContent = '−';
      chevron.style.transform = 'rotate(180deg)';
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('faq-accordion-container');
    if (container) {
      renderFAQs();

      document.querySelectorAll('[data-faq-category]').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('[data-faq-category]').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeCategory = btn.getAttribute('data-faq-category');
          renderFAQs();
        });
      });

      const searchInput = document.getElementById('faq-search-input');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          searchKeyword = e.target.value;
          renderFAQs();
        });
      }
    }
  });

  window.GFFAQ = { FAQ_DATA, renderFAQs, toggleFAQ };
})();
