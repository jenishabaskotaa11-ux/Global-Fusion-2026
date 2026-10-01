/**
 * Global Fusion 2026 - Cultural Quiz: "HOW GLOBAL ARE YOU?"
 * 10 dynamic multicultural questions, live timer, progress bar, calculated score & tiers
 */

(function () {
  const QUIZ_QUESTIONS = [
    {
      question: 'Which traditional Nepali instrument is carved from a single block of wood and played with a horsehair bow?',
      options: ['Sarangi', 'Madal', 'Tungna', 'Bansuri'],
      correct: 0,
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      fact: 'The Sarangi is the signature bowed folk lute of Nepal, traditionally played by the Gandharva community.'
    },
    {
      question: 'In Malaysian culinary heritage, what natural wrapping is traditionally used to steam or serve fragrant Nasi Lemak?',
      options: ['Lotus Leaf', 'Banana Leaf', 'Bamboo Sheath', 'Pandan Leaf'],
      correct: 1,
      image: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=600&q=80',
      fact: 'Banana leaves impart a delicate aroma and prevent the coconut-infused rice from drying out.'
    },
    {
      question: 'What is the Japanese aesthetic concept that finds serene beauty in imperfection, asymmetry, and impermanence?',
      options: ['Ikigai', 'Wabi-Sabi', 'Kaizen', 'Mono no Aware'],
      correct: 1,
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80',
      fact: 'Wabi-sabi celebrates weathered wood, cracked kintsugi pottery, and seasonal autumn leaves.'
    },
    {
      question: 'Capoeira, the dynamic Afro-Brazilian martial art incorporating acrobatic kicks and rhythm, originated in which setting?',
      options: ['Ancient Inca Mountain Forts', 'Enslaved African Communities Disguising Combat as Dance', 'Royal Portuguese Naval Courts', 'Amazonian Indigenous Tribes'],
      correct: 1,
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
      fact: 'Practitioners formed a circle called a roda while singing call-and-response songs with the berimbau musical bow.'
    },
    {
      question: 'Which West African drum is known as the "talking drum" because it can mimic the pitch, tone, and inflection of human speech?',
      options: ['Djembe', 'Tama (Dundun)', 'Shekere', 'Balafon'],
      correct: 1,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      fact: 'By squeezing the strings that connect the drumheads under the arm, the player alters the pitch to mimic tonal languages.'
    },
    {
      question: 'In Mexican Día de los Muertos traditions, which vibrant orange flower is laid out on ofrendas to guide spirits home?',
      options: ['Hibiscus', 'Cempasúchil (Mexican Marigold)', 'Dahlia', 'Bougainvillea'],
      correct: 1,
      image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&w=600&q=80',
      fact: 'The scent and golden luminescence of cempasúchil petals create an aromatic pathway for ancestral spirits.'
    },
    {
      question: 'What is the traditional graceful Korean garment characterized by vibrant colors and billowing chima skirts called?',
      options: ['Qipao', 'Hanbok', 'Kimono', 'Yukata'],
      correct: 1,
      image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=600&q=80',
      fact: 'Hanbok has been worn since the Three Kingdoms period and continues to be worn for weddings, Chuseok, and Seollal.'
    },
    {
      question: 'In South Asian classical music and Kathak dance, what are the metallic bells strapped around performers’ ankles called?',
      options: ['Ghungroo', 'Tabla', 'Manjira', 'Khol'],
      correct: 0,
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=600&q=80',
      fact: 'A Kathak dancer may wear up to 200 Ghungroos on each ankle to emphasize complex rhythmic footwork.'
    },
    {
      question: 'Which ancient wonder of the world, built by Pharaoh Khufu along the Nile River, is located near Cairo, Egypt?',
      options: ['Great Pyramid of Giza', 'Lighthouse of Alexandria', 'Colossus of Rhodes', 'Hanging Gardens'],
      correct: 0,
      image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=600&q=80',
      fact: 'The Great Pyramid of Giza is the oldest and only surviving monument of the original Seven Wonders of the Ancient World.'
    },
    {
      question: 'Which Indonesian island is globally acclaimed for its hypnotic Kecak fire dance drama performed at sunset cliffs in Uluwatu?',
      options: ['Sumatra', 'Bali', 'Java', 'Sulawesi'],
      correct: 1,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
      fact: 'Kecak is chanted by an a cappella choir of up to 100 men rhythmically chanting "cak-cak-cak" in circle formation.'
    }
  ];

  let currentQIdx = 0;
  let userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);
  let timerSeconds = 30;
  let timerInterval = null;

  function startTimer() {
    clearInterval(timerInterval);
    timerSeconds = 30;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
      timerSeconds--;
      updateTimerDisplay();
      if (timerSeconds <= 0) {
        clearInterval(timerInterval);
        // Never skip an unanswered question when the timer expires.
        if (userAnswers[currentQIdx] !== null) nextQuestion();
        else showAnswerRequired('Time is up. Please select an answer to continue.');
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const timerEl = document.getElementById('quiz-timer');
    if (timerEl) {
      timerEl.textContent = `${timerSeconds}s`;
      if (timerSeconds <= 5) {
        timerEl.style.color = 'var(--color-coral)';
      } else {
        timerEl.style.color = 'var(--color-yellow)';
      }
    }
  }

  function renderQuestion() {
    const q = QUIZ_QUESTIONS[currentQIdx];
    const total = QUIZ_QUESTIONS.length;

    const numEl = document.getElementById('quiz-question-number');
    const totalEl = document.getElementById('quiz-question-total');
    const barFill = document.getElementById('quiz-progress-bar-fill');
    const titleEl = document.getElementById('quiz-question-title');
    const imgEl = document.getElementById('quiz-question-img');
    const optionsGrid = document.getElementById('quiz-options-grid');
    const prevBtn = document.getElementById('quiz-prev-btn');
    const nextBtn = document.getElementById('quiz-next-btn');

    if (numEl) numEl.textContent = currentQIdx + 1;
    if (totalEl) totalEl.textContent = total;
    if (barFill) barFill.style.width = `${((currentQIdx + 1) / total) * 100}%`;
    if (titleEl) titleEl.textContent = q.question;
    if (imgEl) imgEl.src = q.image;

    if (prevBtn) {
      prevBtn.disabled = currentQIdx === 0;
      prevBtn.style.opacity = currentQIdx === 0 ? '0.4' : '1';
    }

    if (nextBtn) {
      nextBtn.disabled = userAnswers[currentQIdx] === null;
      nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
      nextBtn.textContent = currentQIdx === total - 1 ? 'Finish & See Score 🏆' : 'Next Question →';
    }

    if (optionsGrid) {
      const selected = userAnswers[currentQIdx];
      optionsGrid.innerHTML = q.options.map((opt, idx) => {
        const isSelected = selected === idx;
        return `
          <button class="quiz-option-btn ${isSelected ? 'selected' : ''}" onclick="GFQuiz.selectAnswer(${idx})" style="padding:1.1rem 1.4rem; border-radius:var(--radius-lg); border:2px solid ${isSelected ? 'var(--color-orange)' : 'var(--border-medium)'}; background:${isSelected ? 'rgba(255,122,0,0.15)' : 'var(--bg-secondary)'}; color:var(--text-primary); text-align:left; font-weight:700; font-size:1rem; display:flex; align-items:center; gap:0.75rem; transition:all 0.15s ease;">
            <span style="width:32px; height:32px; border-radius:var(--radius-full); background:${isSelected ? 'var(--color-orange)' : 'var(--bg-card)'}; color:${isSelected ? '#fff' : 'var(--text-muted)'}; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:0.85rem; border:1px solid var(--border-medium); flex-shrink:0;">
              ${String.fromCharCode(65 + idx)}
            </span>
            <span>${opt}</span>
          </button>
        `;
      }).join('');
    }

    const requiredMsg = document.getElementById('quiz-answer-required');
    if (requiredMsg) requiredMsg.textContent = userAnswers[currentQIdx] === null ? 'Select an answer to continue. All questions are required.' : '';
    startTimer();
  }

  function showAnswerRequired(message) {
    const el = document.getElementById('quiz-answer-required');
    if (el) el.textContent = message || 'Please select an answer before continuing.';
  }

  function selectAnswer(idx) {
    if (!Number.isInteger(idx) || idx < 0 || idx >= QUIZ_QUESTIONS[currentQIdx].options.length) return;
    userAnswers[currentQIdx] = idx;
    renderQuestion();
  }

  function prevQuestion() {
    if (currentQIdx > 0) {
      currentQIdx--;
      renderQuestion();
    }
  }

  function nextQuestion() {
    if (userAnswers[currentQIdx] === null) {
      showAnswerRequired();
      return;
    }
    if (currentQIdx < QUIZ_QUESTIONS.length - 1) {
      currentQIdx++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    const unanswered = userAnswers.findIndex(answer => answer === null);
    if (unanswered !== -1) {
      currentQIdx = unanswered;
      renderQuestion();
      showAnswerRequired('Please answer every question before finishing the quiz.');
      return;
    }
    clearInterval(timerInterval);

    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (userAnswers[idx] === q.correct) {
        score++;
      }
    });

    const quizBox = document.getElementById('quiz-active-box');
    const resultsBox = document.getElementById('quiz-results-box');
    const scoreNum = document.getElementById('quiz-final-score');
    const tierTitle = document.getElementById('quiz-tier-title');
    const tierDesc = document.getElementById('quiz-tier-desc');
    const tierBadge = document.getElementById('quiz-tier-badge');

    if (quizBox) quizBox.style.display = 'none';
    if (resultsBox) resultsBox.style.display = 'block';
    if (scoreNum) scoreNum.textContent = `${score} / ${QUIZ_QUESTIONS.length}`;

    let tier = '';
    let desc = '';
    let badge = '';

    if (score >= 8) {
      tier = 'WORLD CITIZEN';
      badge = '🌟 Master of Global Heritage';
      desc = 'Extraordinary knowledge! You possess a deep, cosmopolitan understanding of world arts, culinary roots, and cultural traditions. You are an exemplary global ambassador for Global Fusion 2026.';
    } else if (score >= 5) {
      tier = 'GLOBAL TRAVELLER';
      badge = '✈️ Avid Cultural Explorer';
      desc = 'Impressive work! You have strong cross-cultural awareness and curiosity. Global Fusion 2026 will broaden your horizons even further across all 6 cultural pavilions.';
    } else {
      tier = 'CULTURE EXPLORER';
      badge = '🧭 Curious Beginner Navigator';
      desc = 'A great start to your journey! You have endless exciting discoveries waiting for you at the festival stalls, music stages, and cultural workshops.';
    }

    if (tierTitle) tierTitle.textContent = tier;
    if (tierBadge) tierBadge.textContent = badge;
    if (tierDesc) tierDesc.textContent = desc;
  }

  function restartQuiz() {
    currentQIdx = 0;
    userAnswers = new Array(QUIZ_QUESTIONS.length).fill(null);

    const quizBox = document.getElementById('quiz-active-box');
    const resultsBox = document.getElementById('quiz-results-box');

    if (quizBox) quizBox.style.display = 'block';
    if (resultsBox) resultsBox.style.display = 'none';

    renderQuestion();
  }

  document.addEventListener('DOMContentLoaded', () => {
    const quizBox = document.getElementById('quiz-active-box');
    if (quizBox) {
      renderQuestion();

      const prevBtn = document.getElementById('quiz-prev-btn');
      if (prevBtn) prevBtn.addEventListener('click', prevQuestion);

      const nextBtn = document.getElementById('quiz-next-btn');
      if (nextBtn) nextBtn.addEventListener('click', nextQuestion);

      const restartBtn = document.getElementById('quiz-restart-btn');
      if (restartBtn) restartBtn.addEventListener('click', restartQuiz);
    }
  });

  window.GFQuiz = { selectAnswer, prevQuestion, nextQuestion, restartQuiz };
})();
