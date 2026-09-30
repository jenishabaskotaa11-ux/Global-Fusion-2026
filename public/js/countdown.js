/**
 * Global Fusion 2026 - Live Countdown
 * Target: 3 December 2026 09:00:00 NST
 */

(function () {
  const TARGET_DATE = new Date('2026-12-03T09:00:00+05:45').getTime();

  function updateCountdown() {
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    const statusEl = document.getElementById('countdown-status-text');

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      if (statusEl) {
        statusEl.innerHTML = '<span style="color:var(--color-yellow);font-weight:900;">GLOBAL FUSION IS LIVE!</span> &mdash; The journey has begun.';
      }
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const formatNum = (n) => String(n).padStart(2, '0');

    daysEl.textContent = formatNum(days);
    hoursEl.textContent = formatNum(hours);
    minutesEl.textContent = formatNum(minutes);
    secondsEl.textContent = formatNum(seconds);
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  });
})();
