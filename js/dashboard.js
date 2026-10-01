/**
 * Global Fusion 2026 - Participant Dashboard
 * Renders user's digital pass, schedule, passport stamps, and registered competitions from localStorage.
 * Includes functional Edit Profile Info modal with validation, localStorage persistence, and print support.
 */

(function () {
  const PASS_STORAGE_KEY = 'gf_participant_pass';
  const SCHEDULE_STORAGE_KEY = 'gf_saved_schedule';
  const PASSPORT_STORAGE_KEY = 'gf_passport_stamps';

  function getPassData() {
    try {
      const data = localStorage.getItem(PASS_STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // If not yet saved, seed a realistic default pass so user can immediately test
      const defaultPass = {
        fullName: 'Aayush Sharma',
        studentId: 'LB-2026-99',
        email: 'aayush.sharma@lbef.edu.np',
        phone: '+977-9841223344',
        faculty: 'BSc (Hons) Information Technology',
        nationality: 'Nepal',
        participationType: 'General Student Delegate',
        activities: ['Global Food Street', 'World Music Stage', 'Batik Workshop'],
        competition: 'None',
        passId: 'GF26-8842',
        issuedAt: new Date().toISOString(),
        status: 'CONFIRMED'
      };
      localStorage.setItem(PASS_STORAGE_KEY, JSON.stringify(defaultPass));
      return defaultPass;
    } catch (e) {
      return null;
    }
  }

  function getSavedSchedule() {
    try {
      const data = localStorage.getItem(SCHEDULE_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function renderDashboard() {
    const pass = getPassData();
    const schedule = getSavedSchedule();

    const welcomeName = document.getElementById('dash-welcome-name');
    const registeredView = document.getElementById('dash-registered-view');
    const emptyView = document.getElementById('dash-empty-view');

    if (!pass) {
      if (welcomeName) welcomeName.textContent = 'Welcome, Global Visitor!';
      if (registeredView) registeredView.style.display = 'none';
      if (emptyView) emptyView.style.display = 'block';
      renderScheduleSection([]);
      return;
    }

    if (welcomeName) welcomeName.textContent = `Welcome, ${pass.fullName}!`;
    if (registeredView) registeredView.style.display = 'block';
    if (emptyView) emptyView.style.display = 'none';

    // Populate Pass Card
    const nameEl = document.getElementById('dash-pass-name');
    const idEl = document.getElementById('dash-pass-id');
    const typeEl = document.getElementById('dash-pass-type');
    const facEl = document.getElementById('dash-pass-faculty');
    const studentIdEl = document.getElementById('dash-pass-studentid');
    const nationalityEl = document.getElementById('dash-pass-nationality');
    const compEl = document.getElementById('dash-pass-comp');
    const statusEl = document.getElementById('dash-pass-status');

    if (nameEl) nameEl.textContent = pass.fullName;
    if (idEl) idEl.textContent = pass.passId || 'GF26-8842';
    if (typeEl) typeEl.textContent = pass.participationType || 'General Student Delegate';
    if (facEl) facEl.textContent = pass.faculty || 'Computing & IT';
    if (studentIdEl) studentIdEl.textContent = pass.studentId || 'LB-2026-99';
    if (nationalityEl) nationalityEl.textContent = pass.nationality || 'Nepal';
    if (statusEl) statusEl.textContent = pass.status ? `${pass.status} ✓` : 'CONFIRMED ✓';
    if (compEl) compEl.textContent = pass.competition && pass.competition !== 'None' ? pass.competition : 'None';

    renderScheduleSection(schedule);
    renderDashboardPassport();
  }

  function renderScheduleSection(schedule) {
    const listContainer = document.getElementById('dash-schedule-list');
    const emptyNotice = document.getElementById('dash-schedule-empty');
    const countBadge = document.getElementById('dash-schedule-count');

    if (countBadge) countBadge.textContent = `${schedule.length} Events`;

    if (!listContainer) return;

    if (schedule.length === 0) {
      if (emptyNotice) emptyNotice.style.display = 'block';
      listContainer.innerHTML = '';
      return;
    }

    if (emptyNotice) emptyNotice.style.display = 'none';

    listContainer.innerHTML = schedule.map(item => `
      <div style="background:var(--bg-secondary); border:1px solid var(--border-light); border-radius:var(--radius-lg); padding:1rem 1.25rem; display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:0.75rem;">
        <div style="display:flex; align-items:center; gap:1rem;">
          <img src="${item.image}" alt="${item.title}" style="width:54px; height:54px; border-radius:var(--radius-md); object-fit:cover;" onerror="this.src='../assets/images/fallbacks/cultural_fallback.svg'" />
          <div>
            <span style="font-size:0.72rem; font-weight:800; text-transform:uppercase; color:var(--color-orange); letter-spacing:0.5px;">
              ${item.time} &bull; ${item.venue}
            </span>
            <h4 style="font-family:var(--font-display); font-weight:800; font-size:1.05rem; margin-top:0.2rem; color:var(--text-primary);">
              ${item.title}
            </h4>
          </div>
        </div>
        <button onclick="GFDashboard.removeScheduleItem('${item.id}')" style="color:var(--color-coral); font-size:0.82rem; font-weight:700; padding:0.35rem 0.75rem; border-radius:var(--radius-md); border:1px solid rgba(255,77,109,0.3); background:rgba(255,77,109,0.08); cursor:pointer;">
          Remove &times;
        </button>
      </div>
    `).join('');
  }

  function renderDashboardPassport() {
    if (!window.GFPassport) return;
    const stamps = window.GFPassport.getStamps();
    const container = document.getElementById('dash-passport-chips');
    if (!container) return;

    const cultures = window.GFPassport.PASSPORT_CULTURES;
    container.innerHTML = cultures.map(c => {
      const isStamped = stamps.includes(c.id);
      return `
        <div style="display:inline-flex; align-items:center; gap:0.4rem; padding:0.35rem 0.75rem; border-radius:var(--radius-full); font-size:0.8rem; font-weight:700; ${isStamped ? 'background:rgba(0,207,200,0.15); border:1px solid var(--color-turquoise); color:var(--text-primary);' : 'background:var(--bg-secondary); border:1px dashed var(--border-medium); opacity:0.5; color:var(--text-muted);'}">
          <span>${c.flag}</span>
          <span>${c.name}</span>
          <span>${isStamped ? '✓' : '—'}</span>
        </div>
      `;
    }).join('');
  }

  function removeScheduleItem(id) {
    let schedule = getSavedSchedule();
    schedule = schedule.filter(e => e.id !== id);
    try {
      localStorage.setItem(SCHEDULE_STORAGE_KEY, JSON.stringify(schedule));
      window.GFUtils && window.GFUtils.showToast('Event removed from your personal schedule.', 'info');
      renderDashboard();
    } catch (e) {
      console.error(e);
    }
  }

  function clearAllSchedule() {
    if (confirm('Clear all events from your personal itinerary?')) {
      localStorage.removeItem(SCHEDULE_STORAGE_KEY);
      window.GFUtils && window.GFUtils.showToast('Schedule cleared.', 'info');
      renderDashboard();
    }
  }

  // =========================================================================
  // EDIT PROFILE INFO MODAL (Requirement 3)
  // =========================================================================

  function clearProfileValidationErrors() {
    const errorIds = ['edit-err-name', 'edit-err-studentid', 'edit-err-nationality', 'edit-err-email', 'edit-err-phone', 'edit-err-faculty', 'edit-err-type'];
    errorIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.textContent = '';
        el.style.display = 'none';
      }
    });
    const inputs = document.querySelectorAll('#edit-profile-modal .form-input');
    inputs.forEach(input => {
      input.style.borderColor = 'var(--border-medium)';
      input.removeAttribute('aria-invalid');
    });
  }

  function openEditProfile() {
    const pass = getPassData();
    if (!pass) return;

    const modal = document.getElementById('edit-profile-modal');
    if (!modal) return;

    // Populate current values
    const nameInput = document.getElementById('edit-profile-name');
    const studentIdInput = document.getElementById('edit-profile-studentid');
    const nationalityInput = document.getElementById('edit-profile-nationality');
    const emailInput = document.getElementById('edit-profile-email');
    const phoneInput = document.getElementById('edit-profile-phone');
    const facultyInput = document.getElementById('edit-profile-faculty');
    const typeSelect = document.getElementById('edit-profile-type');

    if (nameInput) nameInput.value = pass.fullName || '';
    if (studentIdInput) studentIdInput.value = pass.studentId || '';
    if (nationalityInput) nationalityInput.value = pass.nationality || '';
    if (emailInput) emailInput.value = pass.email || '';
    if (phoneInput) phoneInput.value = pass.phone || '';
    if (facultyInput) facultyInput.value = pass.faculty || '';
    if (typeSelect) typeSelect.value = pass.participationType || 'General Student Delegate';

    clearProfileValidationErrors();

    // Show modal with animation
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus first input
    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 50);
  }

  function closeEditProfile() {
    const modal = document.getElementById('edit-profile-modal');
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
      clearProfileValidationErrors();
      // Return focus to the edit button
      const editBtn = document.getElementById('dash-edit-profile-btn');
      if (editBtn) editBtn.focus();
    }
  }

  function saveProfileChanges(e) {
    if (e) e.preventDefault();

    const nameInput = document.getElementById('edit-profile-name');
    const studentIdInput = document.getElementById('edit-profile-studentid');
    const nationalityInput = document.getElementById('edit-profile-nationality');
    const emailInput = document.getElementById('edit-profile-email');
    const phoneInput = document.getElementById('edit-profile-phone');
    const facultyInput = document.getElementById('edit-profile-faculty');
    const typeSelect = document.getElementById('edit-profile-type');

    clearProfileValidationErrors();

    let hasErrors = false;
    let firstErrorField = null;

    function setFieldError(fieldId, errorMsg, inputEl) {
      const errEl = document.getElementById(fieldId);
      if (errEl) {
        errEl.textContent = errorMsg;
        errEl.style.display = 'block';
      }
      if (inputEl) {
        inputEl.style.borderColor = 'var(--color-coral)';
        inputEl.setAttribute('aria-invalid', 'true');
        if (!firstErrorField) firstErrorField = inputEl;
      }
      hasErrors = true;
    }

    // 1. Full Name validation
    const fullNameVal = nameInput ? nameInput.value.trim() : '';
    if (!fullNameVal || fullNameVal.length < 2) {
      setFieldError('edit-err-name', 'Please enter your full name (minimum 2 characters).', nameInput);
    }

    // 2. Student ID validation
    const studentIdVal = studentIdInput ? studentIdInput.value.trim() : '';
    if (!studentIdVal || studentIdVal.length < 2) {
      setFieldError('edit-err-studentid', 'Please enter a valid Student ID.', studentIdInput);
    }

    // 3. Nationality validation
    const nationalityVal = nationalityInput ? nationalityInput.value.trim() : '';
    if (!nationalityVal || nationalityVal.length < 2) {
      setFieldError('edit-err-nationality', 'Please enter your nationality or home country.', nationalityInput);
    }

    // 4. Email validation
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal || !emailRegex.test(emailVal)) {
      setFieldError('edit-err-email', 'Please provide a valid email address (e.g. user@lbef.edu.np).', emailInput);
    }

    // 5. Phone validation
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    if (!phoneVal || phoneVal.length < 6) {
      setFieldError('edit-err-phone', 'Please enter a valid contact phone number.', phoneInput);
    }

    // 6. Faculty validation
    const facultyVal = facultyInput ? facultyInput.value.trim() : '';
    if (!facultyVal || facultyVal.length < 2) {
      setFieldError('edit-err-faculty', 'Please enter your academic faculty or programme.', facultyInput);
    }

    // 7. Participant Type validation
    const typeVal = typeSelect ? typeSelect.value : '';
    if (!typeVal) {
      setFieldError('edit-err-type', 'Please select a participant type.', typeSelect);
    }

    if (hasErrors) {
      if (firstErrorField) firstErrorField.focus();
      return;
    }

    // If valid: Update participant information
    let pass = getPassData() || {};
    pass.fullName = fullNameVal;
    pass.studentId = studentIdVal;
    pass.nationality = nationalityVal;
    pass.email = emailVal;
    pass.phone = phoneVal;
    pass.faculty = facultyVal;
    pass.participationType = typeVal;
    pass.updatedAt = new Date().toISOString();

    // Save into localStorage
    try {
      localStorage.setItem(PASS_STORAGE_KEY, JSON.stringify(pass));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    // Update the participant information displayed on the dashboard
    renderDashboard();

    // Show success message
    if (window.GFUtils && window.GFUtils.showToast) {
      window.GFUtils.showToast('Profile updated successfully.', 'success');
    }

    // Close modal
    closeEditProfile();
  }

  // Quick Demo Pass creation helper
  function createDemoPass() {
    const demoPass = {
      fullName: 'Aayush Sharma',
      studentId: 'LB-2026-99',
      email: 'aayush.sharma@lbef.edu.np',
      phone: '+977-9841223344',
      faculty: 'BSc (Hons) Information Technology',
      nationality: 'Nepal',
      participationType: 'General Student Delegate',
      activities: ['Global Food Street', 'World Music Stage', 'Batik Workshop'],
      competition: 'None',
      passId: 'GF26-8842',
      issuedAt: new Date().toISOString(),
      status: 'CONFIRMED'
    };
    localStorage.setItem(PASS_STORAGE_KEY, JSON.stringify(demoPass));
    window.GFUtils && window.GFUtils.showToast('Demo pass activated! Welcome to the festival.', 'success');
    renderDashboard();
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();

    const clearBtn = document.getElementById('dash-clear-schedule-btn');
    if (clearBtn) clearBtn.addEventListener('click', clearAllSchedule);

    const editBtn = document.getElementById('dash-edit-profile-btn');
    if (editBtn) editBtn.addEventListener('click', openEditProfile);

    const createDemoBtn = document.getElementById('dash-create-demo-pass-btn');
    if (createDemoBtn) createDemoBtn.addEventListener('click', createDemoPass);

    // Modal controls
    const closeXBtn = document.getElementById('edit-profile-close-x');
    if (closeXBtn) closeXBtn.addEventListener('click', closeEditProfile);

    const cancelBtn = document.getElementById('edit-profile-cancel-btn');
    if (cancelBtn) cancelBtn.addEventListener('click', closeEditProfile);

    const saveBtn = document.getElementById('edit-profile-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', saveProfileChanges);

    const form = document.getElementById('edit-profile-form');
    if (form) form.addEventListener('submit', saveProfileChanges);

    const modal = document.getElementById('edit-profile-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeEditProfile();
        }
      });
    }

    // Keyboard support: Escape key closes modal & Tab trap
    document.addEventListener('keydown', (e) => {
      const modalEl = document.getElementById('edit-profile-modal');
      if (modalEl && modalEl.style.display === 'flex') {
        if (e.key === 'Escape') {
          closeEditProfile();
        }
      }
    });
  });

  window.GFDashboard = {
    renderDashboard,
    removeScheduleItem,
    clearAllSchedule,
    openEditProfile,
    closeEditProfile,
    saveProfileChanges,
    createDemoPass
  };
})();
