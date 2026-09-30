/**
 * Global Fusion 2026 - Contact Form & EmailJS Integration
 * Client-side validation with configurable EmailJS constants and graceful demo mode
 */

(function () {
  // =========================================================================
  // EMAILJS CONFIGURATION CONSTANTS
  // Replace these placeholder strings with your actual EmailJS credentials
  // =========================================================================
  const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // e.g. "user_xxxxxxxxxxxx"
  const EMAILJS_SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'; // e.g. "service_xxxxxxx"
  const EMAILJS_TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID'; // e.g. "template_xxxxxxx"

  function isEmailJSConfigured() {
    return (
      EMAILJS_PUBLIC_KEY !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
      EMAILJS_SERVICE_ID !== 'YOUR_EMAILJS_SERVICE_ID' &&
      EMAILJS_TEMPLATE_ID !== 'YOUR_EMAILJS_TEMPLATE_ID'
    );
  }

  function handleContactSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const categorySelect = document.getElementById('contact-category');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = document.getElementById('contact-submit-btn');
    const statusBox = document.getElementById('contact-status-box');

    const V = window.GFValidation;

    // Validate
    const nameVal = V ? V.validateFullName(nameInput.value) : { valid: true };
    const emailVal = V ? V.validateEmail(emailInput.value) : { valid: true };
    let isValid = true;

    if (!nameVal.valid) {
      document.getElementById('contact-name-error').textContent = nameVal.message;
      nameInput.classList.add('is-invalid');
      isValid = false;
    } else {
      nameInput.classList.remove('is-invalid');
      document.getElementById('contact-name-error').textContent = '';
    }

    if (!emailVal.valid) {
      document.getElementById('contact-email-error').textContent = emailVal.message;
      emailInput.classList.add('is-invalid');
      isValid = false;
    } else {
      emailInput.classList.remove('is-invalid');
      document.getElementById('contact-email-error').textContent = '';
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      document.getElementById('contact-message-error').textContent = 'Please enter a message of at least 10 characters.';
      messageInput.classList.add('is-invalid');
      isValid = false;
    } else {
      messageInput.classList.remove('is-invalid');
      document.getElementById('contact-message-error').textContent = '';
    }

    if (!isValid) return;

    // Transition to SENDING...
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span style="display:inline-block; animation:spin 1s linear infinite;">⏳</span>
      <span>SENDING...</span>
    `;

    const templateParams = {
      from_name: nameInput.value.trim(),
      from_email: emailInput.value.trim(),
      category: categorySelect ? categorySelect.value : 'General',
      subject: subjectInput ? subjectInput.value.trim() : 'Inquiry',
      message: messageInput.value.trim()
    };

    if (isEmailJSConfigured() && window.emailjs) {
      // Real EmailJS Dispatch
      window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
        .then(() => {
          showSuccess(submitBtn, statusBox, nameInput, emailInput, messageInput);
        })
        .catch((err) => {
          showError(submitBtn, statusBox, originalText, err.text || 'Network transmission error.');
        });
    } else {
      // Graceful Simulated Demo Mode with informational guidance
      setTimeout(() => {
        showSuccess(submitBtn, statusBox, nameInput, emailInput, messageInput, true);
      }, 1200);
    }
  }

  function showSuccess(submitBtn, statusBox, nameInput, emailInput, messageInput, isDemo = false) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'MESSAGE SENT SUCCESSFULLY! ✓';
    submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';

    if (statusBox) {
      statusBox.style.display = 'block';
      statusBox.className = 'status-banner success';
      statusBox.innerHTML = `
        <h4 style="font-weight:800; font-size:1.05rem; margin-bottom:0.25rem;">Thank you for contacting Global Fusion 2026!</h4>
        <p style="font-size:0.9rem; margin-bottom:0.35rem;">Your message has been recorded. Our academic liaison committee will respond within 24 hours.</p>
        ${isDemo ? '<small style="opacity:0.85; font-size:0.75rem;">(Demo Notice: EmailJS constants are currently placeholders in js/contact.js. Insert actual credentials for live mail delivery.)</small>' : ''}
      `;
    }

    // Reset inputs
    if (nameInput) nameInput.value = '';
    if (emailInput) emailInput.value = '';
    if (messageInput) messageInput.value = '';

    window.GFUtils && window.GFUtils.showToast('Message sent successfully! Our committee will be in touch.', 'success');

    setTimeout(() => {
      submitBtn.innerHTML = 'SEND ANOTHER MESSAGE';
      submitBtn.style.background = '';
    }, 5000);
  }

  function showError(submitBtn, statusBox, originalText, errorMsg) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = originalText;

    if (statusBox) {
      statusBox.style.display = 'block';
      statusBox.className = 'status-banner error';
      statusBox.innerHTML = `
        <h4 style="font-weight:800; font-size:1.05rem; margin-bottom:0.25rem;">WE COULDN'T SEND YOUR MESSAGE. PLEASE TRY AGAIN.</h4>
        <p style="font-size:0.88rem;">${errorMsg || 'Please verify your network connection and EmailJS credentials.'}</p>
      `;
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactSubmit);
    }
  });

  window.GFContact = {
    EMAILJS_PUBLIC_KEY,
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    isEmailJSConfigured
  };
})();
