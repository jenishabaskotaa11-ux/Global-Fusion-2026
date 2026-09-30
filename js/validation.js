/**
 * Global Fusion 2026 - Form Validation Utility
 * Comprehensive field validation with inline error rendering and accessible states
 */

(function () {
  function validateFullName(name) {
    if (!name || !name.trim()) {
      return { valid: false, message: 'Full name is required.' };
    }
    if (name.trim().length < 3) {
      return { valid: false, message: 'Full name must be at least 3 characters.' };
    }
    const nameRegex = /^[a-zA-Z\s'.\-]+$/;
    if (!nameRegex.test(name.trim())) {
      return { valid: false, message: 'Please enter a valid name using letters only.' };
    }
    return { valid: true, message: '' };
  }

  function validateStudentID(id) {
    if (!id || !id.trim()) {
      return { valid: false, message: 'Student ID or Delegate ID is required.' };
    }
    // Matches formats like LB-12345, APU-98765, NP-5544, STU-2026, or any 5-15 alphanumeric format
    const idRegex = /^[A-Za-z0-9\-]{4,16}$/;
    if (!idRegex.test(id.trim())) {
      return { valid: false, message: 'Enter a valid student ID (e.g., LB-2026 or APU-1044).' };
    }
    return { valid: true, message: '' };
  }

  function validateEmail(email) {
    if (!email || !email.trim()) {
      return { valid: false, message: 'Email address is required.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return { valid: false, message: 'Please enter a valid email address (e.g., student@lbef.edu.np).' };
    }
    return { valid: true, message: '' };
  }

  function validatePhone(phone) {
    if (!phone || !phone.trim()) {
      return { valid: false, message: 'Phone number is required.' };
    }
    // Accept international & local phone formats (+977-98..., 9841..., +60-12...)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone.trim().replace(/\s+/g, ''))) {
      return { valid: false, message: 'Please enter a valid phone number (e.g., +977-9841234567).' };
    }
    return { valid: true, message: '' };
  }

  function validateParticipationType(type) {
    if (!type || type === '') {
      return { valid: false, message: 'Please select a participation type.' };
    }
    return { valid: true, message: '' };
  }

  function validateTerms(accepted) {
    if (!accepted) {
      return { valid: false, message: 'Please accept the festival terms and conditions to proceed.' };
    }
    return { valid: true, message: '' };
  }

  function setFieldState(inputEl, errorEl, result) {
    if (!inputEl) return;
    if (result.valid) {
      inputEl.setAttribute('aria-invalid', 'false');
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
      }
    } else {
      inputEl.setAttribute('aria-invalid', 'true');
      inputEl.classList.remove('is-valid');
      inputEl.classList.add('is-invalid');
      if (errorEl) {
        errorEl.textContent = result.message;
        errorEl.style.display = 'block';
      }
    }
  }

  window.GFValidation = {
    validateFullName,
    validateStudentID,
    validateEmail,
    validatePhone,
    validateParticipationType,
    validateTerms,
    setFieldState
  };
})();
