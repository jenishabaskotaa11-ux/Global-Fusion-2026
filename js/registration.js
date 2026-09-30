/**
 * Global Fusion 2026 - Registration Multi-Step Wizard & Pass Generator
 * Step 1: Personal Info | Step 2: Participation | Step 3: Activities & Competitions | Step 4: Review | Step 5: Digital Pass
 */

(function () {
  const PASS_STORAGE_KEY = 'gf_participant_pass';
  let currentStep = 1;
  const totalSteps = 5;

  const formData = {
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    faculty: 'Computing & IT',
    nationality: 'Nepal',
    participationType: 'General Delegate (All-Access)',
    activities: [],
    competition: 'None',
    termsAccepted: false
  };

  function updateStepUI() {
    // Show active step section
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(`reg-step-${i}`);
      const indicatorEl = document.getElementById(`step-indicator-${i}`);
      if (stepEl) {
        if (i === currentStep) {
          stepEl.style.display = 'block';
          stepEl.classList.add('fade-in');
        } else {
          stepEl.style.display = 'none';
          stepEl.classList.remove('fade-in');
        }
      }
      if (indicatorEl) {
        if (i < currentStep) {
          indicatorEl.className = 'step-node completed';
          indicatorEl.innerHTML = '✓';
        } else if (i === currentStep) {
          indicatorEl.className = 'step-node active';
          indicatorEl.textContent = i;
        } else {
          indicatorEl.className = 'step-node pending';
          indicatorEl.textContent = i;
        }
      }
    }

    // Scroll to form top smoothly
    const formWrap = document.getElementById('registration-wizard-card');
    if (formWrap) {
      formWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function validateCurrentStep() {
    const V = window.GFValidation;
    if (!V) return true;

    if (currentStep === 1) {
      const nameInput = document.getElementById('reg-name');
      const nameErr = document.getElementById('reg-name-error');
      const nameVal = V.validateFullName(nameInput ? nameInput.value : '');
      V.setFieldState(nameInput, nameErr, nameVal);

      const idInput = document.getElementById('reg-student-id');
      const idErr = document.getElementById('reg-id-error');
      const idVal = V.validateStudentID(idInput ? idInput.value : '');
      V.setFieldState(idInput, idErr, idVal);

      const emailInput = document.getElementById('reg-email');
      const emailErr = document.getElementById('reg-email-error');
      const emailVal = V.validateEmail(emailInput ? emailInput.value : '');
      V.setFieldState(emailInput, emailErr, emailVal);

      const phoneInput = document.getElementById('reg-phone');
      const phoneErr = document.getElementById('reg-phone-error');
      const phoneVal = V.validatePhone(phoneInput ? phoneInput.value : '');
      V.setFieldState(phoneInput, phoneErr, phoneVal);

      if (!nameVal.valid || !idVal.valid || !emailVal.valid || !phoneVal.valid) {
        return false;
      }

      formData.fullName = nameInput.value.trim();
      formData.studentId = idInput.value.trim().toUpperCase();
      formData.email = emailInput.value.trim();
      formData.phone = phoneInput.value.trim();
      formData.faculty = document.getElementById('reg-faculty') ? document.getElementById('reg-faculty').value : 'Computing';
      formData.nationality = document.getElementById('reg-nationality') ? document.getElementById('reg-nationality').value : 'Nepal';
      return true;
    }

    if (currentStep === 2) {
      const typeSelect = document.getElementById('reg-part-type');
      const typeErr = document.getElementById('reg-type-error');
      const typeVal = V.validateParticipationType(typeSelect ? typeSelect.value : '');
      V.setFieldState(typeSelect, typeErr, typeVal);

      if (!typeVal.valid) return false;
      formData.participationType = typeSelect.value;
      return true;
    }

    if (currentStep === 3) {
      // Gather checked activities
      const checkedBoxes = document.querySelectorAll('input[name="reg_activity"]:checked');
      formData.activities = Array.from(checkedBoxes).map(cb => cb.value);

      const compSelect = document.getElementById('reg-competition');
      formData.competition = compSelect ? compSelect.value : 'None';

      const termsCheck = document.getElementById('reg-terms');
      const termsErr = document.getElementById('reg-terms-error');
      const termsVal = V.validateTerms(termsCheck ? termsCheck.checked : false);
      V.setFieldState(termsCheck, termsErr, termsVal);

      if (!termsVal.valid) return false;
      formData.termsAccepted = true;
      return true;
    }

    return true;
  }

  function renderReviewStep() {
    const revName = document.getElementById('review-name');
    const revId = document.getElementById('review-id');
    const revEmail = document.getElementById('review-email');
    const revPhone = document.getElementById('review-phone');
    const revFaculty = document.getElementById('review-faculty');
    const revNationality = document.getElementById('review-nationality');
    const revType = document.getElementById('review-type');
    const revActivities = document.getElementById('review-activities');
    const revComp = document.getElementById('review-competition');

    if (revName) revName.textContent = formData.fullName;
    if (revId) revId.textContent = formData.studentId;
    if (revEmail) revEmail.textContent = formData.email;
    if (revPhone) revPhone.textContent = formData.phone;
    if (revFaculty) revFaculty.textContent = formData.faculty;
    if (revNationality) revNationality.textContent = formData.nationality;
    if (revType) revType.textContent = formData.participationType;
    if (revComp) revComp.textContent = formData.competition;

    if (revActivities) {
      if (formData.activities.length === 0) {
        revActivities.textContent = 'General Festival Grounds Access (All Stages)';
      } else {
        revActivities.innerHTML = formData.activities.map(a => `<span style="display:inline-block; background:rgba(0,207,200,0.15); border:1px solid var(--color-turquoise); padding:0.2rem 0.6rem; border-radius:var(--radius-full); font-size:0.75rem; margin-right:0.35rem; margin-bottom:0.35rem;">${a}</span>`).join('');
      }
    }
  }

  function generatePassID() {
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `GF26-${rand}`;
  }

  function completeRegistration() {
    const passId = generatePassID();
    const timestamp = new Date().toISOString();

    const passRecord = {
      ...formData,
      passId,
      issuedAt: timestamp,
      status: 'CONFIRMED'
    };

    try {
      localStorage.setItem(PASS_STORAGE_KEY, JSON.stringify(passRecord));
    } catch (e) {
      console.error(e);
    }

    // Render pass on Step 5
    const passNameEl = document.getElementById('digital-pass-name');
    const passIdEl = document.getElementById('digital-pass-id');
    const passTypeEl = document.getElementById('digital-pass-type');
    const passInstEl = document.getElementById('digital-pass-institution');
    const passCompEl = document.getElementById('digital-pass-comp');

    if (passNameEl) passNameEl.textContent = passRecord.fullName;
    if (passIdEl) passIdEl.textContent = passRecord.passId;
    if (passTypeEl) passTypeEl.textContent = passRecord.participationType;
    if (passInstEl) passInstEl.textContent = `${passRecord.faculty} • ${passRecord.studentId}`;
    if (passCompEl) passCompEl.textContent = passRecord.competition !== 'None' ? `🏆 Comp: ${passRecord.competition}` : 'General Attendee';

    currentStep = 5;
    updateStepUI();
    window.GFUtils && window.GFUtils.showToast('Registration complete! Your Digital Pass is ready.', 'success');
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Next step button
    const nextBtn = document.getElementById('reg-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
          if (currentStep === 3) {
            renderReviewStep();
            currentStep = 4;
            updateStepUI();
          } else if (currentStep < 4) {
            currentStep++;
            updateStepUI();
          }
        }
      });
    }

    // Prev step button
    const prevBtn = document.getElementById('reg-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentStep > 1 && currentStep < 5) {
          currentStep--;
          updateStepUI();
        }
      });
    }

    // Submit confirmation button (Step 4 -> Step 5)
    const submitBtn = document.getElementById('reg-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        completeRegistration();
      });
    }

    // Print / Download Pass simulated action
    const downloadBtn = document.getElementById('download-pass-btn');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        window.print();
      });
    }
  });

  window.GFRegistration = {
    formData,
    completeRegistration,
    getSavedPass: () => {
      try {
        const d = localStorage.getItem(PASS_STORAGE_KEY);
        return d ? JSON.parse(d) : null;
      } catch (e) {
        return null;
      }
    }
  };
})();
