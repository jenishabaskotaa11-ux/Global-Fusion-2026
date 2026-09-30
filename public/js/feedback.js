/**
 * Global Fusion 2026 - Feedback & Survey System
 * Interactive star ratings, recommendation score, validation & localStorage storage
 */

(function () {
  const FEEDBACK_STORAGE_KEY = 'gf_user_feedback';

  const feedbackState = {
    overallRating: 5,
    orgRating: 5,
    activityRating: 5,
    favoriteActivity: 'Global Food Street & Pavilions',
    wouldAttendAgain: 'Definitely',
    recommendationScore: 10,
    comments: '',
    suggestions: ''
  };

  function initStarRatings() {
    document.querySelectorAll('.star-rating-group').forEach(group => {
      const field = group.getAttribute('data-field');
      const stars = group.querySelectorAll('.star-btn');

      stars.forEach(star => {
        star.addEventListener('click', (e) => {
          e.preventDefault();
          const rating = parseInt(star.getAttribute('data-value'), 10);
          feedbackState[field] = rating;

          // Update active visuals
          stars.forEach(s => {
            const val = parseInt(s.getAttribute('data-value'), 10);
            if (val <= rating) {
              s.classList.add('active');
              s.innerHTML = '★';
            } else {
              s.classList.remove('active');
              s.innerHTML = '☆';
            }
          });
        });
      });
    });
  }

  function initRecommendationScale() {
    const scaleButtons = document.querySelectorAll('.nps-btn');
    scaleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        scaleButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        feedbackState.recommendationScore = parseInt(btn.getAttribute('data-value'), 10);
      });
    });
  }

  function handleSurveySubmit(e) {
    e.preventDefault();

    const commentsEl = document.getElementById('feedback-comments');
    const suggestionsEl = document.getElementById('feedback-suggestions');
    const favActivityEl = document.getElementById('feedback-fav-activity');
    const attendAgainEl = document.querySelector('input[name="feedback_attend"]:checked');

    feedbackState.comments = commentsEl ? commentsEl.value.trim() : '';
    feedbackState.suggestions = suggestionsEl ? suggestionsEl.value.trim() : '';
    feedbackState.favoriteActivity = favActivityEl ? favActivityEl.value : 'Global Food Street';
    feedbackState.wouldAttendAgain = attendAgainEl ? attendAgainEl.value : 'Definitely';

    // Store in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem(FEEDBACK_STORAGE_KEY) || '[]');
      existing.push({
        ...feedbackState,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    // Show Thank-You State
    const formBox = document.getElementById('feedback-form-box');
    const thankYouBox = document.getElementById('feedback-thankyou-box');

    if (formBox) formBox.style.display = 'none';
    if (thankYouBox) {
      thankYouBox.style.display = 'block';
      thankYouBox.classList.add('fade-in');
    }

    window.GFUtils && window.GFUtils.showToast('Thank you for shaping Global Fusion with your valuable feedback!', 'success');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initStarRatings();
    initRecommendationScale();

    const form = document.getElementById('feedback-survey-form');
    if (form) {
      form.addEventListener('submit', handleSurveySubmit);
    }
  });

  window.GFFeedback = { feedbackState, handleSurveySubmit };
})();
